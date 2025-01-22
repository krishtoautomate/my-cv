import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const skills = [
  { name: "Jenkins", img: "https://www.jenkins.io/images/logos/jenkins/jenkins.png" },
  { name: "Jira", img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg" },
  { name: "Git", img: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" },
  { name: "CI/CD", img: "https://miro.medium.com/max/1400/1*reCkqi6Hj2CRERclCspb4g.png" },
  { name: "Selenium", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png" },
  { name: "Appium", img: "https://appium.io/docs/en/latest/assets/images/appium-logo-horiz.png" },
  { name: "LoadRunner", img: "https://upload.wikimedia.org/wikipedia/commons/e/ee/LoadRunner_Logo.png" },
  { name: "Postman", img: "https://voyager.postman.com/logo/postman-logo-orange.svg" },
  { name: "Docker", img: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" },
  { name: "Java", img: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" },
  { name: "JavaScript", img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
  { name: "TypeScript", img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
  { name: "React", img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "TestNG", img: "https://upload.wikimedia.org/wikipedia/commons/8/8f/TestNG.png" }, // TestNG logo
  { name: "Cucumber BDD", img: "https://cucumber.io/img/cucumber-open-logo.png" }, // Cucumber logo
];

const Skills = () => {
  return (
    <Box id="skills" sx={{ marginBottom: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Key Skills and Expertise
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {skills.map((skill, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Box
              sx={{
                textAlign: 'center',
                padding: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={skill.img}
                alt={skill.name}
                style={{ width: '60px', height: '60px', marginBottom: '10px', objectFit: 'contain' }}
              />
              <Typography variant="body1">{skill.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;