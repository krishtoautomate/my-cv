import React from 'react';

const Download = () => {
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
    <section>
      <h2>Download CV</h2>
      <button onClick={() => downloadFile('docx')}>Download as Word</button>
      <button onClick={() => downloadFile('pdf')}>Download as PDF</button>
    </section>
  );
};

export default Download;