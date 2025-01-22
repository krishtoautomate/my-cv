import React from 'react';
import { Box, Typography } from '@mui/material';

const Education = () => {
  return (
    <Box id="education" sx={{ marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <Typography variant="body1">
        <strong>Bachelor’s Degree</strong>
      </Typography>
      <Typography variant="body2">SRM University (2008 – 2011)</Typography>
    </Box>
  );
};

export default Education;