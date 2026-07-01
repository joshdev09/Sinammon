import {
  useState,
  useMemo,
  useEffect,
  type MouseEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import {
  Search,
  PenLine,
  Microscope,
  Video,
  Mic2,
  ExternalLink,
  X,
  type LucideIcon,
} from 'lucide-react'
import type { AiTool, AiCategoryId } from '../types/aiTool.types'
import { CATEGORIES, TOOLS } from '../data/aiTools.data'

type NonAllCategoryId = Exclude<AiCategoryId, 'all'>

interface CategoryMeta {
  icon: LucideIcon
  color: string
  soft: string
  text: string
  label: string
}

const CATEGORY_META: Record<NonAllCategoryId, CategoryMeta> = {
  writing: { icon: PenLine, color: '#F59E0B', soft: '#FEF3C7', text: '#B45309', label: 'Writing' },
  research: { icon: Microscope, color: '#3B82F6', soft: '#DBEAFE', text: '#1D4ED8', label: 'Research' },
  video: { icon: Video, color: '#A855F7', soft: '#F3E8FF', text: '#7E22CE', label: 'Video Creation' },
  tts: { icon: Mic2, color: '#14B8A6', soft: '#CCFBF1', text: '#0F766E', label: 'Text to Speech' },
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function getLogoSrc(tool: AiTool): string {
  if (tool.logo) return tool.logo
  const domain = getDomain(tool.link)
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : ''
}

function ToolLogo({ tool, size = 56, animated = false }: { tool: AiTool; size?: number; animated?: boolean }) {
  const [errored, setErrored] = useState(false)
  const meta = CATEGORY_META[tool.categoryId as NonAllCategoryId]
  const Icon = meta.icon
  const src = getLogoSrc(tool)

  const hoverClass = animated ? 'group-hover:scale-110 transition-transform duration-300' : ''

  if (!src || errored) {
    return (
      <div
        style={{ background: meta.soft, width: size, height: size }}
        className="rounded-full flex items-center justify-center shrink-0"
      >
        <Icon size={Math.round(size * 0.45)} color={meta.color} className={hoverClass} />
      </div>
    )
  }

  return (
    <div
      style={{ background: '#F9FAFB', width: size, height: size, border: '1px solid #EEF0F2' }}
      className="rounded-full flex items-center justify-center shrink-0 overflow-hidden"
    >
      <img
        src={src}
        alt={`${tool.name} logo`}
        onError={() => setErrored(true)}
        style={{ width: Math.round(size * 0.6), height: Math.round(size * 0.6), objectFit: 'contain' }}
        className={hoverClass}
      />
    </div>
  )
}

function ToolCard({
  tool,
  isSelected,
  onSelect,
}: {
  tool: AiTool
  isSelected: boolean
  onSelect: () => void
}) {
  const meta = CATEGORY_META[tool.categoryId as NonAllCategoryId]
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && onSelect()}
      style={{ background: '#FAFAFA' }}
      className={`
        relative group rounded-2xl p-4 text-left flex flex-col gap-3 cursor-pointer
        border-2 transition-all duration-150
        ${isSelected
          ? 'border-[#333333] shadow-md'
          : 'border-[#E5E7EB] hover:border-[#CCCCCC] hover:shadow-sm hover:-translate-y-0.5'
        }
      `}
    >
      <ToolLogo tool={tool} size={56} animated />
      <div>
        <p style={{ color: '#111827' }} className="font-semibold text-sm mb-0.5">
          {tool.name}
        </p>
        <p style={{ color: meta.text }} className="text-xs font-medium">
          {meta.label}
        </p>
      </div>

      {isSelected && (
        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#333333] shadow-sm z-10" />
      )}
    </div>
  )
}

function ToolDetail({ tool, onClose }: { tool: AiTool; onClose: () => void }) {
  const meta = CATEGORY_META[tool.categoryId as NonAllCategoryId]
  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <ToolLogo tool={tool} size={56} />
        <button onClick={onClose} aria-label="Close details" className="p-1.5 rounded-full hover:bg-gray-100">
          <X size={16} color="#9CA3AF" />
        </button>
      </div>

      <p style={{ color: '#111827' }} className="font-semibold text-base mb-1">
        {tool.name}
      </p>
      <span
        style={{ background: meta.soft, color: meta.text }}
        className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4"
      >
        {meta.label}
      </span>

      <div className="mb-4">
        <p style={{ color: '#9CA3AF' }} className="text-xs font-medium uppercase tracking-wide mb-1">
          Best for
        </p>
        <p style={{ color: '#374151' }} className="text-sm leading-relaxed">
          {tool.bestFor}
        </p>
      </div>

      <div className="mb-5">
        <p style={{ color: '#9CA3AF' }} className="text-xs font-medium uppercase tracking-wide mb-1">
          Pricing
        </p>
        <p style={{ color: '#374151' }} className="text-sm">
          {tool.pricing}
        </p>
      </div>

      <a
        href={tool.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: '#333333', color: '#fff' }}
        className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-full transition-opacity hover:opacity-90"
      >
        Open Tool
        <ExternalLink size={14} />
      </a>
    </div>
  )
}

// Mobile only: detail view as a bottom sheet over a blurred backdrop, instead
// of the sidebar getting squeezed above the grid.
function MobileDetailSheet({ tool, onClose }: { tool: AiTool; onClose: () => void }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const closeWithAnimation = () => {
    setShow(false)
    setTimeout(onClose, 200)
  }

  const handleBackdropClick = (e: MouseEvent) => {
    e.stopPropagation()
    closeWithAnimation()
  }

  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div
        onClick={handleBackdropClick}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 pb-8 max-h-[85vh] overflow-y-auto transition-transform duration-200 ease-out ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full" style={{ background: '#E5E7EB' }} />
        <ToolDetail tool={tool} onClose={closeWithAnimation} />
      </div>
    </div>
  )
}

function AiTools() {
  const [activeCategory, setActiveCategory] = useState<AiCategoryId>('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TOOLS.filter((t) => {
      const matchesCategory = activeCategory === 'all' || t.categoryId === activeCategory
      const matchesQuery =
        q === '' || t.name.toLowerCase().includes(q) || t.bestFor.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const selectedTool = TOOLS.find((t) => t.id === selectedId) || null
  const activeCategoryLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label ?? 'All Tools'

  const selectCategory = (id: AiCategoryId) => {
    setActiveCategory(id)
    setSelectedId(null)
  }

  return (
    <div style={{ background: '#F0F1F3' }} className="min-h-screen w-full p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top nav: search sits above the category pills on mobile, and to
            the right of them on desktop. */}
        <div
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
          className="rounded-2xl p-3 mb-4 flex flex-col md:flex-row md:items-center gap-2"
        >
          <div
            style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
            className="order-1 md:order-2 flex items-center gap-2 rounded-full px-3.5 py-2 w-full md:flex-1"
          >
            <Search size={15} color="#9CA3AF" />
            <input
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Search Tools..."
              style={{ color: '#111827' }}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          <div className="order-2 md:order-1 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(cat.id)}
                  style={isActive ? { background: '#333333', color: '#fff' } : { color: '#4B5563' }}
                  className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Desktop sidebar only — hidden on mobile, where details show as
              a bottom sheet instead. */}
          <div
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
            className="hidden md:block rounded-2xl w-72 shrink-0 p-5 h-fit md:sticky md:top-4"
          >
            {selectedTool ? (
              <ToolDetail tool={selectedTool} onClose={() => setSelectedId(null)} />
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div
                  style={{ border: '1.5px dashed #D1D5DB' }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                >
                  <Search size={16} color="#D1D5DB" />
                </div>
                <p style={{ color: '#9CA3AF' }} className="text-sm leading-relaxed">
                  Click any tool card
                  <br />
                  to see its details
                </p>
              </div>
            )}
          </div>

          {/* Main content */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }} className="rounded-2xl flex-1 p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}>
                <span>
                  {activeCategoryLabel} — Showing {filtered.length} Tool{filtered.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ background: '#12996C' }} className="w-3 h-3 rounded-full" />
                <span style={{ background: '#C9830E' }} className="w-3 h-3 rounded-full" />
                <span style={{ background: '#C83750' }} className="w-3 h-3 rounded-full" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-16 text-center text-sm" style={{ color: '#9CA3AF' }}>
                No tools match "{query}".
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isSelected={tool.id === selectedId}
                    onSelect={() => setSelectedId(tool.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTool && <MobileDetailSheet tool={selectedTool} onClose={() => setSelectedId(null)} />}
    </div>
  )
}

export default AiTools