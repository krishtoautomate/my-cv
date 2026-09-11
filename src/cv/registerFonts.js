// Browser-side Inter registration for the in-page PDF render triggered from
// Navigation.js. The Node generator (scripts/generate-pdf.tsx) registers the
// same faces from src/cv/fonts instead, so both PDFs look identical.
//
// Returns the family name to pass to <CVDocument fontFamily=... />, falling
// back to Helvetica if registration fails so the download never breaks.
import { Font } from '@react-pdf/renderer';

let registered = false;

export const registerInter = () => {
  if (registered) return 'Inter';
  const base = `${process.env.PUBLIC_URL || ''}/fonts`;
  try {
    Font.register({
      family: 'Inter',
      fonts: [
        { src: `${base}/Inter-Regular.ttf`, fontWeight: 400 },
        { src: `${base}/Inter-Medium.ttf`, fontWeight: 500 },
        { src: `${base}/Inter-SemiBold.ttf`, fontWeight: 600 },
        { src: `${base}/Inter-Bold.ttf`, fontWeight: 700 },
        { src: `${base}/Inter-Italic.ttf`, fontWeight: 400, fontStyle: 'italic' },
      ],
    });
    // Inter has no hyphenation dictionary here; keep words intact.
    Font.registerHyphenationCallback((word) => [word]);
    registered = true;
    return 'Inter';
  } catch (err) {
    console.warn('Inter registration failed, falling back to Helvetica', err);
    return 'Helvetica';
  }
};

export default registerInter;
