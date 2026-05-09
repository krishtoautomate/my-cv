import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Speed, Loop, Science, MenuBook, Hub, Build, Construction } from '@mui/icons-material';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Playwright', img: 'https://playwright.dev/img/playwright-logo.svg' },
  { name: 'Selenium', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png' },
  { name: 'Appium', img: 'https://appium.io/docs/en/latest/assets/images/appium-logo-horiz.png' },
  { name: 'TestNG', icon: <Science fontSize="large" />, gradient: 'linear-gradient(135deg, #43a047, #1b5e20)' },
  { name: 'Cucumber BDD', icon: <MenuBook fontSize="large" />, gradient: 'linear-gradient(135deg, #66bb6a, #2e7d32)' },
  { name: 'Postman', img: 'https://voyager.postman.com/logo/postman-logo-orange.svg' },
  { name: 'Jenkins', img: 'https://www.jenkins.io/images/logos/jenkins/jenkins.png' },
  { name: 'GitHub Actions', img: 'https://avatars.githubusercontent.com/u/44036562' },
  { name: 'GitLab CI', img: 'https://about.gitlab.com/images/press/press-kit-icon.svg' },
  { name: 'Ansible', icon: <Hub fontSize="large" />, gradient: 'linear-gradient(135deg, #ef5350, #b71c1c)' },
  { name: 'Maven', icon: <Build fontSize="large" />, gradient: 'linear-gradient(135deg, #d84315, #bf360c)' },
  { name: 'Gradle', icon: <Construction fontSize="large" />, gradient: 'linear-gradient(135deg, #00897b, #004d40)' },
  { name: 'Docker', img: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png' },
  { name: 'CI/CD', icon: <Loop fontSize="large" />, gradient: 'linear-gradient(135deg, #1565C0, #0d47a1)' },
  { name: 'OpenAI / LLMs', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
  { name: 'Java', img: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
  { name: 'TypeScript', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
  { name: 'JavaScript', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
  { name: 'Python', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  { name: 'React', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  { name: 'Jira', img: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg' },
  { name: 'Git', img: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png' },
  { name: 'LoadRunner', icon: <Speed fontSize="large" />, gradient: 'linear-gradient(135deg, #FF7043, #d84315)' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const SkillVisual = ({ skill }) => {
  const [failed, setFailed] = useState(false);
  if (skill.icon || failed) {
    return (
      <Box
        sx={{
          width: 56,
          height: 56,
          mb: 1.25,
          mx: 'auto',
          borderRadius: 2,
          background: skill.gradient || 'linear-gradient(135deg, #455a64, #263238)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {skill.icon || <Build fontSize="large" />}
      </Box>
    );
  }
  return (
    <img
      src={skill.img}
      alt={skill.name}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: 56, height: 56, marginBottom: 10, objectFit: 'contain' }}
    />
  );
};

const Skills = () => {
  return (
    <Box id="skills" sx={{ mb: 6 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        Key Skills and Expertise
      </Typography>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Grid container spacing={2.5} justifyContent="center">
          {skills.map((skill) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={skill.name}>
              <motion.div variants={itemVariants} whileHover={{ y: -6, scale: 1.03 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 3,
                    },
                  }}
                >
                  <SkillVisual skill={skill} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{skill.name}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Skills;
