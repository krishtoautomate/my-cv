// Single source of truth for the website, generated PDF/DOCX, and the
// CV-tailoring pipeline. Each bullet has tags so scripts/tailor-cv.mjs
// can score relevance against a job description and reorder/trim
// bullets without touching this file.

export const personal = {
  name: 'Krish Pavuluri',
  location: 'Montreal, QC',
  tagline: 'SDET · Test Automation Architect · Playwright, Selenium & Appium · AI-Driven Automation',
  email: 'krishpavulur@gmail.com',
  phone: '438-928-0928',
  github: 'https://github.com/krishtoautomate',
  linkedin: 'https://www.linkedin.com/in/krishpavuluri',
};

export const summary = [
  "AI Quality Engineering Architect with 10+ years in QA automation and test architecture, including 4+ years defining AI quality engineering strategy and platform architecture for enterprise test automation. Designs scalable frameworks in Python (PyTest) and Java (TestNG, Cucumber) driving Playwright, Selenium, and Appium across native and React Native iOS/Android apps on real devices, emulators, and simulators, plus mobile web and hybrid flows. Validates REST and SOAP services with Rest-Assured, Requests, and Playwright's built-in API testing; runs performance engineering with JMeter, k6, and LoadRunner; and ships Extent / Allure / Playwright HTML reporting wired into Jira and Slack. Configures Jenkins, GitLab CI, GitHub Actions, and Azure DevOps pipelines for continuous testing.",
  "Hands-on with AI, LLMs, and agentic systems: builds multi-agent pipelines where custom agents validate user stories, generate test steps, and execute them live through Playwright MCP — capturing locators during the run to auto-generate page objects and step definitions, then closing the loop with reviewer agents that evaluate the generated code, apply fixes, and open pull requests. Applies prompt engineering, embedding pipelines, and RAG retrieval over vector stores to ground agents in product, spec, and test context, and runs model evaluation to score agent and LLM output for correctness, regression, and drift before it reaches CI. Works with hosted and self-hosted models — Ollama APIs for local inference, HuggingFace Transformers with PyTorch and TensorFlow, and managed cloud AI services including Azure OpenAI, AWS Bedrock, and Vertex AI on GCP. Applies NLTK and BART for NLP-based test and chatbot validation and OpenCV for vision-driven element matching, delivered as containerized AI services with model CI/CD — versioning, automated evaluation, and retraining workflows — alongside the test grid, under AI governance and compliance controls suited to regulated banking and telecom environments. Delivers regression suites at 90%+ coverage with strong pass rates, treating tests as production code to keep false fails low and trust in CI high.",
];

export const headline =
  'SDET and Test Automation Architect with 10+ years building automation frameworks for regulated banking, telecom, and rail platforms. Designs Playwright, Selenium, and Appium suites in TypeScript, Java, and Python, wired into Jenkins, GitHub Actions, and Azure DevOps for continuous testing across web, mobile, and API layers. Builds AI-assisted and agentic test automation — multi-agent pipelines that validate user stories, generate and execute tests live through Playwright MCP, then review and fix their own output before it reaches CI. Delivers regression suites at 90%+ coverage with pass rates high enough that teams trust the pipeline.';

// Short value props rendered as a scannable strip under the header.
export const highlights = [
  { value: '10+ yrs', label: 'QA automation & architecture' },
  { value: '90%+', label: 'Automated regression coverage' },
  { value: 'Web · Mobile · API', label: 'Platforms automated' },
  { value: 'Banking · Telecom · Rail', label: 'Regulated domains' },
];

// Grouped for the CV layout; `skillNames` below stays flat for the
// tailoring pipeline and the website. Order inside each group is the
// default; scripts/tailor-cv.mjs re-sorts it against the JD.
export const skillGroups = [
  {
    label: 'Test Automation',
    items: [
      'Playwright', 'Selenium', 'Appium', 'PyTest', 'TestNG', 'Cucumber BDD',
      'Rest-Assured', 'Requests', 'Postman', 'Playwright MCP',
    ],
  },
  {
    label: 'AI & Agentic',
    items: [
      'Agentic AI', 'Multi-Agent Orchestration', 'MCP', 'Prompt Engineering',
      'RAG', 'Embedding Pipelines', 'Vector Databases', 'Model Evaluation',
      'OpenAI / LLMs', 'Ollama', 'HuggingFace Transformers', 'Claude Code',
      'GitHub Copilot', 'LangChain', 'LangGraph', 'AutoGen', 'CrewAI',
    ],
  },
  {
    label: 'ML & Governance',
    items: [
      'PyTorch', 'TensorFlow', 'NLTK', 'BART', 'OpenCV', 'Scikit-Learn',
      'MLOps / Model CI/CD', 'AI Governance & Compliance',
    ],
  },
  {
    label: 'Performance',
    items: ['JMeter', 'k6', 'LoadRunner', 'Locust'],
  },
  {
    label: 'CI/CD & Cloud',
    items: [
      'Jenkins', 'GitHub Actions', 'GitLab CI', 'Azure DevOps', 'Docker',
      'Ansible', 'Maven', 'Gradle', 'CI/CD', 'AWS', 'Azure', 'GCP',
      'Azure OpenAI', 'AWS Bedrock', 'Vertex AI',
    ],
  },
  {
    label: 'Languages & Tools',
    items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'React', 'Git', 'Jira'],
  },
];

export const skillNames = skillGroups.flatMap((g) => g.items);

const b = (text, ...tags) => ({ text, tags });

export const experiences = [
  {
    company: 'UFCU',
    location: 'Austin, TX',
    title: 'AI Quality Engineering Architect / QA Automation Engineer',
    duration: 'April 2025 – Present',
    summary: 'Banking automation on Symitar and Backbase using Python/PyTest, TestNG with Java, Playwright with TypeScript, GitHub Actions, and Azure DevOps, with an agentic AI test-generation platform layered on top.',
    tags: ['banking', 'web', 'api', 'agile', 'ai', 'architecture'],
    points: [
      b('Defined the AI quality engineering strategy and platform architecture for the automation program — assessing automation maturity, selecting AI-enabled tooling, and building the reusable framework and accelerators the team delivers against.',
        'strategy', 'architecture', 'platform', 'ai', 'leadership', 'maturity', 'roadmap', 'accelerators', 'framework'),
      b('Designed TestNG and BDD frameworks in Java for backend and API testing with reusable components and custom annotations to keep maintenance low.',
        'testng', 'bdd', 'java', 'api', 'framework', 'maintenance'),
      b('Built Python automation and PyTest suites for service-layer and data validation, using Requests for API assertions and PyTest fixtures/parametrization to cover banking scenarios without duplicating setup.',
        'python', 'pytest', 'api', 'requests', 'framework', 'data', 'banking', 'fixtures'),
      b('Built and maintained Playwright/TypeScript suites for UI and end-to-end banking flows, expanding frontend coverage and surfacing defects earlier in the cycle.',
        'playwright', 'typescript', 'ui', 'e2e', 'web', 'banking'),
      b('Automated SOAP API validation with SOAP UI and integrated results into Azure DevOps for real-time reporting against user stories.',
        'soapui', 'soap', 'api', 'azure-devops', 'reporting'),
      b('Configured GitHub Actions pipelines so Java backend and Playwright frontend suites run on every push for fast, trustworthy regression feedback.',
        'github-actions', 'ci-cd', 'devops', 'java', 'playwright', 'regression'),
      b('Delivered 90%+ regression coverage across functional and integration scenarios with a strong pass rate; treated tests as production code and updated them alongside features to keep false fails low.',
        'coverage', 'regression', 'integration', 'pass-rate', 'flake-reduction', 'test-quality'),
      b('Building an agentic AI test automation pipeline with custom agents and skills (Claude Code + Playwright MCP): a multi-agent workflow where specialised agents hand off to validate user stories, generate test steps, and execute them live against the app through Playwright MCP for autonomous validation and defect identification.',
        'agentic', 'ai', 'agents', 'multi-agent', 'orchestration', 'autonomous', 'playwright', 'mcp', 'test-generation', 'user-stories', 'validation', 'generative'),
      b('Agents capture locators during the live MCP run, then auto-generate page objects and step definitions and execute the final Playwright suite — turning a user story into reviewed, runnable automation with minimal manual authoring.',
        'agentic', 'autonomous', 'playwright', 'mcp', 'pom', 'page-objects', 'step-definitions', 'locators', 'self-healing', 'test-generation', 'framework'),
      b('Close the loop with reviewer agents that review the generated test code, apply fixes, and open pull requests — driving shift-left, continuous testing and cutting manual test-creation effort.',
        'agentic', 'ai', 'code-review', 'pull-request', 'shift-left', 'continuous-testing', 'autonomous', 'devops'),
      b('Built embedding pipelines that chunk and index product specs, user stories, and existing suites into a vector store, and applied prompt engineering with RAG retrieval to ground the agents in project and test context — improving the relevance of generated tests and failure triage.',
        'ai', 'llm', 'rag', 'embeddings', 'embedding-pipelines', 'vector-db', 'retrieval', 'prompt-engineering', 'genai', 'generative', 'pipelines'),
      b('Ran model evaluation on agent output — scoring generated tests for correctness, locator stability, and regression against a curated benchmark set — to compare candidate models before promoting one into the pipeline.',
        'ai', 'llm', 'model-evaluation', 'benchmarking', 'evaluation', 'quality', 'metrics', 'genai'),
      b('Evaluated hosted and self-hosted models for the pipeline — Ollama APIs for local inference on sensitive banking data alongside managed cloud AI services (Azure OpenAI, AWS Bedrock, Vertex AI) — trading off latency, cost, and data residency.',
        'ai', 'llm', 'ollama', 'local-inference', 'azure-openai', 'bedrock', 'vertex-ai', 'gcp', 'aws', 'azure', 'cloud', 'model-selection', 'tool-evaluation'),
      b('Applied MLOps practices to the agent stack: versioned prompts, models, and evaluation datasets in Git, wired automated evaluation runs into GitHub Actions as model CI/CD gates, and re-ran retraining/re-indexing workflows as the product changed.',
        'mlops', 'model-ci-cd', 'versioning', 'evaluation', 'retraining', 'github-actions', 'ci-cd', 'ai', 'devops', 'pipelines'),
      b('Applied AI governance and compliance controls in a regulated banking environment — keeping member data out of third-party models by routing sensitive prompts to local inference, and maintaining a versioned audit trail of prompts, models, and evaluation results so every AI-generated test can be traced back to the model and context that produced it.',
        'ai-governance', 'governance', 'compliance', 'regulated', 'banking', 'data-privacy', 'pii', 'audit-trail', 'traceability', 'responsible-ai', 'risk'),
      b('Used AI-assisted tooling across Claude Code and GitHub Copilot to accelerate test design, locator triage, and review of regression failures on Playwright traces.',
        'ai', 'llm', 'copilot', 'playwright', 'self-healing', 'productivity', 'prompt-engineering'),
    ],
    stack: ['Playwright', 'TypeScript', 'Python', 'PyTest', 'TestNG', 'Java', 'Claude Code', 'Playwright MCP', 'Ollama', 'Azure OpenAI', 'AWS Bedrock', 'Vertex AI', 'GitHub Actions', 'Azure DevOps', 'SOAP UI'],
  },
  {
    company: 'RobotActions.com',
    location: 'Montreal, QC',
    title: 'Automation Test Architect — Mobile & Codeless',
    duration: 'February 2025 – April 2025',
    summary: 'Led codeless automation tooling for native and React Native iOS/Android apps with deep CI/CD and AI integrations.',
    tags: ['mobile', 'ios', 'android', 'react-native', 'test-architect'],
    points: [
      b('Built a codeless record-and-playback platform for iOS (XCUITest, WebDriverAgent) and Android (UiAutomator, scrcpy), reducing manual testing by ~45%.',
        'codeless', 'ios', 'android', 'xcuitest', 'webdriveragent', 'uiautomator', 'mobile'),
      b('Implemented AI/ML services as containerized Python APIs (Docker) for AI-assisted element selection, AI chatbot test orchestration, and flake triage — callable from the codeless tools and from CI.',
        'ai', 'llm', 'chatbot', 'docker', 'containers', 'api', 'self-healing', 'python', 'ml'),
      b('Used OpenCV for vision-driven element matching so recorded steps survive layout and theme changes, and served HuggingFace Transformers models on PyTorch and TensorFlow behind those APIs for element classification and intent detection.',
        'opencv', 'computer-vision', 'huggingface', 'transformers', 'pytorch', 'tensorflow', 'ml', 'ai', 'self-healing', 'model-serving'),
      b('Applied NLTK for text preprocessing and BART for summarising chatbot responses and failure logs, giving NLP-based validation of conversational flows and condensed triage summaries for the team.',
        'nltk', 'bart', 'nlp', 'chatbot', 'ml', 'ai', 'triage', 'summarization'),
      b('Ran model evaluation across candidate models before rollout and versioned models, datasets, and inference services through the CI pipeline for repeatable model CI/CD.',
        'model-evaluation', 'mlops', 'model-ci-cd', 'versioning', 'evaluation', 'ml', 'ai', 'ci-cd'),
      b('Designed TestNG and Cucumber frameworks with custom annotations for modular, reusable React Native and native test suites.',
        'testng', 'cucumber', 'bdd', 'framework', 'react-native', 'mobile'),
      b('Validated REST APIs with Rest-Assured and surfaced results via Extent and Allure reports.',
        'restassured', 'rest', 'api', 'extent', 'allure', 'reporting'),
      b('Configured Jenkins, GitLab CI, and GitHub Actions pipelines (Maven/Gradle) for parallel device-farm execution.',
        'jenkins', 'gitlab-ci', 'github-actions', 'ci-cd', 'devops', 'maven', 'gradle', 'parallel'),
      b('Defined the automation and AI tooling strategy, drove solution architecture across the platform, and mentored the team on framework patterns, AI-assisted authoring, and codeless best practices.',
        'leadership', 'mentoring', 'ai', 'strategy', 'architecture', 'solution', 'collaborate', 'agile'),
    ],
    stack: ['Appium', 'XCUITest', 'UiAutomator', 'TestNG', 'Cucumber', 'Docker', 'Python', 'PyTorch', 'TensorFlow', 'HuggingFace Transformers', 'OpenCV', 'NLTK', 'BART', 'Rest-Assured'],
  },
  {
    company: 'Bell Canada',
    location: 'Montreal, QC',
    title: 'Automation Test Architect — Mobile App Enhancement',
    duration: 'June 2018 – January 2025',
    summary: 'Mobile automation across Bell, Virgin, Lucky Mobile, and PC Mobile native, React Native, and hybrid apps.',
    tags: ['mobile', 'telecom', 'ios', 'android', 'react-native', 'test-architect', 'leadership'],
    points: [
      b('Built a mobile automation lab with Appium Grid, WebDriverAgent, XCUITest, and scrcpy running on real devices, Android emulators, and Xcode simulators.',
        'appium', 'webdriveragent', 'xcuitest', 'scrcpy', 'mobile', 'ios', 'android', 'device-farm'),
      b('Developed TestNG + Cucumber frameworks with Page Object Model and custom annotations, cutting maintenance ~35%.',
        'testng', 'cucumber', 'bdd', 'pom', 'framework', 'maintenance'),
      b('Dockerized browsers and helper services to run on a unified grid for multi-platform parallel execution; later extended the same approach to host AI helper services as APIs alongside the test grid.',
        'docker', 'containers', 'parallel', 'ai', 'api', 'devops'),
      b('Automated REST API validation with Rest-Assured and Postman; published Extent and Allure reports for stakeholder visibility.',
        'restassured', 'postman', 'rest', 'api', 'extent', 'allure', 'reporting'),
      b('Ran performance engineering on the apps\' backing services with JMeter and k6 — load, soak, and spike profiles scripted as code and executed from CI — surfacing throughput and latency regressions before release.',
        'jmeter', 'k6', 'performance', 'load', 'soak', 'spike', 'api', 'ci-cd', 'performance-engineering'),
      b('Wrote Python tooling and PyTest checks for test-data generation, device-lab health, and post-run log analysis, keeping the grid and its data reliable across releases.',
        'python', 'pytest', 'test-data', 'tooling', 'device-farm', 'analysis'),
      b('Configured Jenkins and GitLab CI pipelines (Maven/Gradle/TestNG listeners) and integrated results into Jira and Slack for real-time defect tracking.',
        'jenkins', 'gitlab-ci', 'ci-cd', 'devops', 'maven', 'gradle', 'jira', 'slack', 'reporting'),
      b('Achieved 95% functional and regression coverage across native and React Native apps; kept suites green by aggressively retiring flaky tests and updating selectors with each release.',
        'coverage', 'regression', 'mobile', 'react-native', 'flake-reduction', 'pass-rate'),
    ],
    stack: ['Appium', 'Selenium', 'TestNG', 'Cucumber', 'Docker', 'Jenkins', 'GitLab CI', 'React Native', 'Python', 'PyTest', 'JMeter', 'k6'],
  },
  {
    company: 'CN Railway Company',
    location: 'Montreal, QC',
    title: 'Performance and Automation Specialist',
    duration: 'January 2017 – June 2018',
    summary: 'Performance and automation testing for mobile and SAP applications, including React Native components.',
    tags: ['performance', 'mobile', 'sap', 'react-native'],
    points: [
      b('Authored Selenium / Appium / TestNG automation for native and React Native mobile apps on real devices and emulators.',
        'selenium', 'appium', 'testng', 'mobile', 'react-native'),
      b('Built TestNG-based modular frameworks with custom annotations to improve execution efficiency.',
        'testng', 'framework'),
      b('Configured Jenkins for automated test execution integrated with TFS for version control and test management.',
        'jenkins', 'tfs', 'ci-cd'),
      b('Automated API testing with SOAP UI and Rest-Assured; reported results via Extent.',
        'soapui', 'restassured', 'api', 'extent', 'reporting'),
      b('Ran LoadRunner mobile-protocol performance tests, monitored with Dynatrace and Perfmon.',
        'loadrunner', 'performance', 'mobile', 'dynatrace', 'perfmon'),
    ],
    stack: ['LoadRunner', 'Selenium', 'Appium', 'TestNG', 'Jenkins', 'SOAP UI'],
  },
  {
    company: 'CGI — Immigration Quebec',
    location: 'Montreal, QC',
    title: 'QA Consultant — LoadRunner Specialist',
    duration: 'April 2016 – November 2016',
    summary: 'Performance and automation testing for an online immigration portal including mobile access.',
    tags: ['performance', 'web', 'mobile'],
    points: [
      b('Developed LoadRunner scripts for web and mobile HTTP protocols, executing on real devices and Android emulators.',
        'loadrunner', 'performance', 'web', 'mobile'),
      b('Automated API testing with SOAP UI; configured TFS for defect tracking and CI integration.',
        'soapui', 'api', 'tfs', 'ci-cd'),
      b('Executed load and stress tests, monitored with Perfmon, and surfaced bottlenecks to dev teams.',
        'load', 'stress', 'performance', 'perfmon'),
    ],
    stack: ['LoadRunner', 'SOAP UI', 'TFS', 'Perfmon'],
  },
  {
    company: 'ATB Financial',
    location: 'Calgary, AB',
    title: 'Performance Test Lead',
    duration: 'September 2015 – March 2016',
    summary: 'Performance testing for a mobile hybrid banking application with CI/CD integration.',
    tags: ['performance', 'banking', 'mobile', 'leadership'],
    points: [
      b('Authored LoadRunner scripts for mobile and web services, simulating 3000+ virtual users on real devices and emulators.',
        'loadrunner', 'performance', 'mobile', 'web', 'load'),
      b('Configured Jenkins for automated test execution integrated with CRM and banking services for test data.',
        'jenkins', 'ci-cd', 'banking'),
      b('Monitored server performance with Perfmon and analyzed SAP server logs for defect tracking.',
        'perfmon', 'sap', 'performance'),
      b('Documented test cases in HP ALM with comprehensive coverage of critical flows.',
        'hp-alm', 'test-management', 'coverage'),
    ],
    stack: ['LoadRunner', 'Jenkins', 'HP ALM', 'Perfmon'],
  },
  {
    company: 'CGI — Immigration Quebec',
    location: 'Montreal, QC',
    title: 'QA Consultant — LoadRunner Specialist',
    duration: 'July 2014 – August 2015',
    summary: 'Performance testing for an immigration portal including mobile access.',
    tags: ['performance', 'web', 'mobile'],
    points: [
      b('Developed LoadRunner scripts for web and mobile HTTP protocols, testing on real devices and emulators.',
        'loadrunner', 'performance', 'web', 'mobile'),
      b('Monitored server resources with Perfmon and provided improvement recommendations.',
        'perfmon', 'performance'),
      b('Integrated test execution with TFS for defect tracking in an agile environment.',
        'tfs', 'agile'),
    ],
    stack: ['LoadRunner', 'Perfmon', 'TFS', 'SQL Server'],
  },
];

export const education = {
  degree: 'Bachelor of Science',
  school: 'SRM University, India',
  period: '2007 – 2011',
};
