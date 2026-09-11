import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, GlobalStyles } from '@mui/material';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import { ACCENT, ACCENT_GRADIENT, NOISE_DATA_URI } from './styles/effects';

export const ColorModeContext = createContext({ mode: 'light', toggle: () => {} });

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('color-mode');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Slow-drifting aurora blobs + dot grid + film grain, all fixed behind the page.
const Backdrop = ({ mode }) => {
  const dark = mode === 'dark';
  const blob = (background, sx, animation) => (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
        background,
        animation,
        ...sx,
      }}
    />
  );
  return (
    <Box aria-hidden sx={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {blob(
        `radial-gradient(circle, ${ACCENT.indigo} 0%, transparent 70%)`,
        { top: '-22vh', left: '-12vw', width: '55vw', height: '55vw', minWidth: 420, minHeight: 420, filter: 'blur(110px)', opacity: dark ? 0.35 : 0.2 },
        'auroraA 22s ease-in-out infinite'
      )}
      {blob(
        `radial-gradient(circle, ${ACCENT.violet} 0%, transparent 70%)`,
        { top: '18vh', right: '-18vw', width: '48vw', height: '48vw', minWidth: 380, minHeight: 380, filter: 'blur(120px)', opacity: dark ? 0.28 : 0.16 },
        'auroraB 26s ease-in-out infinite'
      )}
      {blob(
        `radial-gradient(circle, ${ACCENT.cyan} 0%, transparent 70%)`,
        { bottom: '-24vh', left: '-10vw', width: '50vw', height: '50vw', minWidth: 380, minHeight: 380, filter: 'blur(130px)', opacity: dark ? 0.2 : 0.13 },
        'auroraC 30s ease-in-out infinite'
      )}
      {blob(
        `radial-gradient(circle, ${ACCENT.pink} 0%, transparent 70%)`,
        { bottom: '4vh', right: '8vw', width: '34vw', height: '34vw', minWidth: 280, minHeight: 280, filter: 'blur(120px)', opacity: dark ? 0.16 : 0.1 },
        'auroraB 24s ease-in-out -8s infinite'
      )}
      {/* dot grid */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${dark ? 'rgba(255,255,255,0.05)' : 'rgba(23,27,38,0.05)'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at center, #000 55%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000 55%, transparent 100%)',
        }}
      />
      {/* film grain */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: NOISE_DATA_URI,
          backgroundRepeat: 'repeat',
          opacity: dark ? 0.05 : 0.035,
          mixBlendMode: 'overlay',
        }}
      />
    </Box>
  );
};

function App() {
  const [mode, setMode] = useState(getInitialMode);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  const colorMode = useMemo(() => ({
    mode,
    toggle: () => setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { window.localStorage.setItem('color-mode', next); } catch (_) {}
      return next;
    }),
  }), [mode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#8B93FF' : '#4F46E5',
        contrastText: mode === 'dark' ? '#07080D' : '#ffffff',
      },
      secondary: { main: ACCENT.pink },
      background: {
        default: mode === 'dark' ? '#07080D' : '#F6F7FB',
        paper: mode === 'dark' ? '#0E1018' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#E7EAF3' : '#171B26',
        secondary: mode === 'dark' ? '#98A2B8' : '#5A6274',
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.09)' : 'rgba(23,27,38,0.08)',
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
      h1: { fontSize: 'clamp(2.4rem, 6vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 },
      h2: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.01em' },
      h6: { fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.01em' },
      body1: { fontSize: '1rem', lineHeight: 1.75 },
      body2: { fontSize: '0.925rem', lineHeight: 1.65 },
      button: { textTransform: 'none' },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, fontWeight: 600, padding: '8px 16px' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 16, backgroundImage: 'none' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(9,10,16,0.72)'
              : 'rgba(255,255,255,0.72)',
            color: theme.palette.text.primary,
            backdropFilter: 'saturate(180%) blur(16px)',
            WebkitBackdropFilter: 'saturate(180%) blur(16px)',
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundImage: 'none',
            boxShadow: 'none',
          }),
        },
      },
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '@keyframes auroraA': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(6vw, -4vh) scale(1.12)' },
            },
            '@keyframes auroraB': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(-5vw, 5vh) scale(1.08)' },
            },
            '@keyframes auroraC': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(4vw, -6vh) scale(1.15)' },
            },
            '@keyframes gradientShift': {
              '0%, 100%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
            },
            '::selection': {
              backgroundColor: mode === 'dark' ? 'rgba(139,147,255,0.35)' : 'rgba(79,70,229,0.2)',
            },
            // Accessibility: collapse all CSS animation/transitions when the
            // user prefers reduced motion (framer-motion is gated separately
            // via <MotionConfig reducedMotion="user">).
            '@media (prefers-reduced-motion: reduce)': {
              '*, *::before, *::after': {
                animationDuration: '0.01ms !important',
                animationIterationCount: '1 !important',
                transitionDuration: '0.01ms !important',
              },
            },
          }}
        />
        <MotionConfig reducedMotion="user">
          <Backdrop mode={mode} />

          <Navigation />
          <motion.div
            style={{
              scaleX,
              transformOrigin: '0%',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 2.5,
              background: ACCENT_GRADIENT,
              zIndex: 1301,
            }}
          />
          <Container maxWidth="lg" sx={{ pb: 8, position: 'relative', zIndex: 1 }}>
            <Box sx={{ marginTop: 5 }}>
              <Header />
              <Summary />
              <Skills />
              <Experience />
              <Education />
              <Contact />
            </Box>
          </Container>
        </MotionConfig>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
