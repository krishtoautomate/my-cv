import React from 'react';
import { Box, Typography } from '@mui/material';

const Summary = () => {
  return (
    <Box id="summary" sx={{ marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Professional Summary
      </Typography>
      <Typography variant="body1">
        Over 8 years of expertise in software testing, specializing in automation, performance testing, 
        and DevOps practices. Adept at developing and implementing robust test strategies using tools 
        like Selenium, Appium, and LoadRunner. Proven ability to lead testing initiatives for large-scale 
        projects in agile and DevOps environments, ensuring seamless integration and high-quality deliverables.
      </Typography>
    </Box>
  );
};

export default Summary;