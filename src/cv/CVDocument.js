import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { personal, summary, skillNames, experiences, education } from '../data/resume';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1a202c',
    lineHeight: 1.45,
  },
  name: { fontSize: 22, fontWeight: 700, color: '#1565C0', textAlign: 'center' },
  tagline: { fontSize: 11, color: '#566075', textAlign: 'center', marginTop: 4, marginBottom: 6 },
  contactRow: {
    fontSize: 9,
    color: '#566075',
    textAlign: 'center',
    marginBottom: 14,
  },
  link: { color: '#1565C0', textDecoration: 'none' },
  separator: { color: '#9aa3b1' },
  sectionHeading: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1565C0',
    borderBottomWidth: 1,
    borderBottomColor: '#1565C0',
    paddingBottom: 2,
    marginTop: 12,
    marginBottom: 6,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  paragraph: { marginBottom: 6, textAlign: 'justify' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  skill: {
    fontSize: 9,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#eef3fb',
    color: '#1565C0',
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  jobBlock: { marginBottom: 10 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  jobTitle: { fontSize: 11, fontWeight: 700 },
  jobDuration: { fontSize: 9, color: '#566075' },
  jobMeta: { fontSize: 9, color: '#566075', marginTop: 1, marginBottom: 3 },
  jobSummary: { fontSize: 9.5, color: '#3a4252', fontStyle: 'italic', marginBottom: 4 },
  bulletRow: { flexDirection: 'row', marginBottom: 2 },
  bulletDot: { width: 10, fontSize: 10, color: '#1565C0' },
  bulletText: { flex: 1, fontSize: 9.5 },
  jobStack: { fontSize: 8.5, color: '#566075', marginTop: 4 },
  eduRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  eduDegree: { fontSize: 11, fontWeight: 700 },
  eduMeta: { fontSize: 9.5, color: '#566075' },
  eduPeriod: { fontSize: 9, color: '#566075' },
});

const CVDocument = () => (
  <Document title={`${personal.name} – CV`} author={personal.name}>
    <Page size="A4" style={styles.page}>
      <Text style={styles.name}>{personal.name}</Text>
      <Text style={styles.tagline}>{personal.tagline}</Text>
      <Text style={styles.contactRow}>
        {personal.location}
        <Text style={styles.separator}>{'  |  '}</Text>
        {personal.phone}
        <Text style={styles.separator}>{'  |  '}</Text>
        <Link style={styles.link} src={`mailto:${personal.email}`}>{personal.email}</Link>
        <Text style={styles.separator}>{'  |  '}</Text>
        <Link style={styles.link} src={personal.linkedin}>LinkedIn</Link>
        <Text style={styles.separator}>{'  |  '}</Text>
        <Link style={styles.link} src={personal.github}>GitHub</Link>
      </Text>

      <Text style={styles.sectionHeading}>Professional Summary</Text>
      {summary.map((p, i) => (
        <Text key={i} style={styles.paragraph}>{p}</Text>
      ))}

      <Text style={styles.sectionHeading}>Core Skills</Text>
      <View style={styles.skillsRow}>
        {skillNames.map((s) => (
          <Text key={s} style={styles.skill}>{s}</Text>
        ))}
      </View>

      <Text style={styles.sectionHeading}>Professional Experience</Text>
      {experiences.map((exp, i) => (
        <View key={i} style={styles.jobBlock} wrap={false}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>{exp.title}</Text>
            <Text style={styles.jobDuration}>{exp.duration}</Text>
          </View>
          <Text style={styles.jobMeta}>{exp.company} · {exp.location}</Text>
          <Text style={styles.jobSummary}>{exp.summary}</Text>
          {exp.points.map((p, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{p}</Text>
            </View>
          ))}
          <Text style={styles.jobStack}>Stack: {exp.stack.join(' · ')}</Text>
        </View>
      ))}

      <Text style={styles.sectionHeading}>Education</Text>
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

export default CVDocument;
