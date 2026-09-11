import React from 'react';
import { Box, Typography, Stack, IconButton, Tooltip, Chip } from '@mui/material';
import { Email, LinkedIn, GitHub, LocationOn, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ACCENT, ACCENT_GRADIENT, gradientTextSx, glassSx, gradientRingSx, setSpotlight } from '../styles/effects';

const reach = [
  { icon: <GitHub />, label: 'GitHub', href: 'https://github.com/krishtoautomate' },
  { icon: <LinkedIn />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/krishpavuluri' },
  { icon: <Email />, label: 'Email', href: 'mailto:krishpavulur@gmail.com' },
  { icon: <Phone />, label: 'Phone', href: 'tel:+14389280928' },
];

const blob = (color, x, y, animation) => ({
  position: 'absolute',
  width: 340,
  height: 340,
  borderRadius: '50%',
  filter: 'blur(90px)',
  opacity: 0.35,
  background: color,
  top: y,
  left: x,
  zIndex: 0,
  pointerEvents: 'none',
  animation,
});

const Header = () => {
  return (
    <Box
      onMouseMove={setSpotlight}
      sx={{
        position: 'relative',
        textAlign: 'center',
        mb: 6,
        py: { xs: 5, sm: 8 },
        px: { xs: 2, sm: 4 },
        overflow: 'hidden',
        borderRadius: 6,
        // pointer-tracking spotlight over the hero
        '@media (hover: hover)': {
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(480px circle at var(--mx, 50%) var(--my, 35%), ${ACCENT.indigo}1f, transparent 65%)`,
            opacity: 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          },
          '&:hover::after': { opacity: 1 },
        },
      }}
    >
      <Box sx={blob(`radial-gradient(circle, ${ACCENT.indigo} 0%, transparent 70%)`, '6%', '-12%', 'auroraA 18s ease-in-out infinite')} />
      <Box sx={blob(`radial-gradient(circle, ${ACCENT.pink} 0%, transparent 70%)`, '68%', '38%', 'auroraB 22s ease-in-out -4s infinite')} />
      <Box sx={blob(`radial-gradient(circle, ${ACCENT.violet} 0%, transparent 70%)`, '38%', '58%', 'auroraC 26s ease-in-out -10s infinite')} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 1.5,
              ...gradientTextSx,
              animation: 'gradientShift 8s ease infinite',
            }}
          >
            Krish Pavuluri
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3, fontWeight: 500, maxWidth: 720, mx: 'auto' }}>
            SDET · Test Automation Architect · Playwright, Selenium & Appium · AI-Driven Automation
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
          }}
        >
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 3.5 }}>
            {[
              <Chip key="loc" icon={<LocationOn />} label="Montreal, QC" size="small" />,
              <Chip key="yrs" label="10+ years experience" size="small" />,
              <Chip key="stk" label="Banking · Telecom · Rail" size="small" />,
            ].map((c, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Box
                  sx={(theme) => ({
                    ...glassSx(theme),
                    display: 'inline-flex',
                    borderRadius: 99,
                    '& .MuiChip-root': {
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'text.primary',
                      fontWeight: 500,
                    },
                    '& .MuiChip-icon': { color: 'primary.main' },
                  })}
                >
                  {c}
                </Box>
              </motion.div>
            ))}
          </Stack>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
          }}
        >
          <Stack direction="row" spacing={1.25} justifyContent="center">
            {reach.map((r) => (
              <motion.div
                key={r.label}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.85 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
                }}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
              >
                <Tooltip title={r.label}>
                  <IconButton
                    component="a"
                    href={r.href}
                    target={r.href.startsWith('http') ? '_blank' : undefined}
                    rel={r.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={r.label}
                    sx={(theme) => ({
                      ...glassSx(theme),
                      ...gradientRingSx(theme),
                      color: 'primary.main',
                      transition: 'box-shadow 0.25s ease',
                      '&:hover': {
                        boxShadow: `0 8px 24px ${ACCENT.indigo}40`,
                      },
                    })}
                  >
                    {r.icon}
                  </IconButton>
                </Tooltip>
              </motion.div>
            ))}
          </Stack>
        </motion.div>

        {/* hairline gradient rule anchoring the hero */}
        <Box
          aria-hidden
          sx={{
            mt: { xs: 4.5, sm: 6 },
            mx: 'auto',
            height: '1px',
            maxWidth: 560,
            background: ACCENT_GRADIENT,
            opacity: 0.35,
            maskImage: 'linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent)',
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;
