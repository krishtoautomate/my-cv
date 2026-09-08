# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page React resume site for Krish Pavuluri, deployed to GitHub Pages at `https://krishtoautomate.github.io/my-cv/`. Bootstrapped with Create React App (`react-scripts` 5.0.1) and built with MUI v6.

## Commands

- `npm start` — dev server on http://localhost:3000
- `npm run build` — production build to `./build`
- `npm test` — Jest in interactive watch mode (CRA default). Run a single test: `npm test -- --testPathPattern=App.test.js` or hit `p` in the watcher
- `npm run deploy` — manual `gh-pages` deploy (runs `predeploy` → `npm run build` first). Note: the standard deploy path is the GitHub Actions workflow, not this script.

## Architecture

- `src/App.js` defines the global MUI `ThemeProvider` (custom palette, typography, component overrides) and renders the page as a fixed vertical stack: `Navigation → Header → Summary → Skills → Experience → Education → Contact`. To add or reorder a section, edit `App.js` and add/order a component under `src/components/`.
- **Website content lives in the components themselves.** Each section component (`src/components/*.js`) hardcodes its data inline as JS arrays/objects. There is no JSON/CMS data layer for the website — updating the site means editing the component source. (The **CV documents** are different: they are generated from `src/data/resume.mjs`. See below.)
- Section navigation uses `react-scroll`. Each section component must render a container with an `id` matching the `to` target in `Navigation.js` (`summary`, `skills`, `experience`, `education`, `contact`). Navigation uses `offset={-64}` to account for the sticky `AppBar`.
- **CV downloads.** `Navigation.js` serves the DOCX as a static file from `public/`, but renders the **PDF in-browser** on click via `@react-pdf/renderer` (`src/cv/CVDocument.jsx`). Both the browser path and the Node generator must stay in sync — see "CV generation" below.
- MUI is the only UI library — prefer `@mui/material` components and the theme defined in `App.js` over custom CSS. `src/styles/styles.css` and `src/App.css` exist but are minimal.

## CV generation

`src/cv/CVDocument.jsx` is the single layout used by **both** the Node generator and the in-browser download. Monochrome, rule-separated, uppercase letter-spaced headings, kept to a **single text column** so ATS parsers read it in document order.

### Holding it to two pages

The layout is deliberately constrained. Do not relax these without re-checking the page count:

- `headline` (short, ~5 lines) is rendered — **not** the long `summary` array, which is retained in `resume.mjs` for reference and as a DOCX fallback only.
- `skillGroups` renders as six labelled lines rather than a chip cloud. No keywords are dropped; `skillNames` is derived from the groups.
- Older roles are progressively condensed: `BULLET_BUDGET` caps bullet count per role, and past `SUMMARY_UNTIL` / `STACK_UNTIL` the role summary and stack lines are dropped entirely.
- **`CHAR_BUDGET` matters as much as the count cap.** Tailoring reorders bullets by JD relevance, so a role can surface six *long* bullets where six short ones sat before. A count cap alone let one tailored variant reach three pages. `bulletsFor()` applies both, whichever bites first — and `scripts/generate-docx.mjs` mirrors the same logic.
- Role header groups are `wrap={false}` so a header never strands at the foot of a page. Do **not** use `minPresenceAhead` on the job block instead — it pushes whole blocks to the next page and reintroduces a half-page gap.

### Fonts

Inter, registered by the **entry point**, not by `CVDocument.jsx`:

- Node: `scripts/generate-pdf.tsx` registers from `src/cv/fonts/`.
- Browser: `src/cv/registerFonts.js` registers from `public/fonts/`, called by `Navigation.js`.

Both then pass `fontFamily="Inter"`. Without registration the document falls back to Helvetica and still renders. Only static TTFs work — variable fonts and the EOT files Google Fonts serves to legacy user agents do not.

### Verify after any layout change

```
npm run gen:pdf && pdfinfo public/KRISH_PAVULURI_CV.pdf | grep Pages   # must be 2
pdftotext public/KRISH_PAVULURI_CV.pdf - | head -3                     # name must extract cleanly
```

The name check is not cosmetic: at `letterSpacing: 2.6` the name extracted as `K R I S H PAV U L U R I`, which would corrupt the single most important field an ATS parses. It is pinned at `2.0`. Requires `poppler` (`brew install poppler`).

## Job-application assistant (Playwright MCP + tailoring)

`.mcp.json` enables the official `@playwright/mcp` server. `.claude/skills/` documents the workflow (`apply-to-job`, `job-search`, `technical-recruiter-lens`, `follow-up-recruiter`).

### Source files

- **`src/data/resume.mjs`** — single source of truth for the generated PDF/DOCX and tailored output. `headline`, `highlights`, `skillGroups` (→ `skillNames`), `experiences` (each bullet `{ text, tags }`), `education`.
- **`src/data/applicationAnswers.mjs`** — screener answers. `salaryExpectation` now carries confirmed per-country figures with paste-ready `display` (salaried) and `contractDisplay` (hourly) strings; it is no longer `null`/ask-first. Fields that remain `null` are still ask-first.
- **`src/data/jobSearch.mjs`** — keywords, target locations, `filters`, `boardSplit`, and `jobSignature` for repost dedupe.
- **`data/applied-jobs.json`** — append-only tracker. Don't overwrite history; append events.

### Scripts

- `npm run gen:docx` — regenerates `public/KRISH_PAVULURI_CV.docx`. Runs on `prebuild`.
- `npm run gen:pdf` — renders `public/KRISH_PAVULURI_CV.pdf` via `@react-pdf/renderer` in Node (`tsx`).
- `npm run tailor -- --jd <path> --output <slug>` — scores bullet tags against the JD, reorders bullets **and the items within each skill group**, then writes `tailored/KRISH_PAVULURI_CV_<slug>.{pdf,docx}`. `tailored/` is gitignored.

### Krish's hard filters — check before tailoring, not after

Encoded in `src/data/jobSearch.mjs` → `filters`. Applying these late wastes a tailored CV:

1. **Canada only**, remote, anywhere in the country. The US entry is commented out (he is TN-eligible) rather than deleted.
2. **Explicit "hybrid" → skip**, even when the in-office clause is conditional and even when the role is the best of the batch. This cost a $125–175k Magnet Forensics req.
3. **French required → skip.** He is not bilingual. French "as an asset" is fine. French-language job titles are the tell.
4. **Down-level → skip.** ~2-years-experience reqs, or work framed as executing "under the guidance of senior engineers", read as overqualified auto-rejects for a 10+ year architect.

### Compensation

Confirmed 2026-09-08. Use `applicationAnswers.salaryExpectation`:

- **Canada:** $120,000 CAD salaried · $65–80 CAD/hour contract.
- **United States:** $75–80 USD/hour → $156,000–166,400 USD salaried (× 2080 h).

Contracts have no paid PTO (~1920 billable hours), so quote the hourly rate directly and never divide an annual salary down into an hourly one. This supersedes an older $175k CAD anchor that came from Super.com's disclosed band rather than from Krish.

### Sourcing: split ~50/50 between LinkedIn and indeed.ca

Do not work one board to exhaustion. They carry different inventory — the two best-paid finds of 2026-09-08 (Coursera $137.6–172k, Fiscal.ai $100–220k) appeared **only** on indeed.ca. Indeed also discloses salary bands far more often, which is what makes comp filtering possible.

### Rules of the road

- **Assistive by default.** Fill the form, then stop. Submit only when Krish has said so — he has, repeatedly, in recent sessions; treat that as scoped to the run he said it in, not standing forever.
- **Never bypass CAPTCHAs / MFA / bot challenges.** Heavy automated navigation on Indeed triggers a Cloudflare "Just a moment…" 403 — pace the searches or ask Krish to clear it. Invisible/passive hCaptcha and reCAPTCHA are fine to proceed through.
- **Never create accounts or set passwords.** Workday, iCIMS and similar require an account before the form; hand those off with the tailored CV ready.
- **Never invent experience.** Answer screener bundles honestly — a form with a few well-placed NOs is more credible than 23 YESes.
- **Skip duplicates.** `data/applied-jobs.json` is **not** sufficient on its own: LinkedIn's own tracker read 107 applied against far fewer local entries. Check both.

## Deployment

`.github/workflows/deploy.yml` runs on push to `main`: installs deps with Node 18, runs `npm run build`, and publishes `./build` to the `gh-pages` branch via `peaceiris/actions-gh-pages@v3`. No manual steps needed after merging to `main`. The `homepage` field in `package.json` must stay in sync with the deployed URL or asset paths will break.
