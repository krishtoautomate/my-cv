import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';
import { School } from '@mui/icons-material';
import Section from './Section';

const Education = () => {
  return (
    <Section>
      <Box id="education" sx={{ mb: 6 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Education
        </Typography>
        <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1565C0, #7E57C2)',
              color: '#fff',
              display: 'flex',
            }}>
              <School />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Bachelor of Science</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>SRM University, India</Typography>
            </Box>
            <Chip label="2007 – 2011" size="small" variant="outlined" />
          </Stack>
        </Paper>
      </Box>
    </Section>
  );
};

export default Education;
