import { useState } from 'react'
import { DEPED_SECTIONS, GRADE_LEVELS, ALS_STRANDS, PROF_DEV_INFO } from '../data/deped.data'
import type { DepEdSectionId } from '../types/deped.types'
import NavBar from './NavBar'

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatCount(n: number) {
  return n.toLocaleString('en-US')
}

// ── Section Tabs ──────────────────────────────────────────────────────────────

function SectionTabs({
  active,
  onChange,
}: {
  active: DepEdSectionId
  onChange: (id: DepEdSectionId) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      {DEPED_SECTIONS.map((section) => {
        const isActive = section.id === active
        return (
          <button
            key={section.id}
            onClick={() => onChange(section.id)}
            className={`
              flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold
              transition-colors cursor-pointer whitespace-nowrap border
              ${isActive
                ? 'bg-[#333333] text-white border-[#333333]'
                : 'bg-white text-[#555] border-[#e5e5e5] hover:border-[#ccc]'
              }
            `}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: isActive ? '#fff' : section.accent }}
            />
            {section.title}
          </button>
        )
      })}
    </div>
  )
}

// ── K to 12 grid ──────────────────────────────────────────────────────────────

function KTo12Grid() {
  const section = DEPED_SECTIONS.find((s) => s.id === 'k_to_12')!

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {GRADE_LEVELS.map((grade) => (
        <a
          key={grade.label}
          href={grade.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-xl border border-[#e5e5e5] p-4 flex flex-col gap-2.5 hover:border-[#1C9A6C] hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: section.accentSoft }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={section.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="opacity-0 group-hover:opacity-100 transition-opacity">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>

          <div>
            <p className="text-[13px] font-bold text-[#1a1a1a] leading-tight">{grade.label}</p>
            <p className="text-[11px] text-[#999] mt-1">{formatCount(grade.count)} resources</p>
          </div>
        </a>
      ))}
    </div>
  )
}

// ── ALS strands ───────────────────────────────────────────────────────────────

function ALSGrid() {
  const section = DEPED_SECTIONS.find((s) => s.id === 'als')!

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
      {ALS_STRANDS.map((strand) => (
        <a
          key={strand.label}
          href={strand.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-xl border border-[#e5e5e5] p-4 flex flex-col gap-2.5 hover:border-[#2563EB] hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: section.accentSoft }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={section.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
              </svg>
            </div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="opacity-0 group-hover:opacity-100 transition-opacity">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>

          <div>
            <p className="text-[13px] font-bold text-[#1a1a1a] leading-tight">{strand.label}</p>
            <p className="text-[11px] text-[#999] mt-1 leading-relaxed">{strand.description}</p>
            {strand.count > 0 && (
              <p className="text-[11px] font-semibold mt-2" style={{ color: section.accent }}>
                {formatCount(strand.count)} resources
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}

// ── Professional Development panel ────────────────────────────────────────────

function ProfDevPanel() {
  const section = DEPED_SECTIONS.find((s) => s.id === 'prof_dev')!

  return (
    <div className="bg-white rounded-xl border border-[#e5e5e5] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: section.accentSoft }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={section.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 14l9-5-9-5-9 5 9 5Z" />
              <path d="M12 14l6.16-3.42A12.95 12.95 0 0 1 19 16.5c0 1.5-3.13 4-7 4s-7-2.5-7-4c0-1.78.37-3.47 1.04-5.06L12 14Z" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#1a1a1a]">Professional Development</p>
            <p className="text-[12px] text-[#999] mt-0.5">{formatCount(PROF_DEV_INFO.totalResources)} resources for teacher training</p>
          </div>
        </div>

        <a
          href={PROF_DEV_INFO.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#333333] text-white text-[12px] font-semibold rounded-xl hover:bg-[#444] transition-colors"
        >
          Browse all
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </div>

      <p className="text-[11px] font-semibold text-[#444] mb-2.5">Resource domains:</p>
      <div className="flex flex-wrap gap-2">
        {PROF_DEV_INFO.domains.map((domain) => (
          <span
            key={domain}
            className="text-[11px] font-medium text-[#555] bg-[#f5f5f5] px-3 py-1.5 rounded-lg"
          >
            {domain}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Window chrome wrapper (matches existing tool window aesthetic) ────────────

function SectionWindow({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#f0f0f0] flex-shrink-0">
        <span className="text-[12px] sm:text-[13px] text-[#888]">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#12996C] block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C9830E] block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C83750] block" />
        </div>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  )
}

// ── Root page ──────────────────────────────────────────────────────────────────

export default function DepEdOERsPage() {
  const [activeSection, setActiveSection] = useState<DepEdSectionId>('k_to_12')
  const section = DEPED_SECTIONS.find((s) => s.id === activeSection)!

  return (
    <div className="min-h-screen bg-[#f8f7f5]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* page header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold text-[#999] uppercase tracking-wide">DepEd Common OERs</span>
          </div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-[#1a1a1a] leading-tight mb-2">
            Official Learning Resources
          </h1>
          <p className="text-[13px] text-[#666] leading-relaxed max-w-[560px]">
            Quick access to the Department of Education's Learning Resource Portal.
            Every link below opens the resource directly on the official DepEd site
            we don't host, mirror, or redistribute any files here.
          </p>
        </div>

        {/* section tabs */}
        <div className="mb-4">
          <SectionTabs active={activeSection} onChange={setActiveSection} />
        </div>

        {/* active section content */}
        {activeSection === 'k_to_12' && (
          <SectionWindow label={`${section.title} — 13 grade levels`}>
            <KTo12Grid />
          </SectionWindow>
        )}

        {activeSection === 'als' && (
          <SectionWindow label={`${section.title} — 3 categories`}>
            <ALSGrid />
          </SectionWindow>
        )}

        {activeSection === 'prof_dev' && (
          <ProfDevPanel />
        )}

        {/* footer note */}
        <div className="mt-5 flex items-start gap-2.5 bg-white border border-[#e5e5e5] rounded-xl p-3.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <p className="text-[11px] text-[#888] leading-relaxed">
            All resources belong to the Department of Education, Republic of the Philippines.
            Sinammon links to{' '}
            <a href="https://lrmds.deped.gov.ph" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#555] hover:underline">
              lrmds.deped.gov.ph
            </a>{' '}
            and does not store or distribute any downloadable files.
          </p>
        </div>

      </div>
    </div>
  )
}