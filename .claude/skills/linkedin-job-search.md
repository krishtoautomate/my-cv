---
name: linkedin-job-search
description: Searches LinkedIn for QA automation roles using configured keywords + remote/USA-Canada filters, dedupes reposts against the local tracker, and queues matches for the apply-to-job flow. Use when the user asks to scan LinkedIn for new postings or to refresh the queue.
---

# LinkedIn job search

**Targets:** keywords from `src/data/jobSearch.mjs` (`playwright`, `qa automation`, `appium`, `sdet`, `test architect`) — **remote** — **United States or Canada** — **past 7 days**.

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

## Daily cadence for the 10-day target

Aim for ~5-8 fresh LinkedIn matches per scan. Apply to the top 2-4 daily after tailoring; mark the rest `seen+skipped` with a one-line reason. Indeed and direct company portals fill the rest of the daily quota.
