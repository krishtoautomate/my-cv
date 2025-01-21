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
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
    background: { default: '#f5f5f5' },
    text: { primary: '#333' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: { fontWeight: 700 },
    body1: { fontSize: '1rem' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <Container maxWidth="md">
        <Box sx={{ marginTop: 2 }}>
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