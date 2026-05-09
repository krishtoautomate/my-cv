import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Download, LightMode, DarkMode } from '@mui/icons-material';
import { ColorModeContext } from '../App';

const sections = [
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const Navigation = () => {
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [generating, setGenerating] = useState(false);

  const downloadDocx = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/KRISH_PAVULURI_CV.docx`;
    link.download = 'KRISH_PAVULURI_CV.docx';
    link.click();
    setAnchorEl(null);
  };

  const downloadPdf = async () => {
    setAnchorEl(null);
    setGenerating(true);
    try {
      const [{ pdf }, { default: CVDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../cv/CVDocument'),
      ]);
      const blob = await pdf(<CVDocument />).toBlob();
      triggerDownload(blob, 'KRISH_PAVULURI_CV.pdf');
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Could not generate PDF. Please try again or download the Word version.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <AppBar position="sticky" color="primary" elevation={0} sx={{ mb: 4 }}>
      <Toolbar sx={{ gap: 1 }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700, letterSpacing: 0.3 }}
          onClick={() => scroll.scrollToTop({ smooth: true, duration: 500 })}
        >
          Krish Pavuluri
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.25 }}>
          {sections.map((s) => (
            <Button color="inherit" key={s.id} sx={{ px: 1.25 }}>
              <ScrollLink to={s.id} smooth duration={500} offset={-72} spy activeClass="active">
                {s.label}
              </ScrollLink>
            </Button>
          ))}
        </Box>

        <Tooltip title={colorMode.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton color="inherit" onClick={colorMode.toggle} aria-label="toggle color mode">
            {colorMode.mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>

        <Button
          color="inherit"
          startIcon={generating ? <CircularProgress size={16} color="inherit" /> : <Download />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          disabled={generating}
          sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
        >
          {generating ? 'Building PDF…' : 'Download CV'}
        </Button>
        <IconButton
          color="inherit"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          disabled={generating}
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          aria-label="download CV"
        >
          {generating ? <CircularProgress size={20} color="inherit" /> : <Download />}
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} keepMounted>
          <MenuItem onClick={downloadPdf}>Download as PDF (generated)</MenuItem>
          <MenuItem onClick={downloadDocx}>Download as Word</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
