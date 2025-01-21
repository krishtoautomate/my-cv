import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Skills = () => {
  const skills = [
    "Automation Testing: Selenium (WebDriver, JDBC), Appium, Postman, Rest-Assured, Cucumber, TestNG.",
    "Performance Testing: LoadRunner, JMeter, Dynatrace, Perfmon, Network Virtualization Agent.",
    "DevOps & CI/CD: Jenkins, Docker, Ansible, Maven, Gradle, Git.",
    "Languages: Java, Python, VB, JavaScript.",
    "Database: SQL Server, Oracle DB, MySQL.",
    "Tools & Utilities: Jira, ALM, TFS, Charles Proxy, Glassbox."
  ];

  return (
    <Box id="skills" sx={{ marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Key Skills and Expertise
      </Typography>
      <List>
        {skills.map((skill, index) => (
          <ListItem key={index}>
            <ListItemText primary={skill} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Skills;