import { useState } from 'react'
import { NavLink } from 'react-router-dom'

// Make sure this path matches your folder structure relative to the Navbar file
import logo from '../assets/images/logo.png'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Array of links to keep the mobile menu DRY and easy to route
  const navLinks = [
    { name: 'Tools', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'DepEd Commons OERs', path: '/deped-oers' },
    { name: 'Ai Tools', path: '/ai-tools' }
  ];

  return (
    <nav className="flex flex-row px-4 sm:px-6 py-3 sm:py-4 bg-[#333333] items-center justify-between relative z-50">
      {/* Logo */}
      <div className="flex flex-row items-center gap-2 text-white">
        <NavLink to="/">
          <img src={logo} width="36" height="36" className="rounded-xl sm:w-10 sm:h-10" alt="Sinammon logo" />
        </NavLink>
        <div className="flex flex-col -space-y-1 tracking-wide">
          <h1 className="font-semibold text-sm sm:text-base">Sinammon</h1>
          <p className="text-[10px] sm:text-xs font-light opacity-70">Tools for Educators</p>
        </div>
      </div>

      {/* Desktop nav links */}
      <ul className="hidden lg:flex flex-row gap-8 font-medium text-sm list-none items-center">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink 
              to={link.path} 
              className={({ isActive }) => 
                `pb-1 border-b-2 transition-all duration-200 ${
                  isActive 
                    ? "text-[#C7916E] border-[#C7916E]" 
                    : "text-white border-transparent cursor-pointer hover:opacity-70 hover:border-white/30" 
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden sm:flex flex-row gap-2.5">
        <NavLink
          to="/feedback"
          className="px-3 py-2 sm:p-3 cursor-pointer bg-[#FBA455] text-white font-semibold rounded-xl text-xs sm:text-sm hover:bg-[#e9944a] transition-colors flex flex-row items-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          Feedback Report
        </NavLink>
      </div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden p-2 text-white hover:opacity-70 transition-opacity cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#2a2a2a] border-t border-[#444] z-50 sm:hidden">
          <ul className="flex flex-col text-white font-medium text-sm list-none py-2">
            {navLinks.map((item) => (
              <li key={item.name} className="border-b border-[#3a3a3a] last:border-0">
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-5 py-3 cursor-pointer transition-colors ${
                      isActive 
                        ? "bg-[#3a3a3a] text-[#C7916E] font-bold" 
                        : "hover:bg-[#3a3a3a]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 px-4 py-3 border-t border-[#444]">
            <NavLink
              to="/feedback"
              onClick={() => setMenuOpen(false)}
              className="flex-1 py-2.5 bg-[#FBA455] text-white font-semibold rounded-xl text-sm flex flex-row items-center justify-center gap-1.5 hover:bg-[#e9944a] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              Feedback Report
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}