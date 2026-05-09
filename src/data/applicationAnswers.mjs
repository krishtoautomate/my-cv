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

  // Compensation (fill in your actual ranges)
  salaryExpectation: {
    currency: 'CAD',
    annualMin: null,
    annualMax: null,
    notes: '',
  },

  // Common screener questions
  screeners: {
    backgroundCheckOk: true,
    drugTestOk: true,
    relocationOk: null,
    travelOk: 'Up to 25%',
  },

  // Source of CV / cover letter (resolved at runtime)
  resumeUrl: 'https://krishtoautomate.github.io/my-cv/KRISH_PAVULURI_CV.docx',
  coverLetterTemplate: '',
};
