// CV variant: Orion Innovation (client JSI Telecom), Playwright-focused.
//
// Re-exports the canonical resume with the current role replaced, so both CVs
// stay in sync for skills, education and earlier history. Generate with:
//   npx tsx scripts/generate-pdf.tsx --data src/data/resume.orion.mjs --output tailored/KRISH_PAVULURI_CV_orion.pdf
//   node  scripts/generate-docx.mjs  --data src/data/resume.orion.mjs --output tailored/KRISH_PAVULURI_CV_orion.docx
//
// RobotActions runs to August 2025 here so the timeline meets the Orion start
// date and reads continuously.
import {
  personal,
  summary,
  headline,
  highlights,
  skillGroups,
  skillNames,
  education,
  experiences as canonicalExperiences,
} from './resume.mjs';

const b = (text, ...tags) => ({ text, tags });

const orion = {
  company: 'Orion Innovation',
  location: 'Remote — Client: JSI Telecom',
  title: 'Senior SDET / Playwright Automation Engineer',
  duration: 'August 2025 – Present',
  summary:
    'Playwright and BDD automation with AI-assisted authoring for JSI Telecom platforms, delivered in-sprint with TDD, reported through Allure, and run from GitHub Actions — alongside a DevOps remit across GitHub Actions, Jenkins, Docker, and AWS IdP.',
  tags: ['telecom', 'web', 'playwright', 'bdd', 'tdd', 'ai', 'devops', 'agile', 'in-sprint'],
  points: [
    b('Built Playwright automation with a BDD layer, turning user stories into executable scenarios the whole team could read.',
      'playwright', 'bdd', 'cucumber', 'typescript', 'framework', 'e2e', 'telecom'),
    b('Delivered in-sprint automation with a TDD approach — stories automated in the same sprint they were built, tests written alongside the feature.',
      'in-sprint', 'tdd', 'agile', 'shift-left', 'sprint', 'continuous-testing'),
    b('Applied AI-assisted automation to speed up test authoring, locator triage, and failure analysis.',
      'ai', 'llm', 'claude-code', 'playwright-mcp', 'agentic', 'test-generation', 'productivity'),
    b('Wired Allure reporting into the suites so failures, trends, and coverage were visible without digging through CI logs.',
      'allure', 'reporting', 'observability', 'metrics', 'stakeholders'),
    b('Ran regression on every push through GitHub Actions, gating releases with automated quality checks.',
      'github-actions', 'ci-cd', 'regression', 'quality-gates', 'continuous-testing'),
    b('Doubled as DevOps: GitHub Actions and Jenkins pipelines, Docker-containerised test execution, and AWS IdP integration for authenticated environments.',
      'devops', 'github-actions', 'jenkins', 'docker', 'containers', 'aws', 'idp', 'sso', 'iam', 'pipelines', 'infrastructure'),
  ],
  stack: ['Playwright', 'BDD/Cucumber', 'TypeScript', 'Allure', 'GitHub Actions', 'Jenkins', 'Docker', 'AWS IdP', 'Claude Code', 'Playwright MCP'],
};

// index 0 is replaced by the Orion role; index 1 is extended to meet its start.
const robotActionsExtended = {
  ...canonicalExperiences[1],
  duration: 'February 2025 – August 2025',
};

export const experiences = [orion, robotActionsExtended, ...canonicalExperiences.slice(2)];
export { personal, summary, headline, highlights, skillGroups, skillNames, education };
