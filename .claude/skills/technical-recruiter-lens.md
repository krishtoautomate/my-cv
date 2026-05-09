---
name: technical-recruiter-lens
description: Reviews a job description (and optionally the tailored CV against it) with the lens of a senior technical recruiter / hiring manager — flags must-haves vs nice-to-haves, top ATS keywords, gaps the user should be honest about, and red flags to surface before applying. Use after pulling a JD and before tailoring, or as a sanity check before submitting.
---

# Technical-recruiter lens

Use this skill to read a JD the way the recruiter and the hiring manager will read it, and to sanity-check the tailored CV before it goes out.

## What gets scanned in the first 30 seconds

1. **Years of relevant experience.** Recruiter checks the top of the resume for an explicit number. The user's summary already says "10+ years" — for senior/staff/architect roles, also confirm the resume uses leadership verbs (architected, owned, led, mentored).
2. **Exact tooling words from the JD title and first paragraph.** ATS keyword match. Playwright, TestNG, Cucumber, Appium, Selenium, Jenkins, GitHub Actions, etc. The tailoring pipeline reorders bullets to put matched-tag bullets first; verify the **top 5 keywords from the JD all appear in the tailored DOCX**.
3. **Domain match.** Banking / fintech / telecom / healthcare / e-commerce. The user has banking (UFCU, ATB) and telecom (Bell). If the JD is in a different vertical, surface it honestly — the recruiter will.
4. **CI/CD literacy.** Make sure the most relevant CI tool from the JD shows up in the tailored skills line and stack chips.
5. **Location / remote compatibility.** Visible from the contact line. We're filtering for remote already, but the recruiter still wants to see it explicit.

## Must-haves vs nice-to-haves

JDs split requirements for a reason. Apply when **all hard requirements are met or near-met** (within one). Common bands in our space:

| Hard (must-haves) | Soft (nice-to-haves) |
|---|---|
| Years of automation experience | Cloud (AWS / Azure / GCP) |
| Primary language (Java vs JS/TS vs Python) | Specific domain (banking / health / e-comm) |
| Primary framework (Playwright / Selenium / TestNG / Cucumber) | Performance testing background |
| Mobile vs Web focus | Security clearance |
| CI/CD comfort | Specific reporting tool (Allure / Extent / TestRail) |

Apply liberally on soft mismatches, conservatively on hard mismatches. Never invent — if the user has zero Cypress experience and the JD requires Cypress, say so to the user before applying.

## Red flags to surface before tailoring

- **Onsite hidden as remote.** Filters say remote but the body says "remote within 50mi of HQ" or "remote, occasional onsite required". Surface and let the user decide.
- **Senior title with junior salary band.** Worth a heads-up.
- **Contract vs permanent mismatch.** Confirm with the user if they have a strong preference.
- **Visa-sponsorship gaps.** The user is open to both US and Canada — flag if the role explicitly excludes one.
- **Staffing-agency rebadge.** Title may be the agency, actual employer hidden. Note it but don't auto-discount; many real roles route through agencies.
- **Vague JDs ("looking for a rockstar QA")** with no tooling specifics. Often low-quality posts; lower priority.

## Outputs this skill should produce

When invoked on a JD:

1. **Recruiter brief** (5-10 lines):
   - Role, company, level, remote? location.
   - Top 5 ATS keywords (ranked).
   - Must-haves the user clearly meets / partially meets / does not meet.
   - Domain fit.
   - Red flags (if any).
   - Go / no-go recommendation.

2. **Pre-submit check** after `npm run tailor`:
   - Verify the tailored DOCX/PDF surfaces the top-5 keywords.
   - Verify role chronology and stack chips read coherently.
   - Flag any awkward keyword stuffing introduced by tag-overlap.
   - If a critical keyword is missing because the user genuinely lacks it, recommend either skipping or addressing it transparently in the cover note.

## What this skill never does

- Never invent or exaggerate experience.
- Never suggest editing `src/data/resume.mjs` to add a tool the user hasn't actually used.
- Never advise hiding a hard mismatch — recruiters and interviewers see through it and the user loses credibility.
