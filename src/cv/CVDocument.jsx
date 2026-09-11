import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import * as canonical from '../data/resume.mjs';

// Monochrome, rule-separated layout: uppercase letter-spaced headings,
// a centred masthead, and a scannable highlights strip. Kept to a single
// text column so ATS parsers read it in document order.
//
// Fonts are registered by the entry point, not here — scripts/generate-pdf.tsx
// registers Inter from disk, src/cv/registerFonts.js registers it from
// public/fonts in the browser. Both then pass fontFamily="Inter". Without
// registration the document falls back to Helvetica and still renders.
const INK = '#1A1A1A';
const MUTED = '#5C5C5C';
const RULE = '#C9C9C9';
const RULE_STRONG = '#8A8A8A';

const makeStyles = (ff) => {
  const bold = ff === 'Helvetica' ? 'Helvetica-Bold' : ff;
  const italic = ff === 'Helvetica' ? 'Helvetica-Oblique' : ff;
  const w = (weight) => (ff === 'Helvetica' ? {} : { fontWeight: weight });

  return StyleSheet.create({
    page: {
      paddingTop: 34,
      paddingBottom: 34,
      paddingHorizontal: 40,
      fontSize: 9,
      fontFamily: ff,
      color: INK,
      lineHeight: 1.4,
    },
    frame: {
      position: 'absolute',
      top: 16,
      left: 16,
      right: 16,
      bottom: 16,
      borderWidth: 0.75,
      borderColor: RULE,
    },

    name: {
      fontFamily: bold,
      ...w(700),
      fontSize: 21,
      letterSpacing: 2.0,
      textAlign: 'center',
      textTransform: 'uppercase',
      lineHeight: 1.15,
    },
    tagline: {
      fontSize: 9.5,
      color: MUTED,
      textAlign: 'center',
      marginTop: 6,
      letterSpacing: 0.3,
    },
    contactRow: {
      fontSize: 8.5,
      color: MUTED,
      textAlign: 'center',
      paddingVertical: 5,
    },
    link: { color: INK, textDecoration: 'none' },
    dim: { color: RULE_STRONG },

    ruleThick: { borderBottomWidth: 1, borderBottomColor: INK, marginTop: 9 },
    ruleThin: { borderBottomWidth: 0.75, borderBottomColor: RULE },
    sectionRule: { borderBottomWidth: 0.75, borderBottomColor: RULE, marginTop: 9, marginBottom: 9 },

    highlights: { flexDirection: 'row', paddingVertical: 7 },
    highlight: { flex: 1, paddingHorizontal: 5, alignItems: 'center' },
    highlightDivider: { borderLeftWidth: 0.75, borderLeftColor: RULE },
    highlightValue: {
      fontFamily: bold,
      ...w(600),
      fontSize: 9,
      textAlign: 'center',
      letterSpacing: 0.2,
    },
    highlightLabel: {
      fontSize: 6.8,
      color: MUTED,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginTop: 2,
    },

    heading: {
      fontFamily: bold,
      ...w(700),
      fontSize: 10.5,
      letterSpacing: 1.6,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    paragraph: { fontSize: 9, color: '#333333', marginBottom: 2 },

    skillRow: { flexDirection: 'row', marginBottom: 3.5 },
    skillLabel: {
      width: 104,
      fontFamily: bold,
      ...w(600),
      fontSize: 7.6,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      paddingTop: 1,
    },
    skillItems: { flex: 1, fontSize: 8.6, color: '#333333' },

    jobBlock: { marginBottom: 8 },
    jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
    jobCompany: { fontFamily: bold, ...w(600), fontSize: 9.5, letterSpacing: 0.3 },
    jobDuration: { fontSize: 8.2, color: MUTED },
    jobTitle: { fontSize: 9.5, marginTop: 1.5, color: INK },
    jobSummary: { fontFamily: italic, fontStyle: 'italic', fontSize: 8.3, color: MUTED, marginTop: 2, marginBottom: 3 },
    bulletRow: { flexDirection: 'row', marginBottom: 1.8 },
    bulletDot: { width: 8, fontSize: 8.6, color: RULE_STRONG },
    bulletText: { flex: 1, fontSize: 8.6, color: '#333333' },
    jobStack: { fontSize: 7.6, color: MUTED, marginTop: 3 },

    eduRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
    eduDegree: { fontFamily: bold, ...w(600), fontSize: 9.5 },
    eduMeta: { fontSize: 8.6, color: MUTED, marginTop: 1 },
    eduPeriod: { fontSize: 8.2, color: MUTED },
  });
};

// Older roles are progressively condensed — fewer bullets, and past
// SUMMARY_UNTIL / STACK_UNTIL the role summary and stack lines are dropped
// entirely. Keeps the CV to two pages with the strongest, most recent
// evidence on page one. Bullets arrive pre-sorted by JD relevance from
// scripts/tailor-cv.mjs, so the ones that survive the cut are the ones
// that matter for the role being applied to.
const BULLET_BUDGET = [6, 5, 5, 3, 2, 2, 2];
const LAST_BUDGET = 2;
const SUMMARY_UNTIL = 3;
const STACK_UNTIL = 4;

// A count cap alone does not hold the CV to two pages: tailoring reorders
// bullets by JD relevance, so a role can surface six long bullets where it
// previously had six short ones. Cap the rendered characters as well and
// take whichever limit bites first.
const CHAR_BUDGET = [900, 700, 700, 380, 260, 260, 260];
const LAST_CHARS = 260;

const bulletBudget = (roleIndex) => BULLET_BUDGET[roleIndex] ?? LAST_BUDGET;
const charBudget = (roleIndex) => CHAR_BUDGET[roleIndex] ?? LAST_CHARS;

const bulletsFor = (points, roleIndex) => {
  const maxCount = bulletBudget(roleIndex);
  const maxChars = charBudget(roleIndex);
  const out = [];
  let used = 0;
  for (const p of points) {
    if (out.length >= maxCount) break;
    const text = typeof p === 'string' ? p : p.text;
    // Always keep the top-scoring bullet, even if it alone blows the budget.
    if (out.length > 0 && used + text.length > maxChars) break;
    out.push(p);
    used += text.length;
  }
  return out;
};

const CVDocument = ({ resume, fontFamily = 'Helvetica' }) => {
  const personal = resume?.personal ?? canonical.personal;
  const headline = resume?.headline ?? canonical.headline;
  const highlights = resume?.highlights ?? canonical.highlights ?? [];
  const skillGroups = resume?.skillGroups ?? canonical.skillGroups ?? [];
  const experiences = resume?.experiences ?? canonical.experiences;
  const education = resume?.education ?? canonical.education;

  const styles = makeStyles(fontFamily);
  const sep = <Text style={styles.dim}>{'   |   '}</Text>;

  return (
    <Document title={`${personal.name} – CV`} author={personal.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.frame} fixed />

        <Text style={styles.name}>{personal.name}</Text>
        <Text style={styles.tagline}>{personal.tagline}</Text>

        <View style={styles.ruleThick} />
        <Text style={styles.contactRow}>
          {personal.location}
          {sep}
          {personal.phone}
          {sep}
          <Link style={styles.link} src={`mailto:${personal.email}`}>{personal.email}</Link>
          {sep}
          <Link style={styles.link} src={personal.linkedin}>linkedin.com/in/krishpavuluri</Link>
          {sep}
          <Link style={styles.link} src={personal.github}>github.com/krishtoautomate</Link>
        </Text>
        <View style={styles.ruleThin} />

        {highlights.length > 0 && (
          <>
            <View style={styles.highlights}>
              {highlights.map((h, i) => (
                <View key={h.label} style={[styles.highlight, i > 0 && styles.highlightDivider]}>
                  <Text style={styles.highlightValue}>{h.value}</Text>
                  <Text style={styles.highlightLabel}>{h.label}</Text>
                </View>
              ))}
            </View>
            <View style={styles.ruleThin} />
          </>
        )}

        <View style={styles.sectionRule} />
        <Text style={styles.heading}>Professional Summary</Text>
        <Text style={styles.paragraph}>{headline}</Text>

        <View style={styles.sectionRule} />
        <Text style={styles.heading}>Core Skills</Text>
        {skillGroups.map((g) => (
          <View key={g.label} style={styles.skillRow} wrap={false}>
            <Text style={styles.skillLabel}>{g.label}</Text>
            <Text style={styles.skillItems}>{g.items.join(' · ')}</Text>
          </View>
        ))}

        <View style={styles.sectionRule} />
        <Text style={styles.heading}>Professional Experience</Text>
        {experiences.map((exp, i) => (
          // The header group never splits, so a role header can never strand
          // alone at the foot of a page — it moves with its first bullets.
          <View key={`${exp.company}-${i}`} style={styles.jobBlock}>
            <View wrap={false}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobCompany}>{exp.company} — {exp.location}</Text>
                <Text style={styles.jobDuration}>{exp.duration}</Text>
              </View>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              {exp.summary && i < SUMMARY_UNTIL ? (
                <Text style={styles.jobSummary}>{exp.summary}</Text>
              ) : null}
            </View>
            {bulletsFor(exp.points, i).map((p, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{typeof p === 'string' ? p : p.text}</Text>
              </View>
            ))}
            {i < STACK_UNTIL ? (
              <Text style={styles.jobStack}>Stack: {exp.stack.join(' · ')}</Text>
            ) : null}
          </View>
        ))}

        <View style={styles.sectionRule} />
        <Text style={styles.heading}>Education</Text>
        <View style={styles.eduRow}>
          <View>
            <Text style={styles.eduDegree}>{education.degree}</Text>
            <Text style={styles.eduMeta}>{education.school}</Text>
          </View>
          <Text style={styles.eduPeriod}>{education.period}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
