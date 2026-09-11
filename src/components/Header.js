import React from 'react';
import { Box, Typography, Stack, IconButton, Tooltip, Chip } from '@mui/material';
import { Email, LinkedIn, GitHub, LocationOn, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';

const reach = [
  { icon: <GitHub />, label: 'GitHub', href: 'https://github.com/krishtoautomate' },
  { icon: <LinkedIn />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/krishpavuluri' },
  { icon: <Email />, label: 'Email', href: 'mailto:krishpavulur@gmail.com' },
  { icon: <Phone />, label: 'Phone', href: 'tel:+14389280928' },
];

const blob = (color, x, y, delay) => ({
  position: 'absolute',
  width: 320,
  height: 320,
  borderRadius: '50%',
  filter: 'blur(80px)',
  opacity: 0.45,
  background: color,
  top: y,
  left: x,
  zIndex: 0,
  pointerEvents: 'none',
  animation: `floatBlob 14s ease-in-out ${delay}s infinite`,
});

const Header = () => {
  return (
    <Box sx={{
      position: 'relative',
      textAlign: 'center',
      mb: 6,
      py: { xs: 4, sm: 7 },
      overflow: 'hidden',
      borderRadius: 4,
    }}>
      <style>{`
        @keyframes floatBlob {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(40px, -30px) scale(1.08); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
      <Box sx={blob('radial-gradient(circle, #1565C0 0%, transparent 70%)', '8%', '-10%', 0)} />
      <Box sx={blob('radial-gradient(circle, #FF7043 0%, transparent 70%)', '70%', '40%', 3)} />
      <Box sx={blob('radial-gradient(circle, #7E57C2 0%, transparent 70%)', '40%', '60%', 6)} />

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
              mb: 1,
              background: 'linear-gradient(90deg, #1565C0, #7E57C2, #FF7043)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 8s ease infinite',
              '@keyframes gradientShift': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%':      { backgroundPosition: '100% 50%' },
              },
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
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2.5, fontWeight: 500 }}>
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
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
            {[
              <Chip key="loc" icon={<LocationOn />} label="Montreal, QC" size="small" variant="outlined" />,
              <Chip key="yrs" label="10+ years experience" size="small" color="primary" variant="outlined" />,
              <Chip key="stk" label="Banking · Telecom · Rail" size="small" variant="outlined" />,
            ].map((c, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                {c}
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
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <Tooltip title={r.label}>
                  <IconButton
                    component="a"
                    href={r.href}
                    target={r.href.startsWith('http') ? '_blank' : undefined}
                    rel={r.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    color="primary"
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'background.paper',
                    }}
                    aria-label={r.label}
                  >
                    {r.icon}
                  </IconButton>
                </Tooltip>
              </motion.div>
            ))}
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Header;
