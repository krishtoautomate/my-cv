import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Experience = () => {
  const experiences = [
    {
      company: "Bell Canada",
      title: "Automation Lead/Manager",
      duration: "June 2018 – January 2025",
      responsibilities: [
        "Built and managed a device farm integrating Selenium Grid and Appium with custom tools, running automation suites on 200+ devices.",
        "Created a mobile automation lab with Jenkins, WebDriverAgent, XCUITest, scrcpy, Appium Grid, and other tools.",
        "Developed and maintained hybrid automation frameworks using Page-Object Model, TestNG, Cucumber, Appium, Extent Reports, Allure Reports, Maven, and Gradle.",
        "Integrated Jenkins, Jira, Slack, and Extent Reports with TestNG listeners for real-time reporting and Jira execution updates.",
        "Dockerized multiple browsers and versions to run tests on a unified grid for multi-platform support.",
        "Implemented containerization strategies using Docker and Ansible for efficient test environment management.",
        "Conducted mobile and web testing using Charles, DTM, and Glassbox for defect analysis."
      ]
    },
    {
      company: "CN Railway Company",
      title: "Performance and Automation Specialist",
      duration: "January 2017 – June 2018",
      responsibilities: [
        "Developed and executed both automation and performance test scripts for SAP applications using Business Component Framework (BPT).",
        "Designed performance test workflows for critical business transactions.",
        "Managed offshore automation projects and ensured task completion within deadlines.",
        "Extracted performance test statistics using tools like Perfmon, NMON, SCOM, and Dynatrace.",
        "Conducted performance tests in UAT and STG environments, monitored application performance, and analyzed test results."
      ]
    },
    {
      company: "CGI – Immigration Quebec",
      title: "QA Consultant - LoadRunner Specialist",
      duration: "April 2016 – November 2016",
      responsibilities: [
        "Developed and customized LoadRunner test scripts for performance evaluation.",
        "Installed components for performance evaluation with LoadRunner.",
        "Conducted load, stress, duration, and fail-over tests.",
        "Provided performance statistics and improvement recommendations.",
        "Collaborated with project stakeholders and supported development teams."
      ]
    },
    {
      company: "ATB Financial",
      title: "Performance Test Lead",
      duration: "September 2015 – March 2016",
      responsibilities: [
        "Developed and executed performance test strategies and plans for mobile applications.",
        "Monitored and analyzed server performance to optimize resource utilization.",
        "Prepared and maintained test environments for mobile applications.",
        "Proposed service level agreements for approval and conducted reviews of test scenarios.",
        "Developed and executed scripts using HP LoadRunner for over 3000 Vusers."
      ]
    }
  ];

  return (
    <Box id="experience" sx={{ marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Professional Experience
      </Typography>
      {experiences.map((exp, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {exp.company}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            <strong>{exp.title}</strong> ({exp.duration})
          </Typography>
          <List>
            {exp.responsibilities.map((res, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={res} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default Experience;