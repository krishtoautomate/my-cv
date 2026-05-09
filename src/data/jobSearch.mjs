// Search criteria for the job-hunt skills (linkedin-job-search,
// indeed-job-search, apply-to-job). Tweak as the search progresses.

export const searchKeywords = [
  'playwright',
  'qa automation',
  'appium',
  'sdet',
  'test architect',
];

// LinkedIn geo IDs and Indeed base hosts for each target country.
export const targetLocations = [
  { country: 'United States', linkedinGeoId: '103644278', indeedBase: 'https://www.indeed.com' },
  { country: 'Canada',        linkedinGeoId: '101174742', indeedBase: 'https://ca.indeed.com' },
];

export const filters = {
  remoteOnly: true,
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
