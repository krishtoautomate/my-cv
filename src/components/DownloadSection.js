import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Download } from '@mui/icons-material';

const DownloadSection = () => {
  const downloadFile = (format) => {
    const fileMap = {
      docx: `${process.env.PUBLIC_URL}/KRISH_PAVULURI_CV.docx`,
      pdf: `${process.env.PUBLIC_URL}/KRISH_PAVULURI_CV.pdf`
    };
    const link = document.createElement('a');
    link.href = fileMap[format];
    link.download = `KRISH_PAVULURI_CV.${format}`;
    link.click();
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h6">Download CV</Typography>
      <Button
        variant="contained"
        startIcon={<Download />}
        sx={{ margin: 1 }}
        onClick={() => downloadFile('docx')}
      >
        Download Word
      </Button>
      <Button
        variant="contained"
        startIcon={<Download />}
        sx={{ margin: 1 }}
        onClick={() => downloadFile('pdf')}
      >
        Download PDF
      </Button>
    </Box>
  );
};

export default DownloadSection;