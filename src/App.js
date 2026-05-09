import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';

export const ColorModeContext = createContext({ mode: 'light', toggle: () => {} });

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('color-mode');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
        main: mode === 'dark' ? '#90CAF9' : '#1565C0',
        contrastText: mode === 'dark' ? '#0a1929' : '#ffffff',
      },
      secondary: { main: '#FF7043' },
      background: {
        default: mode === 'dark' ? '#0a1929' : '#f3f4f6',
        paper: mode === 'dark' ? '#0f2238' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#e6edf3' : '#1a202c',
        secondary: mode === 'dark' ? '#9fb1c7' : '#566075',
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
      h1: { fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em' },
      h2: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontSize: '1.75rem', fontWeight: 700 },
      h6: { fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em' },
      body1: { fontSize: '1rem', lineHeight: 1.7 },
      body2: { fontSize: '0.925rem', lineHeight: 1.65 },
      button: { textTransform: 'none' },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 600, padding: '8px 16px' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 14, backgroundImage: 'none' },
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
              ? 'rgba(15,34,56,0.85)'
              : 'rgba(21,101,192,0.92)',
            backdropFilter: 'saturate(180%) blur(8px)',
          }),
        },
      },
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MotionConfig reducedMotion="user">
          <Box
            aria-hidden
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
              backgroundImage: `radial-gradient(${
                mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'
              } 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
              maskImage: 'radial-gradient(ellipse at center, #000 60%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, #000 60%, transparent 100%)',
            }}
          />
          <Box
            aria-hidden
            sx={{
              position: 'fixed',
              top: '-180px',
              right: '-180px',
              width: 540,
              height: 540,
              borderRadius: '50%',
              filter: 'blur(140px)',
              opacity: mode === 'dark' ? 0.35 : 0.22,
              background: 'radial-gradient(circle, #1565C0 0%, transparent 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <Box
            aria-hidden
            sx={{
              position: 'fixed',
              bottom: '-220px',
              left: '-160px',
              width: 600,
              height: 600,
              borderRadius: '50%',
              filter: 'blur(150px)',
              opacity: mode === 'dark' ? 0.28 : 0.18,
              background: 'radial-gradient(circle, #FF7043 0%, transparent 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          <Navigation />
          <motion.div
            style={{
              scaleX,
              transformOrigin: '0%',
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #1565C0, #FF7043)',
              zIndex: 1100,
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
