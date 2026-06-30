import React from 'react';
import Navbar from './NavBar';

// --- Small hand-drawn doodle icons, matching the sketchy style used on the Tools page ---

function DoodleBulb({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M50 14c-15 0-26 11-26 25 0 9 4 14 9 19 3 3 5 6 5 10h24c0-4 2-7 5-10 5-5 9-10 9-19 0-14-11-25-26-25Z"
        stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 78h20M42 86h16" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M50 8v6M22 22l4 4M78 22l-4 4M14 46h6M86 46h-6" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DoodleBook({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M50 26c-8-6-20-8-32-6v54c12-2 24 0 32 6" stroke="#14b8a6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 26c8-6 20-8 32-6v54c-12-2-24 0-32 6" stroke="#14b8a6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 26v54" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 34c6-1 13-1 18 2M24 46c6-1 13-1 18 2M58 36c5-3 12-3 18-2M58 48c5-3 12-3 18-2" stroke="#5eead4" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function DoodleCap({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M50 28 14 44l36 16 36-16-36-16Z" stroke="#a855f7" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M30 52v16c0 4 9 10 20 10s20-6 20-10V52" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M84 44v18" stroke="#c084fc" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function DoodlePlane({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path d="M88 14 14 50l28 8 8 28L88 14Z" stroke="#14b8a6" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M42 58 88 14" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// --- Category metadata for the research/evidence grid, derived from the actual data ---

const CATEGORY_META = {
  "Limited Access & Training": {
    dot: "bg-red-500",
    pill: "bg-red-100 text-red-700",
    quoteBorder: "border-red-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" strokeLinecap="round" />
        <path d="M12 8v5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  "Traditional Methods": {
    dot: "bg-orange-500",
    pill: "bg-orange-100 text-orange-700",
    quoteBorder: "border-orange-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" strokeLinecap="round" />
        <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Need for OERs": {
    dot: "bg-green-500",
    pill: "bg-green-100 text-green-700",
    quoteBorder: "border-green-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
        <path d="M12 6c-2-2-5-3-8-3v14c3 0 6 1 8 3 2-2 5-3 8-3V3c-3 0-6 1-8 3Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

function About() {
  const researchSources = [
    {
        id: 1,
        tag: "Limited Access & Training",
        claim: "Educators in the Philippines often have limited access to modern digital tools and learning resources...",
        title: "ICT Utilization in the Department of Education's MATATAG Curriculum: A Study of Teachers' Competency and Challenges",
        summary: "Reports challenges including inadequate infrastructure, insufficient ICT training, and low digital proficiency among teachers.",
        link: "https://ijerip.erio.org.ph/index.php/articles/article/view/278"
    },
    {
        id: 2,
        tag: "Limited Access & Training",
        claim: "Educators in the Philippines often have limited access to modern digital tools and learning resources...",
        title: "ICT Landscape and Digital Literacy Skills of Basic Education Teachers",
        summary: "Shows that many teachers lack formal ICT training and face barriers such as poor internet connectivity, limited equipment, and insufficient technical support.",
        link: "https://www.ejournals.ph/article.php?id=26455"
    },
    {
        id: 3,
        tag: "Limited Access & Training",
        claim: "Educators in the Philippines often have limited access to modern digital tools and learning resources...",
        title: "Improving Teaching and Learning in the Digital Age: Recommendations for Teachers of the Department of Education in Zamboanga City",
        summary: "Identifies inadequate technology access, poor internet, and lack of professional development as major barriers to technology integration.",
        link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4536896"
    },
    {
        id: 4,
        tag: "Traditional Methods",
        claim: "Many still rely on traditional methods despite rapid technological advancements...",
        title: "ICT in the Context of Education for Quality Outcomes-Based Teaching-Learning Model",
        summary: "Finds that limited ICT skills and insufficient training result in low classroom technology integration.",
        link: "https://ejournals.ph/article.php?id=32908"
    },
    {
        id: 5,
        tag: "Traditional Methods",
        claim: "Many still rely on traditional methods despite rapid technological advancements...",
        title: "MATATAG Curriculum Implementation: The Realities and Challenges of Grade 7 TLE Teachers",
        summary: "Discusses the practical challenges teachers face when implementing technology-integrated instruction under the MATATAG curriculum.",
        link: "https://so05.tci-thaijo.org/index.php/arnje/article/view/284951"
    },
    {
        id: 6,
        tag: "Need for OERs",
        claim: "There is a lack of a centralized platform where Filipino educators can easily discover, learn, and access open educational resources and teaching technologies.",
        title: "Awareness and Perception on the Use of Open Educational Resources Among Public Senior High School Teachers",
        summary: "States that the limited availability of learning resources in the Philippines hinders quality education and suggests Open Educational Resources as a solution.",
        link: "https://ijmaberjournal.org/index.php/ijmaber/article/view/2694"
    }
  ];

  const categoryCount = new Set(researchSources.map((s) => s.tag)).size;

  return (
    <div className="min-h-screen bg-white font-sans text-[#333333]">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-gray-100">
        <div
          className="pointer-events-none absolute -right-10 top-0 h-full w-1/2"
          style={{
            backgroundImage: "radial-gradient(#d4d4d8 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
            maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          }}
        />
        <DoodleBulb className="absolute right-16 top-16 w-16 h-16 rotate-6 hidden md:block" />
        <DoodleBook className="absolute right-44 top-44 w-14 h-14 -rotate-6 hidden lg:block" />
        <DoodleCap className="absolute right-10 bottom-10 w-16 h-16 rotate-3 hidden md:block" />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold tracking-wide mb-6">
            About Sinammon
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#333333] tracking-tight mb-5 leading-tight">
            Tools educators should have had{" "}
            <span className="relative inline-block">
              all along.
              <svg className="absolute left-0 -bottom-2 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M2 7c40-6 120-6 196 0" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Sinammon is an open-source platform that centralizes essential educational tools, including
            Classroom &amp; Learning Management, Content Creation &amp; Interactive Lessons, Subject-Specific
            STEM Tools, and Regional &amp; Localized Resources, all in one organized, easy-to-access place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">100% Open Source</span>
            <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">Free Forever</span>
            <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">Built for PH Classrooms</span>
          </div>
        </div>
      </header>

      {/* WHAT IS SINAMMON */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-3">What is Sinammon?</h2>
            <p className="leading-relaxed text-gray-600">
              A directory and toolkit, not another app to learn from scratch. We curate the platforms
              educators already need, organize them by what they actually do in a classroom, and pair
              each one with plain-language guidance so adopting new technology doesn't mean starting over.
            </p>
          </div>
        </section>

        {/* WHY WE BUILT IT */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-[#333333] mb-8">Why build Sinammon?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v4M12 17h.01M10.3 3.86 1.8 18a1.5 1.5 0 0 0 1.3 2.25h17.8a1.5 1.5 0 0 0 1.3-2.25L13.7 3.86a1.5 1.5 0 0 0-2.6 0Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-3">The problem</h3>
              <p className="leading-relaxed text-gray-600 text-sm mb-3">
                Educators in the Philippines often have limited access to modern digital tools and learning
                resources that can enhance their teaching. Many still rely on traditional methods despite
                rapid technological advancements that have transformed how education can be delivered.
              </p>
              <p className="leading-relaxed text-gray-600 text-sm">
                There is no centralized, open-source platform where educators can easily discover, learn,
                and access these teaching technologies, making it harder to adopt practices that improve
                student engagement and outcomes.
              </p>
            </div>

            <div className="bg-orange-50 p-7 rounded-2xl border border-orange-200">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>

              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-3">The solution</h3>
              <p className="leading-relaxed text-[#333333] text-sm">
                Sinammon is an open-source platform that empowers Filipino educators by providing a
                centralized hub for modern teaching tools, educational resources, and practical guides.
                It simplifies the discovery and adoption of technology in the classroom, enabling teachers
                to create more engaging, efficient, and impactful learning experiences while fostering a
                community that shares knowledge and best practices.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* EVIDENCE / RESEARCH */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#333333] mb-3">The evidence behind the problem</h2>
            <p className="text-gray-600 max-w-2xl">
              Recent studies and reports highlighting the challenges Filipino educators face with technology
              integration, and the case for a platform like Sinammon.
            </p>
          </div>
          <span className="shrink-0 px-4 py-1.5 rounded-full bg-gray-100 text-[#333333] text-sm font-semibold">
            {researchSources.length} studies · {categoryCount} key challenges
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchSources.map((source) => {
            const meta = CATEGORY_META[source.tag as keyof typeof CATEGORY_META];
            return (
              <a
                key={source.id}
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:border-orange-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${meta.dot}`}>
                    {meta.icon}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${meta.pill}`}>
                    {source.tag}
                  </span>
                </div>

                <div className={`mb-4 text-sm text-gray-500 italic border-l-2 pl-3 ${meta.quoteBorder}`}>
                  "{source.claim}"
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-3">
                  {source.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-4">
                  {source.summary}
                </p>

                <div className="mt-auto flex items-center text-sm font-medium text-orange-500 group-hover:text-orange-600">
                  Read source context
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden bg-[#333333] rounded-3xl px-8 py-14 text-center">
          <DoodlePlane className="absolute left-10 top-10 w-12 h-12 opacity-70 hidden md:block" />
          <DoodleBook className="absolute right-10 bottom-8 w-14 h-14 opacity-70 hidden md:block" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Browse the tools educators are already using
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-7">
            52+ tools, sorted by what they do and how much tech skill they take to pick up.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Explore all tools
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;