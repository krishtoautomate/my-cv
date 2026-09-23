import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import Section from './Section';
import { ACCENT_GRADIENT, glassSx, spotlightSx, gradientRingSx, setSpotlight, gradientTextSx } from '../styles/effects';
import { headline, highlights } from '../data/resume.mjs';

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
          <Typography variant="body1">{headline}</Typography>
        </Paper>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {highlights.map((h) => (
            <Grid item xs={6} md={3} key={h.label}>
              <Paper
                elevation={0}
                sx={(theme) => ({ ...glassSx(theme), p: 2, height: '100%', textAlign: 'center' })}
              >
                <Typography
                  sx={{ fontWeight: 800, fontSize: { xs: '1.05rem', sm: '1.3rem' }, lineHeight: 1.3, ...gradientTextSx }}
                >
                  {h.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  {h.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Section>
  );
};

export default Summary;
