// Reusable answers for online job application forms.
// Used by Claude with the Playwright MCP server to pre-fill fields
// before you review and submit. Update values as needed.

export const applicationAnswers = {
  // Identity
  fullName: 'Krish Pavuluri',
  firstName: 'Krish',
  lastName: 'Pavuluri',
  email: 'krishpavulur@gmail.com',
  phone: '438-928-0928',
  phoneCountryCode: '+1',
  city: 'Montreal',
  province: 'QC',
  country: 'Canada',
  postalCode: '',

  // Online presence
  linkedin: 'https://www.linkedin.com/in/krishpavuluri',
  github: 'https://github.com/krishtoautomate',
  portfolio: 'https://krishtoautomate.github.io/my-cv/',

  // Work-authorization. Targeting both USA and Canada — confirm
  // sponsorship answers with the user before submitting; those remain
  // null because they are high-stakes.
  authorizedToWork: {
    Canada: true,
    UnitedStates: true,
    UnitedKingdom: null,
    EuropeanUnion: null,
  },
  requiresSponsorship: {
    Canada: null, // confirm with user
    UnitedStates: null, // confirm with user
  },

  // Experience and role preferences
  yearsExperience: 10,
  currentRole: 'QA Automation Engineer',
  desiredRoles: [
    'QA Automation Engineer',
    'Test Architect',
    'SDET',
    'AI Test Automation Engineer',
  ],
  // Remote-only targeting per src/data/jobSearch.mjs filters.
  workMode: ['Remote'],
  willingToRelocate: false,
  noticePeriod: '2 weeks',

  // Compensation. Both countries confirmed by Krish on 2026-09-08:
  //   Canada        — CAD 120,000 salaried; CAD 65-80/hr on contract
  //   United States — USD 75-80/hr  ->  USD 156,000-166,400 salaried
  // Annual figures use 2080 h (40 h x 52 wk), the correct basis for a
  // salaried/exempt role. On W2 contract or C2C there is no paid time
  // off — roughly 1920 billable hours a year — so quote the hourly rate
  // directly and never divide an annual salary down into an hourly one.
  // The Canadian pair is internally consistent: 65/h x 1920 ~= 124,800,
  // which is the 120,000 salaried ask plus the value of unpaid PTO.
  salaryExpectation: {
    hoursPerYear: 2080,
    contractHoursPerYear: 1920,
    Canada: {
      currency: 'CAD',
      annualMin: 120000,
      annualMax: null,
      hourlyMin: 65,
      hourlyMax: 80,
      display: '$120,000 CAD',
      contractDisplay: '$65-80 CAD/hour',
    },
    UnitedStates: {
      currency: 'USD',
      annualMin: 156000,
      annualMax: 166400,
      hourlyMin: 75,
      hourlyMax: 80,
      display: '$156,000 - $166,400 USD (equivalent to $75-80/hour)',
      contractDisplay: '$75-80 USD/hour',
    },
    notes: 'Confirmed by Krish 2026-09-08. Supersedes the earlier 175k CAD anchor, which came from the Super.com disclosed band rather than from Krish. Use `display` on salaried reqs and `contractDisplay` on hourly/contract reqs.',
  },

  // Common screener questions
  screeners: {
    backgroundCheckOk: true,
    drugTestOk: true,
    relocationOk: null,
    travelOk: 'Up to 25%',
    securityClearance: 'Canadian Government Level A (Reliability)',
  },

  // Source of CV / cover letter (resolved at runtime)
  resumeUrl: 'https://krishtoautomate.github.io/my-cv/KRISH_PAVULURI_CV.docx',
  coverLetterTemplate: '',
};
