// Search criteria for the job-hunt skills (linkedin-job-search,
// indeed-job-search, apply-to-job). Tweak as the search progresses.

export const searchKeywords = [
  'sdet',
  'appium',
  'playwright',
  'selenium',
  'ai automation',
];

// Split sourcing roughly 50/50 between LinkedIn and Indeed (indeed.ca).
// Krish's instruction 2026-09-08: do not spend the whole session on one
// board. The two surface genuinely different inventory - Coursera and
// Fiscal.ai, the two best-paid finds of that session, appeared only on
// Indeed and never on LinkedIn.
export const boardSplit = { linkedin: 0.5, indeed: 0.5 };

// LinkedIn geo IDs and Indeed base hosts for each target country.
// Canada only as of 2026-09-08 — Krish's primary focus. The US entry is
// kept but commented out rather than deleted, since he is TN-eligible and
// may want to reopen it; uncomment to search both again.
export const targetLocations = [
  { country: 'Canada', linkedinGeoId: '101174742', indeedBase: 'https://ca.indeed.com' },
  // { country: 'United States', linkedinGeoId: '103644278', indeedBase: 'https://www.indeed.com' },
];

export const filters = {
  // remoteOnly is strict as of 2026-09-08: if a posting says "hybrid"
  // anywhere, skip it, even when the comp and technical fit are strong and
  // the in-office clause only binds people near an office. Krish is Montreal
  // and will not relocate or commute.
  remoteOnly: true,
  skipHybrid: true,
  // Krish is not bilingual. Skip postings that require French; "French as an
  // asset" is fine.
  skipFrenchRequired: true,
  postedWithinDays: 7,
  excludeReposts: true, // dedupe against data/applied-jobs.json signatures

  // Compensation floor. Krish, 2026-09-09: "60-75k is very juniour level".
  // A disclosed band whose TOP is at or below ~100k CAD is a junior/analyst
  // req regardless of how the title reads, and is a hard skip - do not spend
  // a tailored CV or an Easy Apply on it. Two on 2026-09-09 were caught by
  // this: JD Power "QA Automation Analyst" (60-75k, P2/Analyst II) and
  // LeverageTek (60-70k), both otherwise clean technical matches.
  //
  // This is NOT the same as the sub-band rule. Applying anyway is right when
  // a band brackets or approaches the ask (Dutch Vet 85-110k, ABC Fitness
  // 95-100k) - state 120k and log the gap. It is wrong when the band is
  // roughly half the ask, because that signals the seniority of the role,
  // not just its budget.
  // Reinforced 2026-09-10: Krish declined HCLTech at a flat $85,000 CAD -
  // "No hcl, 85k is very low" - despite one of the strongest JDs of the week
  // (GraphQL contract testing, GitLab CI quality gates, enterprise framework
  // architecture, LLMs in QE). $85k is 71% of the ask and is firmly below the
  // line, not borderline. He has now rejected the $60-75k tier and the $85k
  // tier in the same week, so do not offer exceptions to this floor.
  minSalaryTopCAD: 100000,
  // Equivalent contract floor: below ~$60 CAD/hour is the same signal.
  minHourlyCAD: 60,
};

// Companies Krish has told me not to apply to, whatever the posting says.
// No reason required and none recorded - treat as absolute. Check this list
// before evaluating a posting, not after tailoring.
export const excludeCompanies = [
  'Aequilibrium',   // 2026-09-10
  'GoMaterials',    // 2026-09-10
];

export const isExcludedCompany = (company) => {
  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const c = norm(company);
  return excludeCompanies.some((x) => c.includes(norm(x)));
};

// LinkedIn search URL. f_WT=2 = Remote, f_TPR=r604800 = past week.
export const linkedinSearchUrl = (keyword, geoId) => {
  const params = new URLSearchParams({
    keywords: keyword,
    f_WT: '2',
    f_TPR: 'r604800',
    geoId,
  });
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
};

// Indeed search URL with remote attribute and 7-day freshness.
// `sc=0kf:attr(DSQF7);` is Indeed's parameter for the Remote facet.
export const indeedSearchUrl = (keyword, base) => {
  const params = new URLSearchParams({
    q: keyword,
    sc: '0kf:attr(DSQF7);',
    fromage: '7',
  });
  return `${base}/jobs?${params.toString()}`;
};

// Cartesian product of (keyword × country) for both sites.
export const allSearchUrls = () => {
  const out = [];
  for (const kw of searchKeywords) {
    for (const loc of targetLocations) {
      out.push({
        keyword: kw,
        country: loc.country,
        linkedin: linkedinSearchUrl(kw, loc.linkedinGeoId),
        indeed: indeedSearchUrl(kw, loc.indeedBase),
      });
    }
  }
  return out;
};

// Normalize a job posting into a stable signature so we can detect
// reposts (same role from different recruiters / cross-postings).
export const jobSignature = ({ company, title, location }) => {
  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${norm(company)}|${norm(title)}|${norm(location)}`;
};
