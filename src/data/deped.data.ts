import type { DepEdSection, GradeLevel, ALSStrand } from '../types/deped.types'

// ── Top-level resource sections (mirrors the official LRMDS "Resources" menu) ──

export const DEPED_SECTIONS: DepEdSection[] = [
  {
    id: 'k_to_12',
    title: 'K to 12 Resources',
    subtitle: 'Browse by grade level, Kindergarten to Grade 12',
    href: 'https://lrmds.deped.gov.ph/k_to_12',
    accent: '#1C9A6C',
    accentSoft: '#E8F8F0',
  },
  {
    id: 'als',
    title: 'Alternative Learning System',
    subtitle: 'Basic literacy, elementary, and secondary ALS materials',
    href: 'https://lrmds.deped.gov.ph/als/0',
    accent: '#2563EB',
    accentSoft: '#EAF1FE',
  },
  {
    id: 'prof_dev',
    title: 'Professional Development',
    subtitle: '323 resources to support teacher training and growth',
    href: 'https://lrmds.deped.gov.ph/prof_dev',
    accent: '#C9830E',
    accentSoft: '#FFF4E0',
  },
]

// ── K to 12 grade levels — actual LRMDS counts + deep links ───────────────────

export const GRADE_LEVELS: GradeLevel[] = [
  { label: 'Kindergarten', count: 1143, href: 'https://lrmds.deped.gov.ph/kinder' },
  { label: 'Grade 1',      count: 3057, href: 'https://lrmds.deped.gov.ph/grade/1' },
  { label: 'Grade 2',      count: 2272, href: 'https://lrmds.deped.gov.ph/grade/2' },
  { label: 'Grade 3',      count: 2794, href: 'https://lrmds.deped.gov.ph/grade/3' },
  { label: 'Grade 4',      count: 2035, href: 'https://lrmds.deped.gov.ph/grade/4' },
  { label: 'Grade 5',      count: 2083, href: 'https://lrmds.deped.gov.ph/grade/5' },
  { label: 'Grade 6',      count: 2537, href: 'https://lrmds.deped.gov.ph/grade/6' },
  { label: 'Grade 7',      count: 2053, href: 'https://lrmds.deped.gov.ph/grade/7' },
  { label: 'Grade 8',      count: 1339, href: 'https://lrmds.deped.gov.ph/grade/8' },
  { label: 'Grade 9',      count: 1166, href: 'https://lrmds.deped.gov.ph/grade/9' },
  { label: 'Grade 10',     count: 1009, href: 'https://lrmds.deped.gov.ph/grade/10' },
  { label: 'Grade 11',     count: 480,  href: 'https://lrmds.deped.gov.ph/grade/11' },
  { label: 'Grade 12',     count: 215,  href: 'https://lrmds.deped.gov.ph/grade/12' },
]

// ── Alternative Learning System strands ───────────────────────────────────────

export const ALS_STRANDS: ALSStrand[] = [
  {
    label: 'Basic Literacy',
    description: 'Foundational reading, writing, and numeracy materials',
    count: 155,
    href: 'https://lrmds.deped.gov.ph/als',
  },
  {
    label: 'Elementary',
    description: 'ALS resources aligned to elementary-level competencies',
    count: 0,
    href: 'https://lrmds.deped.gov.ph/als/15',
  },
  {
    label: 'Secondary',
    description: 'ALS resources aligned to secondary-level competencies',
    count: 0,
    href: 'https://lrmds.deped.gov.ph/als/16',
  },
]

// ── Quick links shown for Professional Development ───────────────────────────

export const PROF_DEV_INFO = {
  totalResources: 323,
  href: 'https://lrmds.deped.gov.ph/prof_dev',
  domains: [
    'Content Knowledge and Pedagogy',
    'Learning Environment',
    'Assessment and Reporting',
    'Personal Growth and Professional Development',
  ],
}
