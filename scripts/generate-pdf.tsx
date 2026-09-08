// Renders the CV as a PDF using @react-pdf/renderer running in Node
// (via tsx). Reads the canonical resume by default; pass --data <path>
// to render a tailored variant produced by scripts/tailor-cv.mjs.

import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import React from 'react';
import ReactPDF, { Font } from '@react-pdf/renderer';

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const repoRoot = resolve(__dirname, '..');

  const args = process.argv.slice(2);
  const argMap: Record<string, string> = {};
  for (let i = 0; i < args.length; i += 2) argMap[args[i]] = args[i + 1];

  const dataPath = argMap['--data']
    ? resolve(process.cwd(), argMap['--data'])
    : resolve(repoRoot, 'src/data/resume.mjs');
  const outputPath = argMap['--output']
    ? resolve(process.cwd(), argMap['--output'])
    : resolve(repoRoot, 'public/KRISH_PAVULURI_CV.pdf');

  // Register Inter from disk so the generated PDF matches the one the
  // website renders in-browser (see src/cv/registerFonts.js).
  const fontDir = resolve(repoRoot, 'src/cv/fonts');
  Font.register({
    family: 'Inter',
    fonts: [
      { src: resolve(fontDir, 'Inter-Regular.ttf'), fontWeight: 400 },
      { src: resolve(fontDir, 'Inter-Medium.ttf'), fontWeight: 500 },
      { src: resolve(fontDir, 'Inter-SemiBold.ttf'), fontWeight: 600 },
      { src: resolve(fontDir, 'Inter-Bold.ttf'), fontWeight: 700 },
      { src: resolve(fontDir, 'Inter-Italic.ttf'), fontWeight: 400, fontStyle: 'italic' },
    ],
  });
  Font.registerHyphenationCallback((word: string) => [word]);

  const resume: any = await import(pathToFileURL(dataPath).href);
  const { default: CVDocument } = await import(
    pathToFileURL(resolve(repoRoot, 'src/cv/CVDocument.jsx')).href
  );

  await ReactPDF.renderToFile(React.createElement(CVDocument, { resume, fontFamily: 'Inter' }), outputPath);
  console.log(`Wrote ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
