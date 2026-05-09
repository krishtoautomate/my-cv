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

  // Work-authorization (fill in per your situation; left as null so
  // Claude prompts you instead of guessing on a high-stakes question)
  authorizedToWork: {
    Canada: null, // true | false
    UnitedStates: null,
    UnitedKingdom: null,
    EuropeanUnion: null,
  },
  requiresSponsorship: {
    Canada: null,
    UnitedStates: null,
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
  workMode: ['Hybrid', 'Remote', 'Onsite'],
  willingToRelocate: null, // true | false | 'depends'
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
