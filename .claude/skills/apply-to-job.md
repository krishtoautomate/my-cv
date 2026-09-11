---
name: apply-to-job
description: End-to-end workflow for applying to a single online job posting using Playwright MCP. Reads the JD, tailors the CV, fills the application form (assistively — never auto-submits), and updates the tracker. Use when the user shares a job URL, JD text, or asks to apply to something.
---

# Apply to a job

**Goal context:** the user is targeting **10+ recruiter calls and 10+ interview schedules in 10 days** (`data/applied-jobs.json` → `goal`). Volume matters, but quality matters more — a tailored, accurate, recruiter-friendly application beats five sloppy ones.

## Pre-flight rules

- **Assistive by default; submit only on an explicit instruction.** Fill the form, then stop. When Krish says "submit" / "keep going", that authorises the run in progress — it is not a standing licence for every future session.
- **No CAPTCHA / MFA / bot-challenge bypass.** If a challenge appears, screenshot and hand off. Invisible/passive hCaptcha and reCAPTCHA v3 are fine to proceed through — only stop at an actual challenge. Note: programmatic field interaction *before* the user clicks a visible reCAPTCHA can trip the score and show "Verification expired" — that's a signal, not a bug. Heavy automated navigation on Indeed triggers a Cloudflare "Just a moment…" 403; pace the searches or ask Krish to clear it.
- **Don't sign in, and don't create accounts.** Workday, iCIMS and similar demand an account with a password before any application data can be entered. Hand those off with the tailored CV ready — do not choose a password on his behalf.
- **Check the hard filters BEFORE tailoring** (`src/data/jobSearch.mjs` → `filters`): Canada-only remote; explicit "hybrid" is a hard skip; French-required is a hard skip; ~2-year down-level reqs are a hard skip. Reading these late wastes a tailored CV — it cost a $125–175k Magnet Forensics req that had already been tailored.
- **Skip duplicates / reposts** — compute `jobSignature({company, title, location})` and check `data/applied-jobs.json`. **The local tracker is not sufficient on its own**: LinkedIn's own tracker read 107 applied against far fewer local entries, and EBizCharge was queued as new before the job page revealed "Application submitted — 4 months ago". Also check LinkedIn's tracker and the job page's own application-status block *before* analysing the JD.
- **Never invent experience.** If the JD requires something the user has not done, say so clearly. Tailoring reorders honestly; it does not fabricate.
- **Hard-filter required fields = explicit go/no-go.** If a `required` dropdown asks about something the JD lists as a hard prereq the user lacks (e.g. Fortis Games "Do you have Unity experience? *"), surface the auto-reject risk **before** the user submits. Don't just push through with "No" silently. User decides whether to apply anyway, skip, or address in cover letter.
- **Confirm submission with positive evidence.** A `/thanks`, `/success` or `/confirmation` URL, a "Thank you for applying" page, a confirmation number, or an "Applied X ago" row in a tracker is real proof. A "Save this application?" dialog is the opposite. Don't log on the user saying "done" alone if the page state contradicts it.
  - **LinkedIn Easy Apply is the trap**: after submitting, the job page often shows *no* "Applied" badge and simply drops the Apply button, which looks like failure. `https://www.linkedin.com/jobs-tracker/?stage=applied` is authoritative — check there before concluding it failed or re-submitting.
  - **Beware mid-render reads.** Ashby, Indeed and Oracle HCM review pages briefly show the *previous* document/skills before swapping in the new one. Re-read after a short wait before reporting a mismatch.

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
   - **Salary comes from `applicationAnswers.salaryExpectation`** — confirmed by Krish 2026-09-08, no longer ask-first. Canada: `$120,000 CAD` salaried, `$65-80 CAD/hour` contract. US: `$156,000 - $166,400 USD` salaried, `$75-80 USD/hour` contract. Each country block has paste-ready `display` and `contractDisplay`. This **supersedes the old $175k CAD anchor**, which came from Super.com's disclosed band rather than from Krish. Watch the units the form actually asks for — one asked "gross monthly salary expectations (USD)", where the CAD-converted and US-rate anchors differ by ~75%; ask him when the anchors diverge that far.
   - **Apply to sub-band roles anyway.** His instruction: apply to strong technical matches even when the posted band tops out below the ask, and state the real number. Dutch Vet posted $85-110k against his $120k and he chose to apply and say so in the salary field.
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
| **Ashby** (2026-09 note) | as above | `browser_file_upload` after clicking the visible "Upload File" **works** — the base64 route is only needed if that fails | **`.fill()` silently fails on some fields** while the value still displays. Hit on Full Name + Phone; Street/Postal/Email/LinkedIn on the same form were fine, so it is per-field and invisible. Re-set with the React-aware setter and **grep the snapshot for "needs corrections" before submitting** | `?success` / thank-you |
| **Dayforce HCM** (Ceridian) | `jobs.dayforcehcm.com/.../CANDIDATEPORTAL` | Take **"Apply without an Account"** — no password wall. Upload the resume **FIRST** | "Import Resume" **overwrites and clears** already-filled fields (wiped confirm-email, LinkedIn, address, postal; block-capped the names). Phone reads invalid until the separate country dialing-code combobox is set. Ant Design checkboxes silently fail to toggle in a fast loop — re-query the label each time, ~120 ms apart, then verify | `/apply/success` + a confirmation number worth recording |
| **Workday** | `*.myworkdayjobs.com` | — | **ACCOUNT WALL.** "Create Account" with password is step 1 of 6. Hand off | — |
| **iCIMS** | `*.icims.com` | — | Email + GDPR consent reaches the Candidate Profile, then **"Create a login"** (Login/Password/Re-enter) is mandatory at step 1 of 4. Hand off. Its hCaptcha is invisible/passive | — |
| **Rippling** | `ats.rippling.com` | Click the upload button → `browser_file_upload` | `fill_form` works for text; dropdowns are click-input → click-option. Location is a typeahead | — |
| **Greenhouse** (direct board) | `job-boards.greenhouse.io` — **not** iframed | `browser_file_upload` after clicking "Attach" | react-select comboboxes: **clicking the input renders all options**, then click the option by its `#react-select-<id>-option-N`. Typing is unnecessary and stale text corrupts it (`YeYess`). Clear via the React setter if it happens | URL → `/confirmation`, "Thank you for applying" |
| **Oracle Cloud HCM** | `explore-jobs.<company>.com` | Click visible "Upload Resume" → `browser_file_upload` | Email-only, **no password wall**. Watch for a `honey-pot` field — leave it empty. Pay fields need a whole number plus separate Currency Code and frequency (Yearly) | Redirects to `/my-profile` showing the application under "ACTIVE JOB APPLICATIONS" |
| **Workable** (direct board) | `apply.workable.com/<co>/j/<id>/apply/` | Click the file-input's parent → `browser_file_upload` | Radios are hidden inputs inside a `<label>`; **click the wrapping label, re-querying each time with ~130 ms gaps** — a fast loop lands only a couple | URL → `?success`, "submitted successfully" + confirmation email |
| **Indeed Apply** | `smartapply.indeed.com` (from `ca.indeed.com`) | Auto-selects the résumé from his Indeed profile — keep that profile current | `fill_form` works. Continue buttons have generated `data-testid`s; query them rather than matching text (several match "Continue") | `/form/post-apply`, "Your application has been submitted" |
| **SmartRecruiters** | `jobs.smartrecruiters.com` | — | Check the real location first: a req listed "United States (Remote)" on LinkedIn was **"Remote, Remote, Brazil"** on SmartRecruiters | — |
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

## Answering screener bundles honestly

Some employers turn every JD bullet into a required yes/no. Fiscal.ai had **23**, including section headers ("Tech Stack", "Observability") and bundles mixing things he has with things he doesn't ("TypeScript, React, Next.js").

- Answer **NO** where the CV doesn't support it. A form with a few well-placed NOs is more credible than 23 YESes, and 23 YESes is transparently false to anyone reading.
- For bundles that are part-true, answer YES on the strength of what he has and **name the gap explicitly in the free-text field**. That keeps the application honest taken as a whole.
- Krish reacts well to this framing: *"Two things I'd rather you know now than discover in week two: I work in TypeScript and React but haven't shipped Next.js…"* — it suits blunt JDs and costs nothing.
- **Some questions only he can answer.** Personal investing knowledge, whether he has a public code sample, whether he'll record a video. Ask; don't infer.

## Things only Krish can supply — hand off early

Spot these *before* filling the rest of the form, so the hand-off is one message rather than three:

- **A video** (Dutch Vet wanted a 60-second Loom on approaching an unfamiliar flow).
- **A link to his own code or PR, plus real review feedback he received** — unfabricatable.
- **Account creation** on Workday / iCIMS.
- **Any CAPTCHA or "verify it's you" challenge.**

Fill everything else, log the entry as `tailored` with a `form-prepared-awaiting-user` or `blocked-account-wall` event describing exactly what remains, and note that ATS session tokens expire — he may need to refill rather than resume.

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
