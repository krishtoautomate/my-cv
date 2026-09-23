import React, { useRef, useState } from 'react';
import { Box, Typography, Paper, Chip, Stack, Button } from '@mui/material';
import { Work, ExpandMore, ExpandLess } from '@mui/icons-material';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ACCENT, glassSx, spotlightSx, gradientRingSx, setSpotlight } from '../styles/effects';
import { experiences } from '../data/resume.mjs';

// Show the first few bullets per role; the rest sit behind a toggle so the
// newest role's long list doesn't bury the timeline.
const VISIBLE_POINTS = 5;

const RolePoints = ({ points }) => {
  const [open, setOpen] = useState(false);
  const hidden = points.length - VISIBLE_POINTS;
  const shown = open || hidden <= 0 ? points : points.slice(0, VISIBLE_POINTS);
  return (
    <>
      <Box component="ul" sx={{ pl: 2.5, m: 0, mb: hidden > 0 ? 1 : 2 }}>
        {shown.map((p, idx) => (
          <Typography
            component="li"
            key={idx}
            variant="body2"
            sx={{ mb: 0.75, '&::marker': { color: 'primary.main' } }}
          >
            {p.text}
          </Typography>
        ))}
      </Box>
      {hidden > 0 && (
        <Button
          size="small"
          onClick={() => setOpen((o) => !o)}
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
          aria-expanded={open}
          sx={{ mb: 1.5, ml: 1, px: 1, color: 'primary.main' }}
        >
          {open ? 'Show less' : `Show ${hidden} more`}
        </Button>
      )}
    </>
  );
};

const Experience = () => {
  const timelineRef = useRef(null);
  // Scroll-linked progress: the gradient line fills as the timeline crosses
  // the viewport, with a spring so it trails the scroll slightly.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.45'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });

  return (
    <Box id="experience" sx={{ mb: 6 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Career Timeline
      </Typography>
      <Box ref={timelineRef} sx={{ position: 'relative', pl: { xs: 4.5, sm: 7 } }}>
        {/* base rail */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 14, sm: 22 },
            top: 12,
            bottom: 12,
            width: '2px',
            bgcolor: 'divider',
            borderRadius: 1,
          }}
        />
        {/* scroll-linked gradient fill over the rail */}
        <Box
          component={motion.div}
          style={{ scaleY }}
          sx={{
            position: 'absolute',
            left: { xs: 14, sm: 22 },
            top: 12,
            bottom: 12,
            width: '2px',
            transformOrigin: 'top',
            background: `linear-gradient(180deg, ${ACCENT.indigo}, ${ACCENT.violet}, ${ACCENT.pink})`,
            boxShadow: `0 0 12px ${ACCENT.indigo}80`,
            borderRadius: 1,
          }}
        />
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', marginBottom: 28 }}
          >
            <Box
              component={motion.div}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 + 0.2, type: 'spring', stiffness: 260, damping: 18 }}
              sx={(theme) => ({
                position: 'absolute',
                left: { xs: -32, sm: -47 },
                top: 18,
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(139,147,255,0.5)' : 'rgba(79,70,229,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                boxShadow: `0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.10)'}, 0 0 16px ${ACCENT.indigo}40`,
              })}
            >
              <Work fontSize="small" />
            </Box>
            <Paper
              elevation={0}
              component={motion.div}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onMouseMove={setSpotlight}
              sx={(theme) => ({
                ...glassSx(theme),
                ...spotlightSx(theme),
                ...gradientRingSx(theme),
                p: { xs: 2.25, sm: 3 },
                transition: 'box-shadow 0.25s ease',
                '&:hover': { boxShadow: `0 14px 40px ${ACCENT.indigo}26` },
              })}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                alignItems={{ xs: 'flex-start', sm: 'baseline' }}
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{exp.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {exp.company} · {exp.location}
                  </Typography>
                </Box>
                <Chip
                  label={exp.duration}
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
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                {exp.summary}
              </Typography>
              <RolePoints points={exp.points} />
              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                {exp.stack.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={(theme) => ({
                      mb: 0.5,
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(23,27,38,0.04)',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'border-color 0.2s ease, color 0.2s ease',
                      '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                    })}
                  />
                ))}
              </Stack>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
