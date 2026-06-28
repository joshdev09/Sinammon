import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react'
import { TOOLS, CATEGORIES } from '../data/tools.data'
import type { Tool, CategoryId, CategoryOption } from '../types/tool.types'

// ── Shape ────────────────────────────────────────────────────────────────────

interface ToolsContextValue {
  /** All category options (for the filter bar) */
  categories: CategoryOption[]
  /** Currently active category tab */
  activeCategory: CategoryId
  setActiveCategory: (id: CategoryId) => void
  /** Current search query */
  searchQuery: string
  setSearchQuery: (q: string) => void
  /** Tools after filtering + searching */
  filteredTools: Tool[]
  /** The tool shown in the left sidebar detail card */
  selectedTool: Tool | null
  setSelectedTool: (tool: Tool | null) => void
  /** Display label for the window title bar */
  activeCategoryLabel: string
}

// ── Context ───────────────────────────────────────────────────────────────────

const ToolsContext = createContext<ToolsContextValue | null>(null)

// ── Provider ─────────────────────────────────────────────────────────────────

export function ToolsProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTool, setSelectedTool] = useState<Tool | null>(TOOLS[0])

  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return TOOLS.filter((tool) => {
      const matchesCategory =
        activeCategory === 'all' || tool.categoryId === activeCategory
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.deviceSupport.some((d) => d.toLowerCase().includes(q))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label ?? 'All Tools'

  const value: ToolsContextValue = {
    categories: CATEGORIES,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredTools,
    selectedTool,
    setSelectedTool,
    activeCategoryLabel,
  }

  return <ToolsContext.Provider value={value}>{children}</ToolsContext.Provider>
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useTools(): ToolsContextValue {
  const ctx = useContext(ToolsContext)
  if (!ctx) throw new Error('useTools must be used inside <ToolsProvider>')
  return ctx
}
