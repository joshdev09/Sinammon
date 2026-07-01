import { useRef, useState, useEffect } from 'react'
import { ToolsProvider, useTools } from '../context/ToolsContext'
import type { Tool } from '../types/tool.types'
import { NavLink } from 'react-router-dom'

//images
import iconBackpack from '../assets/images/d1.png'
import halftone from '../assets/images/d5.png'
import iconPlane from '../assets/images/d2.png'
import iconClips from '../assets/images/d3.png'
import iconStar from '../assets/images/d4.png'

// ── Helpers ───────────────────────────────────────────────────────────────────

function techSkillStyle(skill: Tool['techSkill']) {
  switch (skill) {
    case 'Low':      return 'bg-[#E8F8F0] text-[#0F7A52]'
    case 'Medium':   return 'bg-[#FFF4E0] text-[#A0620A]'
    case 'Advanced': return 'bg-[#FDECEA] text-[#B91C1C]'
  }
}

function offlineStyle(val: Tool['offlineCapable']) {
  switch (val) {
    case 'Yes':     return 'bg-[#E8F8F0] text-[#0F7A52]'
    case 'Partial': return 'bg-[#FFF4E0] text-[#A0620A]'
    case 'No':      return 'bg-[#FDECEA] text-[#B91C1C]'
  }
}

// ── ToolLogo ──────────────────────────────────────────────────────────────────

const ToolLogo = ({ tool, isSidebar = false }: { tool: any; isSidebar?: boolean }) => {
  const [imgError, setImgError] = useState(false)

  useEffect(() => { setImgError(false) }, [tool?.id])

  const getUrl = () => {
    if (!tool) return null
    if (tool.logo) return tool.logo
    try {
      const domain = new URL(tool.link).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    } catch { return null }
  }

  const url = getUrl()

  const WrenchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
      className={isSidebar ? 'w-5 h-5 text-[#333]' : 'w-8 h-8 text-[#333]'}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  )

  if (!url || imgError) {
    return isSidebar ? (
      <div className="w-12 h-12 bg-[#e5e5e5] rounded-xl flex-shrink-0 flex items-center justify-center">{WrenchIcon}</div>
    ) : (
      <span className="opacity-40 group-hover:scale-110 transition-transform duration-300">{WrenchIcon}</span>
    )
  }

  return (
    <img
      src={url}
      alt={`${tool?.name} logo`}
      onError={() => setImgError(true)}
      className={isSidebar
        ? 'w-12 h-12 rounded-xl flex-shrink-0 object-contain bg-white'
        : 'w-14 h-14 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300'
      }
    />
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-5 sm:px-10 lg:px-16 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 flex items-center justify-between min-h-[180px] sm:min-h-[220px] lg:min-h-[260px]">
      <img
        src={halftone} alt="" aria-hidden
        className="absolute top-0 right-0 w-full sm:w-[60%] lg:w-[48%] h-full object-cover object-right-top opacity-[0.12] sm:opacity-[0.18] lg:opacity-[0.20] pointer-events-none select-none"
      />

      {/* Headline */}
      <div className="relative z-10 flex-1 min-w-0">
        <h1 className="text-[28px] sm:text-[40px] lg:text-[56px] font-bold text-[#333333] leading-[1.1] mb-3 sm:mb-4 tracking-tight max-w-[500px]">
          Open-Source Tools Platform for Educators.
        </h1>
        <p className="text-[12px] sm:text-[13px] text-[#555] leading-relaxed max-w-[320px] sm:max-w-[440px] lg:max-w-[540px]">
          Sinammon is an open-source platform for Filipino Educators that centralizes essential 
          educational tools, including Classroom &amp; Learning Management, Content Creation &amp; 
          Interactive Lessons, Subject-Specific STEM Tools, and Regional &amp; Localized Resources 
          all in one organized, easy-to-access place.
        </p>

        <button className="mt-5">
          <NavLink 
            to="/deped-oers"
            className="py-3 px-5 rounded-full text-[#ffffff] text-sm font-semibold bg-[#FBA455] hover:bg-[#e9944a]">
              DepEd Common OERs
            </NavLink>
        </button>
      </div>

      {/* Crayon icons */}
      <div className="relative z-10 w-[240px] h-[150px] sm:w-[300px] sm:h-[180px] lg:w-[380px] lg:h-[200px] flex-shrink-0 hidden sm:block md:block">
        <img src={iconStar} alt="" aria-hidden
          className="absolute -top-[25px] sm:-top-[30px] lg:-top-[100px] -left-[200px] sm:-left-[270px] lg:-left-[360px] w-[200px] sm:w-[250px] lg:w-[420px] rotate-[-8deg] drop-shadow-sm" />
        
        <img src={iconBackpack} alt="" aria-hidden
          className="absolute -top-[30px] sm:-top-[40px] lg:-top-[50px] right-[100px] sm:right-[130px] lg:right-[170px] w-[150px] sm:w-[190px] lg:w-[270px] rotate-[7deg] drop-shadow-sm" />
        
        <img src={iconPlane} alt="" aria-hidden
          className="absolute -bottom-[25px] sm:-bottom-[30px] lg:-bottom-[80px] -left-[90px] sm:-left-[130px] lg:-left-[170px] w-[140px] sm:w-[180px] lg:w-[230px] rotate-[-25deg] drop-shadow-sm" />
        
        <img src={iconClips} alt="" aria-hidden
          className="absolute -bottom-[15px] sm:-bottom-[20px] lg:-bottom-[25px] right-[40px] sm:right-[55px] lg:right-[40px] w-[130px] sm:w-[165px] lg:w-[210px] rotate-[6deg] drop-shadow-sm" />
      </div>
    </section>
  )
}

// ── Filter Bar ────────────────────────────────────────────────────────────────

function FilterBar() {
  const { categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useTools()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 200,  behavior: 'smooth' })

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-white border-b border-[#eee]">
      <div className="flex flex-col sm:hidden gap-2.5">
        <div className="flex items-center gap-2.5 bg-[#efefef] rounded-full px-4 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search Tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[14px] text-[#333] placeholder-[#bbb] w-full"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#bbb] hover:text-[#888] transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold
                transition-colors whitespace-nowrap cursor-pointer
                ${id === activeCategory ? 'bg-[#333333] text-white' : 'bg-[#efefef] text-[#555]'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tablet + Desktop: single-row layout */}
      <div className="hidden sm:flex items-center gap-2 lg:gap-3 bg-[#efefef] rounded-2xl px-3 py-2">
        <button onClick={scrollLeft}
          className="w-7 h-7 lg:w-8 lg:h-8 rounded-xl cursor-pointer bg-white flex items-center justify-center shadow-sm flex-shrink-0 hover:bg-[#f5f5f5] transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div ref={scrollRef} className="flex gap-1.5 lg:gap-2 overflow-x-auto flex-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`
                flex-shrink-0 px-3 lg:px-4 py-1.5 rounded-full text-[11px] lg:text-[12px] font-semibold
                transition-colors whitespace-nowrap cursor-pointer
                ${id === activeCategory ? 'bg-[#333333] text-white' : 'bg-transparent text-[#555] hover:bg-white hover:text-[#222]'}
              `}
            >
              {label}
            </button>
          ))}
        </div>

        <button onClick={scrollRight}
          className="w-7 h-7 lg:w-8 lg:h-8 rounded-xl cursor-pointer bg-white flex items-center justify-center shadow-sm flex-shrink-0 hover:bg-[#f5f5f5] transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="w-px h-5 bg-[#d5d5d5] flex-shrink-0" />

        <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-1.5 w-[180px] lg:w-[280px] flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search Tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[12px] text-[#333] placeholder-[#bbb] w-full"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#bbb] hover:text-[#888] transition-colors flex-shrink-0 cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Tool Detail Sidebar ───────────────────────────────────────────────────────

function ToolDetailSidebar() {
  const { selectedTool } = useTools()

  if (!selectedTool) {
    return (
      <div className="hidden lg:block w-[260px] xl:w-[290px] flex-shrink-0">
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 flex flex-col items-center justify-center gap-2 min-h-[200px] text-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M9 12h6M12 9v6" />
          </svg>
          <p className="text-[12px] text-[#bbb] mt-1 leading-relaxed">Click any tool card<br/>to see its details</p>
        </div>
      </div>
    )
  }

  const content = (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] p-4">
      <div className="flex items-center gap-3 mb-4">
        <ToolLogo tool={selectedTool} isSidebar={true} />
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-[#1a1a1a] leading-tight">{selectedTool.name}</p>
          <p className="text-[11px] text-[#999] mt-0.5 leading-tight">{selectedTool.category}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pb-3 mb-3 border-b border-[#f0f0f0]">
        <div className="flex justify-between items-center gap-2">
          <span className="text-[11px] font-semibold text-[#444]">Offline Capable:</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${offlineStyle(selectedTool.offlineCapable)}`}>
            {selectedTool.offlineCapable}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-[11px] font-semibold text-[#444]">Tech Skill Required:</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${techSkillStyle(selectedTool.techSkill)}`}>
            {selectedTool.techSkill}
          </span>
        </div>
        <div className="flex justify-between items-start gap-2">
          <span className="text-[11px] font-semibold text-[#444] flex-shrink-0">Device Support:</span>
          <span className="text-[11px] text-[#333] text-right leading-relaxed">
            {Array.isArray(selectedTool.deviceSupport)
              ? selectedTool.deviceSupport.join(', ')
              : selectedTool.deviceSupport}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[11px] font-semibold text-[#444] mb-1">Description:</p>
        <p className="text-[11px] text-[#666] leading-relaxed">{selectedTool.description}</p>
      </div>

      <a
        href={selectedTool.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#333333] text-white text-[12px] font-semibold rounded-xl hover:bg-[#444] transition-colors"
      >
        Open Tool
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </a>
    </div>
  )

  return (
    <div className="hidden lg:block w-[260px] xl:w-[290px] flex-shrink-0">
      <div className="sticky top-4">{content}</div>
    </div>
  )
}

// ── Mobile Tool Drawer (bottom sheet) ─────────────────────────────────────────

function MobileToolDrawer() {
  const { selectedTool, setSelectedTool } = useTools()

  if (!selectedTool) return null

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setSelectedTool(null)}
      />

      {/* sheet */}
      <div className="relative bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto shadow-2xl">
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#ddd]" />
        </div>

        <div className="px-5 pb-8">
          {/* header with close */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <ToolLogo tool={selectedTool} isSidebar={true} />
              <div>
                <p className="text-[14px] font-bold text-[#1a1a1a] leading-tight">{selectedTool.name}</p>
                <p className="text-[11px] text-[#999] mt-0.5">{selectedTool.category}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedTool(null)}
              className="p-1.5 rounded-lg hover:bg-[#f5f5f5] transition-colors flex-shrink-0 mt-0.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* badges row */}
          <div className="flex gap-2 flex-wrap mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-[#444]">Offline:</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${offlineStyle(selectedTool.offlineCapable)}`}>
                {selectedTool.offlineCapable}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-[#444]">Skill:</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${techSkillStyle(selectedTool.techSkill)}`}>
                {selectedTool.techSkill}
              </span>
            </div>
          </div>

          <div className="text-[12px] text-[#555] mb-2">
            <span className="font-semibold text-[#333]">Devices: </span>
            {Array.isArray(selectedTool.deviceSupport)
              ? selectedTool.deviceSupport.join(', ')
              : selectedTool.deviceSupport}
          </div>

          <p className="text-[12px] text-[#666] leading-relaxed mb-5">{selectedTool.description}</p>

          <a
            href={selectedTool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#333333] text-white text-[13px] font-semibold rounded-xl hover:bg-[#444] transition-colors"
          >
            Open Tool
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Tool Card ─────────────────────────────────────────────────────────────────

function ToolCard({ tool }: { tool: Tool }) {
  const { selectedTool, setSelectedTool } = useTools()
  const isSelected = selectedTool?.id === tool.id

  return (
    <button
      onClick={() => setSelectedTool(isSelected ? null : tool)}
      className={`
        rounded-xl overflow-hidden cursor-pointer group relative text-left w-full
        border-2 transition-all duration-150 flex flex-col bg-white
        ${isSelected
          ? 'border-[#333333] shadow-md'
          : 'border-[#e5e5e5] hover:border-[#ccc] hover:shadow-sm hover:-translate-y-0.5'
        }
      `}
      style={{ aspectRatio: '4/3' }}
    >
      {/* logo area */}
      <div className="flex-1 bg-[#f9f9f9] flex items-center justify-center overflow-hidden">
        <ToolLogo tool={tool} isSidebar={false} />
      </div>

      {/* label strip */}
      <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 border-t border-[#f0f0f0] bg-white flex-shrink-0">
        <p className="text-[10px] sm:text-[11px] lg:text-[12px] font-bold text-[#1a1a1a] truncate leading-tight">{tool.name}</p>
        <p className="text-[9px] sm:text-[10px] text-[#888] truncate mt-0.5 hidden sm:block">{tool.category}</p>
      </div>

      {/* selected dot */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#333333] shadow-sm z-10" />
      )}
    </button>
  )
}

// ── Tools Window ──────────────────────────────────────────────────────────────

function ToolsWindow() {
  const { filteredTools, activeCategoryLabel, searchQuery } = useTools()

  const titleLabel = searchQuery
    ? `Search results for "${searchQuery}"`
    : `${activeCategoryLabel} – Showing ${filteredTools.length} Tool${filteredTools.length !== 1 ? 's' : ''}`

  return (
    <div className="flex-1 bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden flex flex-col min-h-0">
      {/* title bar */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b border-[#f0f0f0] flex-shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          <span className="text-[11px] sm:text-[13px] text-[#888] truncate">{titleLabel}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#12996C] block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C9830E] block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C83750] block" />
        </div>
      </div>

      {/* grid */}
      <div className="p-2.5 sm:p-4 overflow-y-auto flex-1">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-12 sm:py-16 text-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-[12px] sm:text-[13px] font-semibold text-[#bbb]">No tools found</p>
            <p className="text-[10px] sm:text-[11px] text-[#ccc]">Try a different keyword or category</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

function LandingPageInner() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Hero />
      <FilterBar />

      <div className="flex gap-3 lg:gap-4 px-3 sm:px-5 lg:px-8 py-3 sm:py-4 lg:py-5 bg-[#f8f7f5] min-h-[calc(100vh-280px)]">
        <ToolDetailSidebar />
        <ToolsWindow />
      </div>

      <MobileToolDrawer />
    </div>
  )
}

export default function LandingPage() {
  return (
    <ToolsProvider>
      <LandingPageInner />
    </ToolsProvider>
  )
}