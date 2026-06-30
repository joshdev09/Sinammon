import React, { useState } from 'react'
import { DEPED_SECTIONS, GRADE_LEVELS, ALS_STRANDS, PROF_DEV_INFO } from '../data/deped.data'
import type { DepEdSectionId, GradeLevel, Subject } from '../types/deped.types'

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

// ── Window chrome wrapper ──────────────────────────────────────────────────────

function SectionWindow({
  children,
  label,
  onBack,
}: {
  children: React.ReactNode
  label: string
  onBack?: () => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#f0f0f0] flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="text-[#888] hover:text-[#333] transition-colors flex-shrink-0 -ml-1 p-1 rounded-lg hover:bg-[#f5f5f5]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" />
              </svg>
            </button>
          )}
          <span className="text-[12px] sm:text-[13px] text-[#888] truncate">{label}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#12996C] block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C9830E] block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C83750] block" />
        </div>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  )
}

// ── K to 12 grade grid (top level) ─────────────────────────────────────────────

function KTo12GradeGrid({ onSelectGrade }: { onSelectGrade: (grade: GradeLevel) => void }) {
  const section = DEPED_SECTIONS.find((s) => s.id === 'k_to_12')!

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {GRADE_LEVELS.map((grade) => (
        <button
          key={grade.label}
          onClick={() => onSelectGrade(grade)}
          className="group bg-white rounded-xl border border-[#e5e5e5] p-4 flex flex-col gap-2.5 hover:border-[#1C9A6C] hover:shadow-sm transition-all text-left cursor-pointer"
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
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>

          <div>
            <p className="text-[13px] font-bold text-[#1a1a1a] leading-tight">{grade.label}</p>
            <p className="text-[11px] text-[#999] mt-1">{formatCount(grade.count)} resources</p>
          </div>
        </button>
      ))}
    </div>
  )
}

function SubjectAccordionRow({
  subject,
  isOpen,
  onToggle,
}: {
  subject: Subject
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-[#ececec] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#f7f7f5] hover:bg-[#f0f0ee] transition-colors cursor-pointer text-left"
      >
        <span className="text-[13px] font-semibold text-[#2563EB]">{subject.label}</span>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-[11px] font-bold text-white bg-[#333333] px-2 py-0.5 rounded-full min-w-[28px] text-center">
            {formatCount(subject.count)}
          </span>
          <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="p-3 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {subject.topics.map((topic) => (
              <a
                key={topic.href}
                href={topic.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#FAECE7] hover:bg-[#F5D9CE] transition-colors"
              >
                <span className="text-[12px] text-[#5A2E1A] leading-snug">{topic.label}</span>
                <span className="text-[10px] font-bold text-white bg-[#333333] px-1.5 py-0.5 rounded-full flex-shrink-0 min-w-[20px] text-center">
                  {formatCount(topic.count)}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Subject-Topic detail view (Grades 1-10) ─────────────────────────────────────

function SubjectTopicDetail({ grade }: { grade: GradeLevel }) {
  const [openSubject, setOpenSubject] = useState<string | null>(grade.subjects?.[0]?.label ?? null)

  return (
    <div className="flex flex-col gap-2">
      {grade.subjects?.map((subject) => (
        <SubjectAccordionRow
          key={subject.label}
          subject={subject}
          isOpen={openSubject === subject.label}
          onToggle={() => setOpenSubject(openSubject === subject.label ? null : subject.label)}
        />
      ))}
    </div>
  )
}

// ── Weekly plan detail view (Kindergarten) ──────────────────────────────────────

function WeeklyPlanDetail({ grade }: { grade: GradeLevel }) {
  const quarters = [
    { label: 'Quarter 1', start: 1 },
    { label: 'Quarter 2', start: 11 },
    { label: 'Quarter 3', start: 21 },
    { label: 'Quarter 4', start: 31 },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {quarters.map((q) => (
        <div key={q.label} className="border border-[#ececec] rounded-lg overflow-hidden">
          <div className="px-3 py-2 bg-[#f7f7f5] border-b border-[#ececec]">
            <span className="text-[12px] font-bold text-[#1a1a1a]">{q.label}</span>
          </div>
          <div className="p-2 flex flex-col gap-1">
            {Array.from({ length: 10 }, (_, i) => q.start + i).map((week) => (
              <a
                key={week}
                href={`${grade.weekHrefPrefix}${week}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[#2563EB] hover:bg-[#EAF1FE] px-2 py-1.5 rounded-md transition-colors"
              >
                Week {week}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Core + Track detail view (Senior High, Grades 11-12) ────────────────────────

const TRACK_ICONS: Record<string, React.ReactElement> = {
  'Academic Track': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  'Arts and Design Track': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2Z" />
    </svg>
  ),
  'Sports Track': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 4.24 4.24M14.86 14.86l4.24 4.24M14.86 9.14l4.24-4.24M9.14 14.86l-4.24 4.24" />
    </svg>
  ),
  'TVL Track': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </svg>
  ),
  'Unique Track': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
    </svg>
  ),
}

function CoreTrackDetail({ grade }: { grade: GradeLevel }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[12px] font-bold text-[#444] mb-2.5 uppercase tracking-wide">
          Core Subjects — {grade.coreSubjects?.length} subjects
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {grade.coreSubjects?.map((subj) => (
            <a
              key={subj.href}
              href={subj.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg bg-[#f7f7f5] hover:bg-[#eeeeec] transition-colors"
            >
              <span className="text-[12px] text-[#2563EB] leading-snug">{subj.label}</span>
              <span className="text-[10px] font-bold text-white bg-[#333333] px-1.5 py-0.5 rounded-full flex-shrink-0 min-w-[20px] text-center">
                {formatCount(subj.count)}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[12px] font-bold text-[#444] mb-2.5 uppercase tracking-wide">Tracks</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {grade.tracks?.map((track) => (
            <a
              key={track.href}
              href={track.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center gap-2 px-3 py-4 rounded-xl border border-[#e5e5e5] hover:border-[#C9830E] hover:shadow-sm transition-all"
            >
              <span className="text-[#C9830E]">{TRACK_ICONS[track.label]}</span>
              <span className="text-[11px] font-semibold text-[#1a1a1a] leading-tight">{track.label}</span>
              <span className="text-[10px] text-[#999]">{formatCount(track.count)} resources</span>
            </a>
          ))}
        </div>
      </div>
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

// ── Root page ──────────────────────────────────────────────────────────────────

export default function DepEdOERsPage() {
  const [activeSection, setActiveSection] = useState<DepEdSectionId>('k_to_12')
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null)
  const section = DEPED_SECTIONS.find((s) => s.id === activeSection)!

  function handleChangeSection(id: DepEdSectionId) {
    setActiveSection(id)
    setSelectedGrade(null)
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* page header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold text-[#999] uppercase tracking-wide">DepEd Common OERs</span>
          </div>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-[#1a1a1a] leading-tight mb-2">
            Official Learning Resources
          </h1>
          <p className="text-[13px] text-[#666] leading-relaxed max-w-[560px] mb-2">
            Quick access to the Department of Education's Learning Resource Portal.
            Every link below opens the resource directly on the official DepEd site
            we don't host, mirror, or redistribute any files here.
          </p>

          <p className="text-[13px] text-[#666] leading-relaxed max-w-[700px]">
            <span className="font-semibold">Note:</span> To download learning resources from the official DepEd Learning Resource Portal (LRMDS), you must first create an account and log in.<br />

            <span className="font-semibold ">Who can register?</span><br />
            <ul className="list-disc pl-5 my-2">
              <li>DepEd personnel are encouraged to register using their official DepEd email address.</li>
              <li>Non-DepEd users, including students, researchers, and private school teachers, may also register using a personal email address.</li>
            </ul>

            Resource Accessibility
            Most learning resources are available after registration. However, some materials such as teacher guides, assessment tools, and other restricted resources may only be accessible to authenticated DepEd personnel or users with the appropriate permissions.
          </p>
        </div>

        {/* section tabs */}
        <div className="mb-4">
          <SectionTabs active={activeSection} onChange={handleChangeSection} />
        </div>

        {/* K to 12 — grade grid or drill-down */}
        {activeSection === 'k_to_12' && !selectedGrade && (
          <SectionWindow label={`${section.title} — 13 grade levels`}>
            <KTo12GradeGrid onSelectGrade={setSelectedGrade} />
          </SectionWindow>
        )}

        {activeSection === 'k_to_12' && selectedGrade && (
          <SectionWindow
            label={`${selectedGrade.label} — ${formatCount(selectedGrade.count)} resources`}
            onBack={() => setSelectedGrade(null)}
          >
            {selectedGrade.structure === 'subject_topic' && <SubjectTopicDetail grade={selectedGrade} />}
            {selectedGrade.structure === 'weekly_plan' && <WeeklyPlanDetail grade={selectedGrade} />}
            {selectedGrade.structure === 'core_track' && <CoreTrackDetail grade={selectedGrade} />}
          </SectionWindow>
        )}

        {/* ALS */}
        {activeSection === 'als' && (
          <SectionWindow label={`${section.title} — 3 categories`}>
            <ALSGrid />
          </SectionWindow>
        )}

        {/* Professional Development */}
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