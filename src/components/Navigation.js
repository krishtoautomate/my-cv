import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Download } from '@mui/icons-material';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const downloadFile = (format) => {
    const fileMap = {
      docx: `${process.env.PUBLIC_URL}/KRISH_PAVULURI_CV.docx`,
      pdf: `${process.env.PUBLIC_URL}/KRISH_PAVULURI_CV.pdf`,
    };
    const link = document.createElement('a');
    link.href = fileMap[format];
    link.download = `KRISH_PAVULURI_CV.${format}`;
    link.click();
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" color="primary" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Krish Pavuluri
        </Typography>
        <Box>
          <Button color="inherit">
            <ScrollLink to="summary" smooth={true} duration={500}>
              Summary
            </ScrollLink>
          </Button>
          <Button color="inherit">
            <ScrollLink to="skills" smooth={true} duration={500}>
              Skills
            </ScrollLink>
          </Button>
          <Button color="inherit">
            <ScrollLink to="experience" smooth={true} duration={500}>
              Experience
            </ScrollLink>
          </Button>
          <Button color="inherit">
            <ScrollLink to="education" smooth={true} duration={500}>
              Education
            </ScrollLink>
          </Button>
          <Button color="inherit">
            <ScrollLink to="contact" smooth={true} duration={500}>
              Contact
            </ScrollLink>
          </Button>
          <Button
            color="inherit"
            startIcon={<Download />}
            onClick={handleMenuClick}
          >
            Download CV
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <MenuItem onClick={() => downloadFile('docx')}>Download as Word</MenuItem>
            <MenuItem onClick={() => downloadFile('pdf')}>Download as PDF</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;