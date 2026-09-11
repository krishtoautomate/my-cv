import React from 'react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { Email, Phone, LinkedIn, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ACCENT, ACCENT_GRADIENT, glassSx, spotlightSx, gradientRingSx, setSpotlight } from '../styles/effects';

const channels = [
  { icon: <GitHub />, label: 'GitHub', value: 'krishtoautomate', href: 'https://github.com/krishtoautomate' },
  { icon: <LinkedIn />, label: 'LinkedIn', value: '/in/krishpavuluri', href: 'https://www.linkedin.com/in/krishpavuluri' },
  { icon: <Email />, label: 'Email', value: 'krishpavulur@gmail.com', href: 'mailto:krishpavulur@gmail.com' },
  { icon: <Phone />, label: 'Phone', value: '438-928-0928', href: 'tel:+14389280928' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Contact = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <Box id="contact" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Reach Me
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Open to QA Automation, Test Architect, and AI-assisted automation roles. Happy to talk shop.
        </Typography>
        <Grid container spacing={2}>
          {channels.map((c) => (
            <Grid item xs={12} sm={6} md={3} key={c.label}>
              <motion.div variants={itemVariants} whileHover={{ y: -4 }} style={{ height: '100%' }}>
                <Paper
                  component="a"
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  elevation={0}
                  onMouseMove={setSpotlight}
                  sx={(theme) => ({
                    ...glassSx(theme),
                    ...spotlightSx(theme),
                    ...gradientRingSx(theme),
                    p: 2.5,
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    height: '100%',
                    transition: 'box-shadow 0.25s ease',
                    '&:hover': { boxShadow: `0 12px 32px ${ACCENT.indigo}30` },
                  })}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        color: '#fff',
                        background: ACCENT_GRADIENT,
                        width: 40,
                        height: 40,
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: `0 6px 18px ${ACCENT.indigo}40`,
                      }}
                    >
                      {c.icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        {c.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {c.value}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Contact;
