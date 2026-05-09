---
name: apply-to-job
description: End-to-end workflow for applying to a single online job posting using Playwright MCP. Reads the JD, tailors the CV, fills the application form (assistively — never auto-submits), and updates the tracker. Use when the user shares a job URL, JD text, or asks to apply to something.
---

# Apply to a job

**Goal context:** the user is targeting **10+ recruiter calls and 10+ interview schedules in 10 days** (`data/applied-jobs.json` → `goal`). Volume matters, but quality matters more — a tailored, accurate, recruiter-friendly application beats five sloppy ones.

## Pre-flight rules

- **Assistive, never autonomous.** Drive the browser, fill the form, then **stop** and let the user click submit / send.
- **No CAPTCHA / MFA / "verify it's you" bypass.** If a challenge appears, take a screenshot and ask the user to handle it.
- **Don't sign in for the user.** If we land on a login wall, ask the user to log in themselves before continuing.
- **Remote-only**, **United States or Canada** — set in `src/data/jobSearch.mjs`. Skip postings that don't match unless the user explicitly overrides.
- **Skip duplicates / reposts** — compute the signature via `jobSignature({company, title, location})` from `src/data/jobSearch.mjs` and check `data/applied-jobs.json`. If already present with status `applied`, `recruiter-call`, etc., skip and tell the user.
- **Never invent experience.** If the JD requires something the user has not done, say so clearly. Tailoring reorders honestly; it does not fabricate.

## Workflow

1. **Acquire the JD.**
   - URL → open via Playwright MCP → extract the JD text.
   - Pasted text → use as-is.
   - Save to `tailored/<slug>.jd.txt` for reproducibility.
2. **Recruiter-lens read** (use `technical-recruiter-lens` skill).
   - Identify must-haves vs nice-to-haves.
   - List the top 5 ATS keywords.
   - Decide go / no-go. If no-go, log a `seen` + `skipped` entry with a reason and stop.
3. **Tailor the CV.**
   ```
   npm run tailor -- --jd tailored/<slug>.jd.txt --output <slug>
   ```
   Slug convention: lowercase company-role, e.g. `acme-sr-sdet`. Outputs:
   - `tailored/KRISH_PAVULURI_CV_<slug>.pdf`
   - `tailored/KRISH_PAVULURI_CV_<slug>.docx`
   Verify the matched-skills line in the script output covers the top-5 ATS keywords from step 2. If a critical keyword is missing, surface it to the user before applying.
4. **Open the application form.**
   - LinkedIn Easy Apply → fill assistively.
   - Indeed Easy Apply → fill assistively.
   - Company portal → fill assistively (Workday, Greenhouse, Lever, Ashby, iCIMS — each has different selectors but the same workflow).
5. **Fill from data.**
   - Identity / contact / location: `src/data/applicationAnswers.mjs`.
   - Resume content / years / role history: `src/data/resume.mjs`.
   - Resume upload: attach `tailored/KRISH_PAVULURI_CV_<slug>.pdf`.
   - Cover letter (if required): generate from the JD + tailored summary; show to the user before submitting.
   - **Any field where `applicationAnswers` value is `null`** (work auth, sponsorship, salary, relocation): **ask the user** before filling. These are high-stakes screeners.
6. **Hand control back.** Pause and tell the user the form is ready for review and submit.
7. **Log the application** to `data/applied-jobs.json` once the user confirms they submitted. Schema below.

## Tracker entry schema (data/applied-jobs.json → jobs[])

```json
{
  "id": "linkedin-3829471492",
  "signature": "acme-corp|senior-qa-automation-engineer|united-states-remote",
  "company": "Acme Corp",
  "appliedVia": "linkedin",
  "url": "https://www.linkedin.com/jobs/view/3829471492",
  "role": {
    "title": "Senior QA Automation Engineer",
    "level": "senior",
    "workMode": "remote",
    "location": "United States",
    "compensation": "120-150k USD",
    "techStack": ["playwright", "typescript", "ci/cd"],
    "datePosted": "2026-05-05",
    "isRepost": false,
    "matchedKeywords": ["playwright", "qa automation"]
  },
  "status": "applied",
  "tailoredCvPath": "tailored/KRISH_PAVULURI_CV_acme-sr-sdet.pdf",
  "events": [
    { "date": "2026-05-09T14:22:00Z", "type": "applied" }
  ],
  "notes": ""
}
```

`appliedVia` is one of: `linkedin`, `indeed`, `company-website`, `email`, `referral`, `other`.

`status` lifecycle: `seen` → `tailored` → `applied` → `recruiter-call` → `technical-interview` → `onsite` → (`offer` | `rejected` | `withdrawn`). Append events as they happen — don't overwrite history.

## After applying

When the user reports recruiter outreach or an interview invite, append an event and bump status. The goal counter in the tracker is read off `events[].type`:
- `recruiter-call` events → counts toward the 10-call goal.
- `technical-interview`, `onsite`, `interview-scheduled` events → count toward the 10-interview goal.
