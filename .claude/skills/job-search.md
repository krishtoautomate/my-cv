---
name: job-search
description: Searches LinkedIn and indeed.ca for QA automation / SDET roles using configured keywords and Canada-remote filters, dedupes against both the local tracker and LinkedIn's own applied list, and queues matches for the apply-to-job flow. Use when the user asks to scan for new postings or refresh the queue.
---

# Job search (LinkedIn + indeed.ca)

**Targets:** keywords from `src/data/jobSearch.mjs` (`sdet`, `appium`, `playwright`, `selenium`, `ai automation`) — **remote** — **Canada** — recent postings.

## Split the session ~50/50 between the two boards

Krish's instruction (2026-09-08): *"we have to be 50-50 in linkedin and indeed and can't spend 100% on linkedin"*. This is not just a preference — **the boards carry different inventory**. The two best-paid finds of that session, Coursera (CAD $137.6–172k) and Fiscal.ai ($100–220k + equity), appeared **only on indeed.ca** and in no LinkedIn search. Indeed also discloses salary bands far more often, which is what makes comp-based filtering possible at all.

Track the running split via `appliedVia` in `data/applied-jobs.json`.

## Hard filters — apply BEFORE tailoring

From `src/data/jobSearch.mjs` → `filters`. Checking these late wastes a tailored CV:

1. **Canada only**, remote, anywhere in the country.
2. **Explicit "hybrid" → skip.** Even when the in-office clause is conditional ("if you're within comfortable travel distance") and even when it's the best role of the batch. Grep the JD for `hybrid` as a first move.
3. **French required → skip.** French-language job titles are the tell (nesto, QTR, Expleo, "Bilingual … (French First)"). French "as an asset" is fine.
4. **Down-level → skip.** ~2 years' experience, or work framed as executing "under the guidance of senior engineers".
5. **Check the posted band** where disclosed. Apply to sub-band roles anyway if the technical match is strong, and state the real number — but log the gap.

## Account safety and ToS — non-negotiable

- I drive a real browser at human pace. No rapid clicks, no scraping loops, no headless-detection workarounds.
- I never auto-apply. Easy Apply forms are filled assistively; the **user clicks Submit**.
- If LinkedIn shows a CAPTCHA, security check, or "let's confirm it's you", I stop, screenshot, and ask the user to handle it. I do not attempt to bypass.
- I do not log in on the user's behalf. If we hit a login wall, the user signs in.
- I respect rate-limit signals: if results stop loading or LinkedIn temporarily blocks me, I back off — do not retry hammer.

## URL parameters that matter

- `keywords=<phrase>` — single phrase per request. LinkedIn's AND/OR logic across keywords is opaque, so do **one search per keyword** instead of stuffing them.
- `f_WT=2` — Remote. (`1` = onsite, `3` = hybrid.)
- `f_TPR=r604800` — past 7 days (in seconds). `r86400` = 24h. `r2592000` = past month — use for broader sweep when 7-day pool is exhausted.
- `geoId=103644278` — United States. `geoId=101174742` — Canada.
- `f_AL=true` would limit to Easy Apply — **we do not set this**. The user wants to apply on company sites too.
- "**Actively reviewing applicants**" badge on a card is a real freshness signal — prioritize those.

`src/data/jobSearch.mjs` exposes `linkedinSearchUrl(keyword, geoId)` and `allSearchUrls()`. Use those rather than hand-rolling URLs.

## Noise that LinkedIn surfaces — skip-list

- **"Quality Assurance Developer" / similar at DataAnnotation, Outlier, Sundayy** — these are AI-training labelling roles, not real QA. The title triggers our keyword filter but the work is human-RLHF data labelling.
- **"Sr. Software Engineer (Automation Tools)"** at generalist tech companies — check the JD. Sometimes this is DevOps/build-infra rather than test automation. User is open to DevOps **only** when it involves GitHub Actions / Jenkins / Ansible / Helm / Docker test execution; pure SRE/Terraform/Okta infra is skip.
- **Aggregator postings** (Jobgether, Sundayy as poster): note the aggregator, get the partner company on call 1, don't tailor heavily until then.
- **Staffing agency without client name** (Oliver Peters, Pinnacle, S.i. Systems on direct LinkedIn posts): apply if JD is concrete, but watch for exclusivity language at form-fill time.

## Reposts — how to detect

LinkedIn shows the same role multiple times because:
- Different recruiters cross-post the same opening.
- The poster re-shares to bump it.
- Aggregators replicate it.

Build the signature `<company>|<title>|<location>` (normalized, via `jobSignature` in `src/data/jobSearch.mjs`) and check `data/applied-jobs.json`:
- If it matches an existing entry with status `seen` or later → it's a repost. Skip silently.
- If it's a different LinkedIn job ID but same signature, surface it as "repost" rather than a fresh hit and don't double-count.

## Workflow

1. Compute search URLs via `allSearchUrls()` from `src/data/jobSearch.mjs`.
2. For each LinkedIn URL, open via Playwright MCP and scroll to load enough results (one screen, maybe two — don't binge-scroll).
3. For each visible card, extract: title, company, location, date posted, URL, "Easy Apply" badge, and any current saved/applied state.
4. Compute the signature and skip reposts/duplicates.
5. Score each remaining hit by JD-tag overlap with `src/data/resume.mjs`. Surface the top 3-5 to the user with: title, company, posted-when, URL, the keyword that matched, and whether it's Easy Apply.
6. For each one the user picks, hand off to the **`apply-to-job`** skill.
7. For the rest, write a `seen` entry to the tracker so we don't re-evaluate them on the next pass.

## indeed.ca

Use `ca.indeed.com`. `smartapply.indeed.com` is Indeed's shared apply-form host, not a different country site — seeing it during Indeed Apply is expected.

- **Indeed Apply needs Krish logged in.** He must do that himself; open `https://secure.indeed.com/auth?hl=en_CA&co=CA` and hand off. Logged in, it is the fastest path: résumé auto-selected from his profile, a few screeners, submit.
- **His Indeed profile résumé IS his shopfront.** Indeed parses the skills employers search on from the uploaded file, not from anything hand-typed. It sat on the July CV for months, exposing 28 skills instead of 55. After any `resume.mjs` change, replace it: profile.indeed.com → Resume tab → resume options → **Replace file** → upload `public/KRISH_PAVULURI_CV.pdf` → **Save resume**. Verify with the Indeed MCP `get_resume` tool.
- **The remote facet `sc=0kf:attr(DSQF7);` is very restrictive** and exhausts within a handful of results. Vary the keywords rather than only widening `fromage`. A plain Canada-wide search plus manual remote filtering surfaces more.
- **Pace the searches.** Rapid navigation triggers a Cloudflare "Just a moment…" 403. Do not attempt to bypass — slow down, or ask Krish to clear it.
- **The Indeed MCP connector** (`search_jobs`, `get_job_details`, `get_company_data`, `get_resume`) hits Indeed's API and keeps working even when the browser is challenged. Good for discovery; apply in the browser.

## Dedupe — the local tracker is not enough

`data/applied-jobs.json` only records what these sessions did. LinkedIn's tracker read **107 applied** against far fewer local entries. Before queueing anything:

1. Check `data/applied-jobs.json` by signature.
2. Check `https://www.linkedin.com/jobs-tracker/?stage=applied`.
3. On the job page itself, read the "Application status" block **before** analysing the JD — EBizCharge showed "Application submitted — 4 months ago" only after a full evaluation had been done.

Backfill anything you find this way so the next pass catches it.

## Daily cadence

Aim for ~5-8 fresh matches per scan, split across both boards. Apply to the top 2-4 after tailoring; mark the rest `seen`+`skipped` with a one-line reason. Expect the Canadian remote SDET pool to exhaust quickly — on 2026-09-08 it was worked dry across four keyword sets and two date ranges. When that happens, say so rather than padding with marginal roles.
