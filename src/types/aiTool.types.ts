export type AiCategoryId = 'all' | 'writing' | 'research' | 'video' | 'tts'

export interface AiTool {
  id: number
  name: string
  category: string
  categoryId: AiCategoryId
  bestFor: string
  pricing: string
  link: string
  /** Optional local asset import (e.g. ../assets/ai-logos/x.png). Leave '' to fall back to a fetched favicon. */
  logo: string
}

export interface AiCategoryOption {
  id: AiCategoryId
  label: string
}
