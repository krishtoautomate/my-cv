// Search criteria for the job-hunt skills (linkedin-job-search,
// indeed-job-search, apply-to-job). Tweak as the search progresses.

export const searchKeywords = [
  'sdet',
  'appium',
  'playwright',
  'selenium',
  'ai automation',
];

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
