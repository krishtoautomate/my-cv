export const personal = {
  name: 'Krish Pavuluri',
  location: 'Montreal, QC',
  tagline: 'QA Automation Engineer · Test Architect · AI-Assisted Automation',
  email: 'krishpavulur@gmail.com',
  phone: '438-928-0928',
  github: 'https://github.com/krishtoautomate',
  linkedin: 'https://www.linkedin.com/in/krishpavuluri',
};

export const summary = [
  "Software Quality Assurance professional with 10+ years of experience testing native and React Native iOS and Android apps on real devices, emulators, and simulators, plus mobile web and hybrid flows with Playwright. Designs scalable automation frameworks with TestNG, Cucumber, and Playwright Test, validates REST and SOAP services with Rest-Assured and Playwright's built-in API testing, and ships rich Extent / Allure / Playwright HTML reporting wired into Jira and Slack. Configures Jenkins, GitLab CI, and GitHub Actions pipelines to run Selenium, Appium, and Playwright suites as part of continuous testing.",
  "Hands-on with AI-assisted automation: implementing AI services through containerized APIs, building and testing AI chatbot integrations, and using LLMs to accelerate test design, triage, and self-healing locators. Delivers and maintains regression suites at 90%+ test coverage with strong pass rates, treating tests as production code — kept up to date with the app to keep false fails low and trust in CI high.",
];

export const skillNames = [
  'Playwright', 'Selenium', 'Appium', 'TestNG', 'Cucumber BDD', 'Postman',
  'Jenkins', 'GitHub Actions', 'GitLab CI', 'Ansible', 'Maven', 'Gradle',
  'Docker', 'CI/CD', 'OpenAI / LLMs', 'Java', 'TypeScript', 'JavaScript',
  'Python', 'React', 'Jira', 'Git', 'LoadRunner',
];

export const experiences = [
  {
    company: 'UFCU',
    location: 'Austin, TX',
    title: 'QA Automation Engineer',
    duration: 'April 2025 – Present',
    summary: 'Banking automation on Symitar and Backbase using TestNG, Java, Playwright with TypeScript, GitHub Actions, and Azure DevOps in an Agile environment.',
    points: [
      'Designed TestNG and BDD frameworks in Java for backend and API testing with reusable components and custom annotations to keep maintenance low.',
      'Built and maintained Playwright/TypeScript suites for UI and end-to-end banking flows, expanding frontend coverage and surfacing defects earlier in the cycle.',
      'Automated SOAP API validation with SOAP UI and integrated results into Azure DevOps for real-time reporting against user stories.',
      'Configured GitHub Actions pipelines so Java backend and Playwright frontend suites run on every push for fast, trustworthy regression feedback.',
      'Delivered 90%+ regression coverage across functional and integration scenarios with a strong pass rate; treated tests as production code and updated them alongside features to keep false fails low.',
      'Used AI-assisted tooling and LLMs to accelerate test design, locator triage, and review of regression failures on Playwright traces.',
    ],
    stack: ['Playwright', 'TypeScript', 'TestNG', 'Java', 'GitHub Actions', 'Azure DevOps', 'SOAP UI'],
  },
  {
    company: 'RobotActions.com',
    location: 'Montreal, QC',
    title: 'Automation Test Architect — Mobile & Codeless',
    duration: 'February 2025 – April 2025',
    summary: 'Led codeless automation tooling for native and React Native iOS/Android apps with deep CI/CD and AI integrations.',
    points: [
      'Built a codeless record-and-playback platform for iOS (XCUITest, WebDriverAgent) and Android (UiAutomator, scrcpy), reducing manual testing by ~45%.',
      'Implemented AI services as containerized APIs (Docker) for AI-assisted element selection, AI chatbot test orchestration, and flake triage — callable from the codeless tools and from CI.',
      'Designed TestNG and Cucumber frameworks with custom annotations for modular, reusable React Native and native test suites.',
      'Validated REST APIs with Rest-Assured and surfaced results via Extent and Allure reports.',
      'Configured Jenkins, GitLab CI, and GitHub Actions pipelines (Maven/Gradle) for parallel device-farm execution.',
      'Mentored team on framework patterns, AI-assisted authoring, and codeless best practices.',
    ],
    stack: ['Appium', 'XCUITest', 'UiAutomator', 'TestNG', 'Cucumber', 'Docker', 'AI APIs', 'Rest-Assured'],
  },
  {
    company: 'Bell Canada',
    location: 'Montreal, QC',
    title: 'Automation Test Architect — Mobile App Enhancement',
    duration: 'June 2018 – January 2025',
    summary: 'Mobile automation across Bell, Virgin, Lucky Mobile, and PC Mobile native, React Native, and hybrid apps.',
    points: [
      'Built a mobile automation lab with Appium Grid, WebDriverAgent, XCUITest, and scrcpy running on real devices, Android emulators, and Xcode simulators.',
      'Developed TestNG + Cucumber frameworks with Page Object Model and custom annotations, cutting maintenance ~35%.',
      'Dockerized browsers and helper services to run on a unified grid for multi-platform parallel execution; later extended the same approach to host AI helper services as APIs alongside the test grid.',
      'Automated REST API validation with Rest-Assured and Postman; published Extent and Allure reports for stakeholder visibility.',
      'Configured Jenkins and GitLab CI pipelines (Maven/Gradle/TestNG listeners) and integrated results into Jira and Slack for real-time defect tracking.',
      'Achieved 95% functional and regression coverage across native and React Native apps; kept suites green by aggressively retiring flaky tests and updating selectors with each release.',
    ],
    stack: ['Appium', 'Selenium', 'TestNG', 'Cucumber', 'Docker', 'Jenkins', 'GitLab CI', 'React Native'],
  },
  {
    company: 'CN Railway Company',
    location: 'Montreal, QC',
    title: 'Performance and Automation Specialist',
    duration: 'January 2017 – June 2018',
    summary: 'Performance and automation testing for mobile and SAP applications, including React Native components.',
    points: [
      'Authored Selenium / Appium / TestNG automation for native and React Native mobile apps on real devices and emulators.',
      'Built TestNG-based modular frameworks with custom annotations to improve execution efficiency.',
      'Configured Jenkins for automated test execution integrated with TFS for version control and test management.',
      'Automated API testing with SOAP UI and Rest-Assured; reported results via Extent.',
      'Ran LoadRunner mobile-protocol performance tests, monitored with Dynatrace and Perfmon.',
    ],
    stack: ['LoadRunner', 'Selenium', 'Appium', 'TestNG', 'Jenkins', 'SOAP UI'],
  },
  {
    company: 'CGI — Immigration Quebec',
    location: 'Montreal, QC',
    title: 'QA Consultant — LoadRunner Specialist',
    duration: 'April 2016 – November 2016',
    summary: 'Performance and automation testing for an online immigration portal including mobile access.',
    points: [
      'Developed LoadRunner scripts for web and mobile HTTP protocols, executing on real devices and Android emulators.',
      'Automated API testing with SOAP UI; configured TFS for defect tracking and CI integration.',
      'Executed load and stress tests, monitored with Perfmon, and surfaced bottlenecks to dev teams.',
    ],
    stack: ['LoadRunner', 'SOAP UI', 'TFS', 'Perfmon'],
  },
  {
    company: 'ATB Financial',
    location: 'Calgary, AB',
    title: 'Performance Test Lead',
    duration: 'September 2015 – March 2016',
    summary: 'Performance testing for a mobile hybrid banking application with CI/CD integration.',
    points: [
      'Authored LoadRunner scripts for mobile and web services, simulating 3000+ virtual users on real devices and emulators.',
      'Configured Jenkins for automated test execution integrated with CRM and banking services for test data.',
      'Monitored server performance with Perfmon and analyzed SAP server logs for defect tracking.',
      'Documented test cases in HP ALM with comprehensive coverage of critical flows.',
    ],
    stack: ['LoadRunner', 'Jenkins', 'HP ALM', 'Perfmon'],
  },
  {
    company: 'CGI — Immigration Quebec',
    location: 'Montreal, QC',
    title: 'QA Consultant — LoadRunner Specialist',
    duration: 'July 2014 – August 2015',
    summary: 'Performance testing for an immigration portal including mobile access.',
    points: [
      'Developed LoadRunner scripts for web and mobile HTTP protocols, testing on real devices and emulators.',
      'Monitored server resources with Perfmon and provided improvement recommendations.',
      'Integrated test execution with TFS for defect tracking in an agile environment.',
    ],
    stack: ['LoadRunner', 'Perfmon', 'TFS', 'SQL Server'],
  },
];

export const education = {
  degree: 'Bachelor of Science',
  school: 'SRM University, India',
  period: '2007 – 2011',
};
