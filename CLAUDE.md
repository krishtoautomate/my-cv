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

## Job-application assistant (Playwright MCP)

`.mcp.json` enables the official `@playwright/mcp` server when this repo is opened in Claude Code. Pair it with `src/data/resume.mjs` (already the source of truth for the site) and `src/data/applicationAnswers.mjs` (screener answers, work-auth, salary, etc.) to assist with online applications:

- **Use it interactively, not autonomously.** Drive the browser to the application form, pre-fill from the data files, but the user always reviews and clicks submit. Do not bypass CAPTCHAs or login challenges, and do not mass-apply — LinkedIn / Indeed ToS forbid automated access and accounts get flagged.
- Treat `applicationAnswers.mjs` fields whose value is `null` as "ask the user before filling" — they're high-stakes (work authorization, sponsorship, salary) and shouldn't be guessed.
- Resume data lives in two places intentionally: `resume.mjs` is for the website + generated PDF/DOCX; `applicationAnswers.mjs` adds the form-screener fields the website doesn't display.

## Deployment

`.github/workflows/deploy.yml` runs on push to `main`: installs deps with Node 18, runs `npm run build`, and publishes `./build` to the `gh-pages` branch via `peaceiris/actions-gh-pages@v3`. No manual steps needed after merging to `main`. The `homepage` field in `package.json` must stay in sync with the deployed URL or asset paths will break.
