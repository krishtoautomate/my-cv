// Shared visual-effect tokens and sx generators for the 21st.dev-style skin.
// Everything here is pure styling — no copy, no data.

export const ACCENT = {
  indigo: '#6366F1',
  violet: '#A855F7',
  pink: '#EC4899',
  cyan: '#22D3EE',
};

export const ACCENT_GRADIENT = `linear-gradient(120deg, ${ACCENT.indigo}, ${ACCENT.violet} 50%, ${ACCENT.pink})`;
export const ACCENT_GRADIENT_SOFT = `linear-gradient(120deg, ${ACCENT.indigo}66, ${ACCENT.violet}66 50%, ${ACCENT.pink}66)`;

const isDark = (theme) => theme.palette.mode === 'dark';

/**
 * Glassmorphism surface: translucent fill, backdrop blur, hairline border,
 * inner top highlight that catches the light.
 */
export const glassSx = (theme) => ({
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(14px) saturate(160%)',
  WebkitBackdropFilter: 'blur(14px) saturate(160%)',
  backgroundColor: isDark(theme) ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.66)',
  backgroundImage: 'none',
  border: '1px solid',
  borderColor: isDark(theme) ? 'rgba(255,255,255,0.09)' : 'rgba(23,27,38,0.08)',
  boxShadow: isDark(theme)
    ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.28)'
    : 'inset 0 1px 0 rgba(255,255,255,0.85), 0 8px 28px rgba(23,27,38,0.06)',
});

/**
 * Mouse-tracking spotlight layer (::after). Pair with `setSpotlight` on
 * onMouseMove. Fades in on hover; on touch devices it simply never shows.
 */
export const spotlightSx = (theme) => ({
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), ${
      isDark(theme) ? 'rgba(129,140,248,0.14)' : 'rgba(99,102,241,0.10)'
    }, transparent 65%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  '&:hover::after': { opacity: 1 },
});

/**
 * Masked gradient border ring (::before) — the classic 21st.dev animated
 * border. `always` keeps a faint ring visible at rest; hover brightens it.
 */
export const gradientRingSx = (theme, { always = false } = {}) => ({
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: ACCENT_GRADIENT,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: always ? (isDark(theme) ? 0.45 : 0.35) : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  '&:hover::before': { opacity: isDark(theme) ? 0.9 : 0.75 },
});

/** Writes the pointer position into CSS vars consumed by `spotlightSx`. */
export const setSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

/** Gradient text (used for the name and active nav state). */
export const gradientTextSx = {
  background: ACCENT_GRADIENT,
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

/** Tiny SVG grain, tiled. Rendered as a fixed overlay in App.js. */
export const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
