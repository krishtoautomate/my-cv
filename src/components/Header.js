import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import { Email, Phone, LinkedIn } from '@mui/icons-material';

const Header = () => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Krish Pavuluri
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        <Grid item>
          <Phone />
          <Typography variant="body1" display="inline" sx={{ marginLeft: 1 }}>
            438-928-0928
          </Typography>
        </Grid>
        <Grid item>
          <Email />
          <Typography variant="body1" display="inline" sx={{ marginLeft: 1 }}>
            <Link href="mailto:krishpavulur@gmail.com">krishpavulur@gmail.com</Link>
          </Typography>
        </Grid>
        <Grid item>
          <LinkedIn />
          <Typography variant="body1" display="inline" sx={{ marginLeft: 1 }}>
            <Link href="https://www.linkedin.com/in/krishpavuluri" target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;