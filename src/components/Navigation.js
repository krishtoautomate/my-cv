import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Download, LightMode, DarkMode } from '@mui/icons-material';
import { ColorModeContext } from '../App';
import { ACCENT_GRADIENT, gradientTextSx } from '../styles/effects';

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
      const [{ pdf }, { default: CVDocument }, { registerInter }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../cv/CVDocument'),
        import('../cv/registerFonts'),
      ]);
      const fontFamily = registerInter();
      const blob = await pdf(<CVDocument fontFamily={fontFamily} />).toBlob();
      triggerDownload(blob, 'KRISH_PAVULURI_CV.pdf');
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Could not generate PDF. Please try again or download the Word version.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ mb: 4 }}>
      <Toolbar sx={{ gap: 1 }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            width: 'fit-content',
            ...gradientTextSx,
          }}
          onClick={() => scroll.scrollToTop({ smooth: true, duration: 500 })}
        >
          Krish Pavuluri
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.25 }}>
          {sections.map((s) => (
            <Button
              key={s.id}
              sx={{
                px: 0,
                py: 0,
                minWidth: 0,
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': { backgroundColor: 'transparent', color: 'text.primary' },
                // react-scroll's spy toggles .active on the inner anchor —
                // that's what draws the pill.
                '& a': {
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  borderRadius: 99,
                  border: '1px solid transparent',
                  transition: 'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
                },
                '& a.active': {
                  color: 'primary.main',
                  backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(139,147,255,0.10)'
                    : 'rgba(79,70,229,0.08)',
                  borderColor: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(139,147,255,0.28)'
                    : 'rgba(79,70,229,0.22)',
                },
              }}
            >
              <ScrollLink to={s.id} smooth duration={500} offset={-72} spy activeClass="active">
                {s.label}
              </ScrollLink>
            </Button>
          ))}
        </Box>

        <Tooltip title={colorMode.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton
            onClick={colorMode.toggle}
            aria-label="toggle color mode"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            {colorMode.mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </IconButton>
        </Tooltip>

        <Button
          startIcon={generating ? <CircularProgress size={16} color="inherit" /> : <Download />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          disabled={generating}
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            color: '#fff',
            background: ACCENT_GRADIENT,
            backgroundSize: '160% 160%',
            borderRadius: 99,
            px: 2.25,
            boxShadow: '0 4px 18px rgba(99,102,241,0.35)',
            transition: 'box-shadow 0.25s ease, background-position 0.4s ease, filter 0.25s ease',
            '&:hover': {
              backgroundPosition: '100% 50%',
              boxShadow: '0 6px 24px rgba(99,102,241,0.5)',
              filter: 'brightness(1.05)',
            },
            '&.Mui-disabled': { color: 'rgba(255,255,255,0.7)', background: ACCENT_GRADIENT, opacity: 0.7 },
          }}
        >
          {generating ? 'Building PDF…' : 'Download CV'}
        </Button>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          disabled={generating}
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
            color: '#fff',
            background: ACCENT_GRADIENT,
            boxShadow: '0 4px 18px rgba(99,102,241,0.35)',
            '&:hover': { filter: 'brightness(1.05)', background: ACCENT_GRADIENT },
            '&.Mui-disabled': { color: 'rgba(255,255,255,0.7)', background: ACCENT_GRADIENT, opacity: 0.7 },
          }}
          aria-label="download CV"
        >
          {generating ? <CircularProgress size={20} color="inherit" /> : <Download fontSize="small" />}
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
