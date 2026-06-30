// ── DepEd Common OERs types ─────────────────────────────────────────────────

export type DepEdSectionId = 'k_to_12' | 'als' | 'prof_dev'

// The three real structural patterns LRMDS uses across grade levels
export type GradeStructure = 'subject_topic' | 'weekly_plan' | 'core_track'

export interface Topic {
  label: string
  count: number
  href: string
}

export interface Subject {
  label: string
  count: number
  topics: Topic[]
}

export interface CoreSubject {
  label: string
  count: number
  href: string
}

export interface Track {
  label: string
  count: number
  href: string
}

export interface GradeLevel {
  label: string
  count: number
  href: string
  structure: GradeStructure
  // subject_topic structure (Grades 1-10)
  subjects?: Subject[]
  // weekly_plan structure (Kindergarten)
  weekCount?: number
  weekHrefPrefix?: string
  // core_track structure (Grades 11-12, Senior High)
  coreSubjects?: CoreSubject[]
  tracks?: Track[]
}

export interface ALSStrand {
  label: string
  description: string
  count: number
  href: string
}

export interface DepEdSection {
  id: DepEdSectionId
  title: string
  subtitle: string
  href: string
  accent: string
  accentSoft: string
}