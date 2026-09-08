import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, ExternalHyperlink,
} from 'docx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const args = process.argv.slice(2);
const argMap = {};
for (let i = 0; i < args.length; i += 2) argMap[args[i]] = args[i + 1];

const dataPath = argMap['--data']
  ? resolve(process.cwd(), argMap['--data'])
  : resolve(repoRoot, 'src/data/resume.mjs');
const outputPath = argMap['--output']
  ? resolve(process.cwd(), argMap['--output'])
  : resolve(repoRoot, 'public', 'KRISH_PAVULURI_CV.docx');

const {
  personal, headline, highlights, summary, skillGroups, skillNames,
  experiences, education,
} = await import(pathToFileURL(dataPath).href);

// Mirrors src/cv/CVDocument.jsx so the DOCX and PDF carry the same
// content at the same density.
const BULLET_BUDGET = [6, 5, 5, 3, 2, 2, 2];
const LAST_BUDGET = 2;
const SUMMARY_UNTIL = 3;
const STACK_UNTIL = 4;
const CHAR_BUDGET = [900, 700, 700, 380, 260, 260, 260];
const LAST_CHARS = 260;
const bulletBudget = (i) => BULLET_BUDGET[i] ?? LAST_BUDGET;
const charBudget = (i) => CHAR_BUDGET[i] ?? LAST_CHARS;

// Mirrors bulletsFor() in src/cv/CVDocument.jsx — count cap and character
// cap, whichever bites first, so DOCX and PDF stay in sync.
const bulletsFor = (points, roleIndex) => {
  const maxCount = bulletBudget(roleIndex);
  const maxChars = charBudget(roleIndex);
  const out = [];
  let used = 0;
  for (const p of points) {
    if (out.length >= maxCount) break;
    const text = bulletText(p);
    if (out.length > 0 && used + text.length > maxChars) break;
    out.push(p);
    used += text.length;
  }
  return out;
};

const bulletText = (p) => (typeof p === 'string' ? p : p.text);

const heading = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 240, after: 120 },
  border: { bottom: { color: 'C9C9C9', space: 4, style: BorderStyle.SINGLE, size: 6 } },
  children: [new TextRun({ text: text.toUpperCase(), bold: true, color: '1A1A1A' })],
});

const bullet = (text) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 50 },
  children: [new TextRun({ text, size: 18 })],
});

const link = (label, url) => new ExternalHyperlink({
  link: url,
  children: [new TextRun({ text: label, style: 'Hyperlink', color: '1A1A1A', underline: { type: 'single' } })],
});

const headerBlock = () => [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: personal.name.toUpperCase(), bold: true, size: 40, color: '1A1A1A' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: personal.tagline, size: 20, color: '5C5C5C' })],
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

const highlightsBlock = () => (highlights?.length ? [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: highlights.flatMap((h, i) => [
      ...(i > 0 ? [new TextRun({ text: '     |     ', size: 18, color: 'C9C9C9' })] : []),
      new TextRun({ text: h.value, bold: true, size: 18 }),
      new TextRun({ text: ` — ${h.label}`, size: 16, color: '5C5C5C' }),
    ]),
  }),
] : []);

const summaryBlock = () => [
  heading('Professional Summary'),
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: headline ?? summary.join(' '), size: 20 })],
  }),
];

const skillsBlock = () => [
  heading('Core Skills'),
  ...(skillGroups?.length
    ? skillGroups.map((g) => new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: `${g.label}: `, bold: true, size: 18 }),
          new TextRun({ text: g.items.join(' · '), size: 18 }),
        ],
      }))
    : [new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: skillNames.join(' · '), size: 20 })],
      })]),
];

const experienceBlock = () => {
  const out = [heading('Professional Experience')];
  experiences.forEach((exp, i) => {
    out.push(new Paragraph({
      spacing: { before: 160, after: 20 },
      children: [
        new TextRun({ text: `${exp.company} — ${exp.location}`, bold: true, size: 21 }),
        new TextRun({ text: `   |   ${exp.duration}`, size: 18, color: '5C5C5C' }),
      ],
    }));
    out.push(new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: exp.title, size: 21 })],
    }));
    if (exp.summary && i < SUMMARY_UNTIL) {
      out.push(new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: exp.summary, italics: true, size: 18, color: '5C5C5C' })],
      }));
    }
    for (const p of bulletsFor(exp.points, i)) out.push(bullet(bulletText(p)));
    if (i < STACK_UNTIL) {
      out.push(new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: 'Stack: ', bold: true, size: 16, color: '5C5C5C' }),
          new TextRun({ text: exp.stack.join(' · '), size: 16, color: '5C5C5C' }),
        ],
      }));
    }
  });
  return out;
};

const educationBlock = () => [
  heading('Education'),
  new Paragraph({
    children: [
      new TextRun({ text: education.degree, bold: true, size: 22 }),
      new TextRun({ text: `   ${education.school}   `, size: 20 }),
      new TextRun({ text: education.period, size: 18, color: '5C5C5C' }),
    ],
  }),
];

const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } },
  sections: [{
    properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
    children: [
      ...headerBlock(),
      ...highlightsBlock(),
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
