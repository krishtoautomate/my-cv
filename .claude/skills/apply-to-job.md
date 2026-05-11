---
name: apply-to-job
description: End-to-end workflow for applying to a single online job posting using Playwright MCP. Reads the JD, tailors the CV, fills the application form (assistively — never auto-submits), and updates the tracker. Use when the user shares a job URL, JD text, or asks to apply to something.
---

# Apply to a job

**Goal context:** the user is targeting **10+ recruiter calls and 10+ interview schedules in 10 days** (`data/applied-jobs.json` → `goal`). Volume matters, but quality matters more — a tailored, accurate, recruiter-friendly application beats five sloppy ones.

## Pre-flight rules

- **Assistive, never autonomous.** Drive the browser, fill the form, then **stop** and let the user click submit / send.
- **No CAPTCHA / MFA / "verify it's you" bypass.** If a challenge appears, take a screenshot and ask the user to handle it. Note: programmatic field interaction *before* the user clicks reCAPTCHA can trip the score and show "Verification expired" — that's a signal to the user, not a bug.
- **Don't sign in for the user.** If we land on a login wall, ask the user to log in themselves before continuing.
- **Remote-only**, **United States or Canada** — set in `src/data/jobSearch.mjs`. Skip postings that don't match unless the user explicitly overrides.
- **Skip duplicates / reposts** — compute the signature via `jobSignature({company, title, location})` from `src/data/jobSearch.mjs` and check `data/applied-jobs.json`. If already present with status `applied`, `recruiter-call`, etc., skip and tell the user.
- **Never invent experience.** If the JD requires something the user has not done, say so clearly. Tailoring reorders honestly; it does not fabricate.
- **Hard-filter required fields = explicit go/no-go.** If a `required` dropdown asks about something the JD lists as a hard prereq the user lacks (e.g. Fortis Games "Do you have Unity experience? *"), surface the auto-reject risk **before** the user submits. Don't just push through with "No" silently. User decides whether to apply anyway, skip, or address in cover letter.
- **Confirm submission with positive evidence.** A `/thanks` or `/success` URL, an "Applied X seconds ago" badge, or `/post-apply/next-best-action/` is real proof. A "Save this application?" dialog is the opposite — it means the user closed the modal without submitting. Don't log entries on the user saying "done" alone if the page state contradicts it.

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
4. **Open the application form.** See ATS-mechanics matrix below for fill strategy.
5. **Fill from data.**
   - Identity / contact / location: `src/data/applicationAnswers.mjs`.
   - Resume content / years / role history: `src/data/resume.mjs`.
   - Resume upload: attach `tailored/KRISH_PAVULURI_CV_<slug>.pdf` (or `.docx`).
   - Cover letter: see "When to generate a cover letter" below.
   - **Any field where `applicationAnswers` value is `null`** (sponsorship, salary, relocation): **ask the user** before filling. These are high-stakes screeners.
   - **"Follow company" / "Stay updated" checkboxes always uncheck** before handing off. Standing user rule.
   - **Salary fields default to $175,000 CAD** if the role is Senior/Staff and the company hasn't disclosed a band. This is the floor anchor from Super.com's own self-disclosed bracket ($175k-$200k). Bump for Staff+ at Shopify/Veeva/Atlassian-tier per the salary intel.
   - **Long-form "Why are you a good fit / additional details" fields**: paste the standing pitch — "90%+ regression coverage with high pass rate using AI-assisted Playwright + CI/CD on every push; treat tests as production code, user-story-to-test-case flow, defect-to-test-case regression, in-sprint validation with Playwright MCP. Portfolio: https://krishtoautomate.github.io/my-cv/".
6. **Hand control back.** Pause and tell the user the form is ready for review and submit.
7. **Log the application** to `data/applied-jobs.json` only after positive submission evidence (see "Confirm submission with positive evidence" above).

## ATS-mechanics matrix

Each ATS behaves differently for resume upload, field fill, and submit. Pick the right tool first time:

| ATS | Form host | Resume upload | Field fill strategy | Submit observability |
|---|---|---|---|---|
| **LinkedIn Easy Apply** | linkedin.com (same-origin) | DataTransfer trick works; or pick from LinkedIn-stored resumes | JS .value with React-aware setter | URL flips to `/post-apply/next-best-action/?postApplyJobId=…`; left-pane card shows "Applied X seconds ago" |
| **Lever** | jobs.lever.co (same-origin) | Fetch from `krishtoautomate.github.io/my-cv/...` + DataTransfer works | JS .value with React-aware setter; location field is typeahead with hidden `selectedLocation` JSON | URL → `/thanks` |
| **Workable** | apply.workable.com (same-origin) | DataTransfer works | React-aware setter; first/last name sometimes needs native click+type instead of JS | URL → `?success` |
| **Greenhouse** | embedded iframe (cross-origin: `job-boards.greenhouse.io` on company site) | **JS cannot reach iframe — user clicks Attach manually**, OS file picker | Native click+type by coordinate; find tool reads accessibility tree across iframe boundary | URL state varies; look for "Application submitted" toast |
| **Ashby** | jobs.ashbyhq.com (same-origin but strict CSP) | **CSP blocks cross-origin fetch** — base64-inject the docx bytes directly via JS (no network) | JS .value works; comboboxes are predefined options only (no free-text — type the search term, click matching option from listbox) | URL has `?success` param or thank-you message |
| **Pinpoint HQ** | lifeatvena.com / `*.pinpointhq.com` (same-origin) | DataTransfer works | JS .value works | URL → `/thanks` |
| **ASP.NET WebForms** (current.jobs style) | same-origin but Telerik widgets | Multi-step modal: click "Attach CV" → Choose File (OS picker, **user does it**) → click "Attach" | **Native click + type per field** — JS .value sets the underlying input but the styled overlay won't reflect it; values commit on submit but visually look empty (text may render as red/invisible) | URL → `/success.aspx` |
| **Custom .NET (e.g. oliverpeters.current.jobs)** | same | Same as above | Same as above. Watch for "Candidate Agreement" checkbox — user reads before checking. Often reCAPTCHA below submit. | URL change |

## Field-fill strategy hierarchy

1. **Try JS `.value` set with React-aware setter first** (works for Lever, Workable, Pinpoint, LinkedIn Easy Apply, Ashby text fields). The setter:
   ```js
   const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
   Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, val);
   el.dispatchEvent(new Event('input', { bubbles: true }));
   el.dispatchEvent(new Event('change', { bubbles: true }));
   ```
2. **For combobox / typeahead with autosuggest** (Lever current-location, Greenhouse Country/City, Ashby compensation bracket): click the field, type the search term, wait for the listbox to populate, click the matching option. Do not free-type a value you want — the form binds to the option's hidden id.
3. **Native click + type via coordinates** when the form is in a cross-origin iframe (Greenhouse on partner careers page) or .NET WebForms with overlay widgets. Click each field individually — `\t` in `type` does NOT navigate to the next field, it gets typed as literal whitespace.
4. **Resume upload via base64 inject** (Ashby and other CSP-blocked sites): `base64 -i path | tr -d '\n'` locally, paste b64 into `atob` → `Uint8Array` → `File` → `DataTransfer` → `input.files`. No network, bypasses CSP.

## When to generate a cover letter

Use `node scripts/generate-cover-letter.mjs --output <slug> --company "X" --role "Y" --body "..."` when:

- **Required by the form** (almost never — most ATS treat it as optional).
- **There's a credible gap to address**: a required field the user genuinely doesn't have (Unity at Fortis), a domain mismatch (crypto at Jobgether-partner), a level mismatch (applying at Staff to a Senior posting or vice versa).
- **The JD asks for "tell us why you're a good fit"** as a long-form field — paste the cover-letter body there if the form has no upload slot.

Cover letter structure that's worked:
1. Lead with the strongest JD alignment ("the JD reads like a description of how I already work").
2. Two concrete proof points with company names and metrics from the user's CV.
3. **Directly name the gap** and bridge with transferable skills. Don't hide it — the recruiter will see it.
4. Close with invitation to walk through traces / framework patterns.

## Noise filters — skip without applying

- **AI-training labelling roles** (DataAnnotation "Quality Assurance Developer", Sundayy, Outlier, Scale-style data labelling): not real QA roles. Skip.
- **Body-shop signals**: US LLC name + obscure Canadian small-town address (RELQ in Calahoo AB), "Fixed term contract" with no comp band, "Immediate requirements" template, USC-only on a Canada-remote post, hourly W-2 below $80/hr. Skip.
- **Aggregator pass-throughs without partner-company name disclosed** (Jobgether, Sundayy, some Indeed listings): note the aggregator, but defer until first recruiter call when you learn the actual employer. Don't burn a tailored CV.
- **Staffing-agency exclusivity language** (Oliver Peters-style "Candidate Agreement"): user reads the agreement before checking. Hard signal of restriction = skip.
- **Generalist-only hiring** (Shopify "we don't post specialist seats; we hire generalists"): your CV is test-specialized; this is a 4-6 week generalist conversion process, not a sprint move. Deprioritize during sprint.
- **Required language ≠ English** (e.g. French-required Quebec roles at Bell/Desjardins/BDC): user is not bilingual, skip. French as "asset / nice to have" is fine to apply to.

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
