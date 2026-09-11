import React, { useRef } from 'react';
import { Box, Typography, Paper, Chip, Stack } from '@mui/material';
import { Work } from '@mui/icons-material';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ACCENT, glassSx, spotlightSx, gradientRingSx, setSpotlight } from '../styles/effects';

const experiences = [
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

const Experience = () => {
  const timelineRef = useRef(null);
  // Scroll-linked progress: the gradient line fills as the timeline crosses
  // the viewport, with a spring so it trails the scroll slightly.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.45'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });

  return (
    <Box id="experience" sx={{ mb: 6 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Career Timeline
      </Typography>
      <Box ref={timelineRef} sx={{ position: 'relative', pl: { xs: 4.5, sm: 7 } }}>
        {/* base rail */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 14, sm: 22 },
            top: 12,
            bottom: 12,
            width: '2px',
            bgcolor: 'divider',
            borderRadius: 1,
          }}
        />
        {/* scroll-linked gradient fill over the rail */}
        <Box
          component={motion.div}
          style={{ scaleY }}
          sx={{
            position: 'absolute',
            left: { xs: 14, sm: 22 },
            top: 12,
            bottom: 12,
            width: '2px',
            transformOrigin: 'top',
            background: `linear-gradient(180deg, ${ACCENT.indigo}, ${ACCENT.violet}, ${ACCENT.pink})`,
            boxShadow: `0 0 12px ${ACCENT.indigo}80`,
            borderRadius: 1,
          }}
        />
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', marginBottom: 28 }}
          >
            <Box
              component={motion.div}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 + 0.2, type: 'spring', stiffness: 260, damping: 18 }}
              sx={(theme) => ({
                position: 'absolute',
                left: { xs: -32, sm: -47 },
                top: 18,
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(139,147,255,0.5)' : 'rgba(79,70,229,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                boxShadow: `0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.10)'}, 0 0 16px ${ACCENT.indigo}40`,
              })}
            >
              <Work fontSize="small" />
            </Box>
            <Paper
              elevation={0}
              component={motion.div}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onMouseMove={setSpotlight}
              sx={(theme) => ({
                ...glassSx(theme),
                ...spotlightSx(theme),
                ...gradientRingSx(theme),
                p: { xs: 2.25, sm: 3 },
                transition: 'box-shadow 0.25s ease',
                '&:hover': { boxShadow: `0 14px 40px ${ACCENT.indigo}26` },
              })}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                alignItems={{ xs: 'flex-start', sm: 'baseline' }}
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{exp.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {exp.company} · {exp.location}
                  </Typography>
                </Box>
                <Chip
                  label={exp.duration}
                  size="small"
                  sx={(theme) => ({
                    color: 'primary.main',
                    fontWeight: 600,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(139,147,255,0.10)' : 'rgba(79,70,229,0.07)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(139,147,255,0.30)' : 'rgba(79,70,229,0.22)',
                  })}
                />
              </Stack>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                {exp.summary}
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, m: 0, mb: 2 }}>
                {exp.points.map((p, idx) => (
                  <Typography
                    component="li"
                    key={idx}
                    variant="body2"
                    sx={{ mb: 0.75, '&::marker': { color: 'primary.main' } }}
                  >
                    {typeof p === 'string' ? p : p.text}
                  </Typography>
                ))}
              </Box>
              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                {exp.stack.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={(theme) => ({
                      mb: 0.5,
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(23,27,38,0.04)',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'border-color 0.2s ease, color 0.2s ease',
                      '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                    })}
                  />
                ))}
              </Stack>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
