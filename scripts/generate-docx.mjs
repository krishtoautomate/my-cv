import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, ExternalHyperlink,
} from 'docx';

import { personal, summary, skillNames, experiences, education } from '../src/data/resume.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '..', 'public', 'KRISH_PAVULURI_CV.docx');

const para = (text, opts = {}) => new Paragraph({
  spacing: { after: 80, ...(opts.spacing || {}) },
  alignment: opts.alignment,
  children: [new TextRun({ text, bold: opts.bold, italics: opts.italics, size: opts.size, color: opts.color })],
});

const heading = (text, level = HeadingLevel.HEADING_2) => new Paragraph({
  heading: level,
  spacing: { before: 240, after: 120 },
  border: {
    bottom: { color: '1565C0', space: 4, style: BorderStyle.SINGLE, size: 8 },
  },
  children: [new TextRun({ text, bold: true, color: '1565C0' })],
});

const bullet = (text) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 60 },
  children: [new TextRun({ text, size: 20 })],
});

const link = (label, url) => new ExternalHyperlink({
  link: url,
  children: [new TextRun({ text: label, style: 'Hyperlink', color: '1565C0', underline: { type: 'single' } })],
});

const headerBlock = () => [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: personal.name, bold: true, size: 44, color: '1565C0' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: personal.tagline, italics: true, size: 22, color: '566075' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [
      new TextRun({ text: `${personal.location}  |  ${personal.phone}  |  `, size: 20 }),
      link(personal.email, `mailto:${personal.email}`),
      new TextRun({ text: '  |  ', size: 20 }),
      link('LinkedIn', personal.linkedin),
      new TextRun({ text: '  |  ', size: 20 }),
      link('GitHub', personal.github),
    ],
  }),
];

const summaryBlock = () => [
  heading('Professional Summary'),
  ...summary.map((p) => new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: p, size: 20 })],
  })),
];

const skillsBlock = () => [
  heading('Core Skills'),
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: skillNames.join('  ·  '), size: 20 })],
  }),
];

const experienceBlock = () => {
  const out = [heading('Professional Experience')];
  for (const exp of experiences) {
    out.push(new Paragraph({
      spacing: { before: 160, after: 40 },
      children: [
        new TextRun({ text: exp.title, bold: true, size: 24 }),
        new TextRun({ text: `   |   ${exp.duration}`, italics: true, size: 20, color: '566075' }),
      ],
    }));
    out.push(new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: `${exp.company} · ${exp.location}`, size: 20, color: '566075' })],
    }));
    out.push(new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: exp.summary, italics: true, size: 20 })],
    }));
    for (const p of exp.points) out.push(bullet(p));
    out.push(new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({ text: 'Stack: ', bold: true, size: 18, color: '566075' }),
        new TextRun({ text: exp.stack.join(' · '), size: 18, color: '566075' }),
      ],
    }));
  }
  return out;
};

const educationBlock = () => [
  heading('Education'),
  new Paragraph({
    children: [
      new TextRun({ text: education.degree, bold: true, size: 22 }),
      new TextRun({ text: `   ${education.school}   `, size: 20 }),
      new TextRun({ text: education.period, italics: true, size: 20, color: '566075' }),
    ],
  }),
];

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22 } },
    },
  },
  sections: [{
    properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
    children: [
      ...headerBlock(),
      ...summaryBlock(),
      ...skillsBlock(),
      ...experienceBlock(),
      ...educationBlock(),
    ],
  }],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync(outputPath, buffer);
console.log(`Wrote ${outputPath} (${buffer.length} bytes)`);
