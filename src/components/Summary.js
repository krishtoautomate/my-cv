import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Section from './Section';
import { ACCENT_GRADIENT, glassSx, spotlightSx, gradientRingSx, setSpotlight } from '../styles/effects';

const Summary = () => {
  return (
    <Section>
      <Box id="summary" sx={{ marginBottom: 6 }}>
        <Typography variant="h6" gutterBottom>
          Professional Summary
        </Typography>
        <Paper
          elevation={0}
          onMouseMove={setSpotlight}
          sx={(theme) => ({
            ...glassSx(theme),
            ...spotlightSx(theme),
            ...gradientRingSx(theme, { always: true }),
            p: { xs: 2.5, sm: 3.5 },
            pl: { xs: 3, sm: 4 },
          })}
        >
          {/* gradient accent bar */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: ACCENT_GRADIENT,
              opacity: 0.9,
            }}
          />
          <Typography variant="body1" paragraph>
            SDET and Test Automation Architect with 10+ years in QA automation and test architecture,
            including 3+ years defining AI quality engineering strategy and platform architecture for
            enterprise test automation. Designs scalable frameworks in Python (PyTest) and Java (TestNG,
            Cucumber) driving Playwright, Selenium, and Appium across native and React Native iOS/Android
            apps on real devices, emulators, and simulators, plus mobile web and hybrid flows. Validates
            REST and SOAP services with Rest-Assured, Requests, and Playwright's built-in API testing;
            runs performance engineering with JMeter, k6, and LoadRunner; and ships Extent / Allure /
            Playwright HTML reporting wired into Jira and Slack. Configures Jenkins, GitLab CI, GitHub
            Actions, and Azure DevOps pipelines for continuous testing across regulated banking, telecom,
            and rail platforms.
          </Typography>
          <Typography variant="body1">
            Hands-on with AI, LLMs, and agentic systems: builds multi-agent pipelines where custom agents
            validate user stories, generate test steps, and execute them live through Playwright MCP —
            capturing locators during the run to auto-generate page objects and step definitions, then
            closing the loop with reviewer agents that evaluate the generated code, apply fixes, and open
            pull requests. Applies prompt engineering, embedding pipelines, and RAG retrieval over vector
            stores to ground agents in product, spec, and test context, and runs model evaluation to score
            agent and LLM output for correctness, regression, and drift before it reaches CI. Delivers
            regression suites at 90%+ coverage with strong pass rates, treating tests as production code to
            keep false fails low and trust in CI high.
          </Typography>
        </Paper>
      </Box>
    </Section>
  );
};

export default Summary;
