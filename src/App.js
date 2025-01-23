import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0', // Bright blue
      contrastText: '#fff', // White text for buttons
    },
    secondary: {
      main: '#FF7043', // Soft orange
    },
    background: {
      default: '#f3f4f6', // Light gray for the app background
      paper: '#ffffff', // White for components like cards or boxes
    },
    text: {
      primary: '#212121', // Dark gray for main text
      secondary: '#757575', // Lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif", // Modern font stack
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // Disable uppercase text for buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners
          fontWeight: 600,
          padding: '8px 16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for buttons
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '1px', // Add padding for containers
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '0px',
          borderRadius: '12px', // Rounded corners for cards
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)', // Slight shadow
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 5 }}>
          <Header />
          <Summary />
          <Skills />
          <Experience />
          <Education />
          <Contact />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;