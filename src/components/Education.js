import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';
import { School } from '@mui/icons-material';
import Section from './Section';
import { ACCENT, ACCENT_GRADIENT, glassSx, spotlightSx, gradientRingSx, setSpotlight } from '../styles/effects';

const Education = () => {
  return (
    <Section>
      <Box id="education" sx={{ mb: 6 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Education
        </Typography>
        <Paper
          elevation={0}
          onMouseMove={setSpotlight}
          sx={(theme) => ({
            ...glassSx(theme),
            ...spotlightSx(theme),
            ...gradientRingSx(theme),
            p: 3,
            transition: 'box-shadow 0.25s ease',
            '&:hover': { boxShadow: `0 12px 32px ${ACCENT.indigo}26` },
          })}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{
              p: 1.5,
              borderRadius: 2.5,
              background: ACCENT_GRADIENT,
              color: '#fff',
              display: 'flex',
              boxShadow: `0 6px 18px ${ACCENT.indigo}45`,
            }}>
              <School />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Bachelor of Science</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>SRM University, India</Typography>
            </Box>
            <Chip
              label="2007 – 2011"
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
        </Paper>
      </Box>
    </Section>
  );
};

export default Education;
