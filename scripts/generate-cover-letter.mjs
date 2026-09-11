import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, arg, i, arr) => {
    if (arg.startsWith('--')) acc.push([arg.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const { output, company, role, body } = args;
if (!output || !company || !role || !body) {
  console.error('Usage: --output <slug> --company <name> --role <title> --body <text>');
  process.exit(1);
}

const today = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

const para = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after ?? 200 },
  alignment: opts.alignment,
  children: [new TextRun({ text, bold: opts.bold, size: opts.size ?? 22 })],
});

const paragraphs = body.split('\n\n').map((p) => para(p.trim()));

const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
  sections: [{
    properties: { page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
    children: [
      para('Krish Pavuluri', { bold: true, size: 28 }),
      para('Montreal, QC  ·  438-928-0928  ·  krishpavulur@gmail.com', { size: 20, after: 100 }),
      para('https://www.linkedin.com/in/krishpavuluri  ·  https://krishtoautomate.github.io/my-cv/', { size: 20, after: 400 }),
      para(today, { after: 300 }),
      para(`Hiring Team — ${company}`, { bold: true, after: 100 }),
      para(`Re: ${role}`, { bold: true, after: 300 }),
      ...paragraphs,
      para('Sincerely,', { after: 100 }),
      para('Krish Pavuluri'),
    ],
  }],
});

const outPath = resolve(__dirname, '..', 'tailored', `COVER_LETTER_${output}.docx`);
const buffer = await Packer.toBuffer(doc);
writeFileSync(outPath, buffer);
console.log(`Wrote ${outPath} (${buffer.length} bytes)`);
