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
- **Content lives in the components themselves.** Each section component (`src/components/*.js`) hardcodes its data inline as JS arrays/objects (e.g. `Experience.js` has an `experiences` array). There is no JSON/CMS data layer — updating the CV means editing the component source.
- Section navigation uses `react-scroll`. Each section component must render a container with an `id` matching the `to` target in `Navigation.js` (`summary`, `skills`, `experience`, `education`, `contact`). Navigation uses `offset={-64}` to account for the sticky `AppBar`.
- **CV downloads** are served as static files from `public/KRISH_PAVULURI_CV.pdf` and `.docx`. `Navigation.js` links to them via `${process.env.PUBLIC_URL}/...` — `PUBLIC_URL` is set by CRA from `homepage` in `package.json`, so the GitHub Pages base path (`/my-cv/`) is applied automatically. Duplicate copies in `src/assets/` are not used at runtime; if you replace the CV, update the files in `public/`.
- MUI is the only UI library — prefer `@mui/material` components and the theme defined in `App.js` over custom CSS. `src/styles/styles.css` and `src/App.css` exist but are minimal.

## Job-application assistant (Playwright MCP + tailoring)

`.mcp.json` enables the official `@playwright/mcp` server when this repo is opened in Claude Code. The `.claude/skills/` directory adds three skills (`apply-to-job`, `linkedin-job-search`, `technical-recruiter-lens`) that document the full workflow.

**Goal in flight:** `data/applied-jobs.json` → `goal` records the active sprint (10 calls + 10 interview schedules in 10 days). Update events on the per-job entries; the counters derive from `events[].type`.

### Source files

- **`src/data/resume.mjs`** — single source of truth for the website, generated PDF/DOCX, and tailored output. Each bullet is `{ text, tags }`; tag taxonomy is informal (lowercase, dash-separated) — extend as needed.
- **`src/data/applicationAnswers.mjs`** — screener-only fields (phone country code, work auth, sponsorship, salary, etc.). High-stakes fields are `null` deliberately: ask the user before filling.
- **`src/data/jobSearch.mjs`** — keywords, target countries (US + Canada), remote-only flag, LinkedIn/Indeed URL builders, and the `jobSignature` helper for repost dedupe.
- **`data/applied-jobs.json`** — append-only tracker. Each job has a stable `signature`, `appliedVia` (linkedin / indeed / company-website / email / referral / other), full role detail, status lifecycle, and an `events[]` log. Don't overwrite history; append events.

### Scripts

- `npm run gen:docx` — regenerates `public/KRISH_PAVULURI_CV.docx` from `resume.mjs`. Runs automatically on `prebuild`.
- `npm run gen:pdf` — renders `public/KRISH_PAVULURI_CV.pdf` from `resume.mjs` via `@react-pdf/renderer` in Node (using `tsx`). Optional; the website lazy-renders the same PDF in-browser on user click.
- `npm run tailor -- --jd <path> --output <slug>` — scores each bullet's tags against the JD, reorders bullets and skill tiles to surface relevant ones, then runs `gen:docx` and `gen:pdf` to write `tailored/KRISH_PAVULURI_CV_<slug>.{pdf,docx}`. Pipe via `cat jd.txt | npm run tailor -- --output <slug>` to read JD from stdin.

### Rules of the road

- **Assistive only**, never autonomous. Never auto-submit a form. Never bypass CAPTCHAs / MFA / "verify it's you". Never log in for the user.
- **Remote-only**, US or Canada (per `jobSearch.mjs`). Skip postings that don't match unless explicitly overridden.
- **Skip reposts** — compute `jobSignature({company, title, location})` and check the tracker before queueing.
- **Never invent experience.** The tailoring pipeline reorders honestly; it does not fabricate. If the JD requires a tool the user has never used, surface it transparently.

## Deployment

`.github/workflows/deploy.yml` runs on push to `main`: installs deps with Node 18, runs `npm run build`, and publishes `./build` to the `gh-pages` branch via `peaceiris/actions-gh-pages@v3`. No manual steps needed after merging to `main`. The `homepage` field in `package.json` must stay in sync with the deployed URL or asset paths will break.
