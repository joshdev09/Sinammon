export type CategoryId =
  | 'all'
  | 'classroom'
  | 'content'
  | 'stem'
  | 'regional'
  | 'libraries'

export interface Tool {
  id: number
  name: string
  category: string
  categoryId: CategoryId
  offlineCapable: 'Yes' | 'No' | 'Partial'
  techSkill: 'Low' | 'Medium' | 'Advanced'
  deviceSupport: string[]
  description: string
  link: string
  logo: string
}

export interface CategoryOption {
  id: CategoryId
  label: string
}
