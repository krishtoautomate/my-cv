---
name: follow-up-recruiter
description: Drafts and assists with sending a short LinkedIn DM (or InMail) to a recruiter/hiring manager 3-7 days after submitting an application, to surface the application from the ATS pile. Used after the apply-to-job flow, when an entry in data/applied-jobs.json is `applied` but has no recruiter event yet. Never auto-sends — always drafts and hands off to the user.
---

# Follow up with a recruiter

The bottleneck on the 10-recruiter-call, 10-interview goal is **getting eyes on the application** — most submissions sit in an ATS queue for 5-10 days. A short, specific LinkedIn DM to the named recruiter or hiring manager halves that.

## When to run this

- An entry in `data/applied-jobs.json` has `status: "applied"` and was submitted **3-7 days ago** with no recruiter event yet.
- The user explicitly asks to follow up on a specific posting.
- After a positive signal (recruiter viewed your profile, posting was reposted, the hiring team posted publicly on LinkedIn) — surface it and offer to draft a nudge.

Don't follow up:
- **Less than 48 hours after submission** — looks pushy and the application probably hasn't been picked up yet.
- **More than 14 days** — assume rejected silently; better to apply to a new posting at the same company than to keep chasing.
- **For aggregator postings without a known partner company** (Jobgether/Sundayy entries until the partner is named) — there's no concrete recruiter to message.
- **For body-shop / staffing agencies** — the agency's interest is selling you, not hiring you; a nudge changes nothing.

## Workflow

1. **Identify the recipient.** In priority order:
   1. Hiring manager named in the LinkedIn job post ("Job poster: Rachel Ko — Sr Technical Recruiter @ Magnet Forensics"). Tracker entry should already capture this where visible.
   2. A senior IC on the QA/Test team — search LinkedIn for "Senior SDET at <Company>" or the team lead.
   3. Generic recruiter on LinkedIn marked "Talent / Recruiting" at the company — last resort, lowest response rate.
   Avoid messaging C-level / VPs unless they explicitly posted the role.

2. **Draft the message.** Keep under 800 characters (LinkedIn's free-tier message limit; InMail is longer but you don't burn an InMail credit on this).

   Template:
   ```
   Hi <FirstName> — applied for the <Role> at <Company> on <Date> (LinkedIn ID <NNN> / via your <ATS>). Wanted to put a face to the application: I'm a 10yr automation engineer doing AI-assisted Playwright + CI/CD work — your JD on <specific JD phrase from the recruiter-lens read> mapped closely to <one concrete project from src/data/resume.mjs>. Portfolio: krishtoautomate.github.io/my-cv. Happy to share traces or framework patterns if useful.
   ```

   Tailor the **one** specific JD phrase per posting — generic openers get ignored. Examples:
   - Magnet Forensics → "agent-assisted and agentic workflows" → pair with the RobotActions containerized-AI-services bullet.
   - AssetWorks → "Use AI to produce, maintain and improve test cases" → pair with Playwright MCP at UFCU.
   - Super.com → reference the Staff SDET level alignment to the user's 10yr architect background.

3. **Hand off for sending.** Open LinkedIn, navigate to the recipient's profile, paste the draft into the message composer. **Do not auto-send** — the user reads, edits if needed, and clicks send.

4. **Log the event** to `data/applied-jobs.json` once the user confirms the message was sent:
   ```json
   {
     "events": [
       { "date": "2026-05-09T14:22:00Z", "type": "applied" },
       { "date": "2026-05-13T10:00:00Z", "type": "recruiter-nudge", "recipient": "Rachel Ko", "channel": "linkedin-dm" }
     ]
   }
   ```
   `recruiter-nudge` events don't count toward the 10-call goal, but inform the recruiter-follow-through rate analysis.

## Tone rules — strict

- **No "Just following up!"** — sounds desperate, doesn't add value.
- **No status questions** ("Has my application been reviewed yet?") — they don't know offhand and it puts work on them.
- **No salary or visa questions** in the first nudge — save for the screening call.
- **Don't repeat the resume.** They have it. Add one concrete signal they didn't see (recent project, specific result, why-this-company alignment).
- **One nudge maximum per posting.** If no reply within 7 days, move on.

## What this skill never does

- Never auto-send a message — always paste-and-pause for user review.
- Never message the same recruiter for two different roles in the same week.
- Never use LinkedIn's "Recruiter / InMail" credits without explicit user OK (those cost real money or limited free quota).
- Never claim referral, mutual connection, or shared employer that isn't true.
