// ── DepEd Common OERs types ─────────────────────────────────────────────────

export type DepEdSectionId = 'k_to_12' | 'als' | 'prof_dev'

export interface GradeLevel {
  label: string
  count: number
  href: string
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
  accent: string      // hex used for the icon chip + active tab
  accentSoft: string  // light tint for backgrounds
}
