import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Section from './Section';

const Summary = () => {
  return (
    <Section>
      <Box id="summary" sx={{ marginBottom: 6 }}>
        <Typography variant="h6" gutterBottom>
          Professional Summary
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            border: '1px solid',
            borderColor: 'divider',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: 4,
              background: 'linear-gradient(180deg, #1565C0, #FF7043)',
            },
          }}
        >
          <Typography variant="body1" paragraph>
            Software Quality Assurance professional with 10+ years of experience testing native and
            React Native iOS and Android apps on real devices, emulators, and simulators, plus mobile
            web and hybrid flows with Playwright. Designs scalable automation frameworks with TestNG,
            Cucumber, and Playwright Test, validates REST and SOAP services with Rest-Assured and
            Playwright's built-in API testing, and ships rich Extent / Allure / Playwright HTML
            reporting wired into Jira and Slack. Configures Jenkins, GitLab CI, and GitHub Actions
            pipelines to run Selenium, Appium, and Playwright suites as part of continuous testing.
          </Typography>
          <Typography variant="body1">
            Hands-on with AI-assisted automation: implementing AI services through containerized APIs,
            building and testing AI chatbot integrations, and using LLMs to accelerate test design,
            triage, and self-healing locators. Delivers and maintains regression suites at 90%+ test
            coverage with strong pass rates, treating tests as production code — kept up to date with
            the app to keep false fails low and trust in CI high.
          </Typography>
        </Paper>
      </Box>
    </Section>
  );
};

export default Summary;
