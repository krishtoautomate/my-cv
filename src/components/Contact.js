import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import { Email, Phone, LinkedIn } from '@mui/icons-material';

const Contact = () => {
  return (
    <Box id="contact" sx={{ marginTop: 4, padding: 3, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} display="flex" alignItems="center">
          <Phone color="primary" />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            438-928-0928
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} display="flex" alignItems="center">
          <Email color="primary" />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            <Link href="mailto:krishpavulur@gmail.com" underline="hover">
              krishpavulur@gmail.com
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} display="flex" alignItems="center">
          <LinkedIn color="primary" />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            <Link href="https://www.linkedin.com/in/krishpavuluri" target="_blank" rel="noopener noreferrer" underline="hover">
              LinkedIn Profile
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;