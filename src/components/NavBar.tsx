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
        <button className="px-3 py-2 sm:p-3 cursor-pointer bg-[#FBA455] text-white font-semibold rounded-xl text-xs sm:text-sm hover:bg-[#e9944a] transition-colors">
          Feedback Report
        </button>
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
            <button className="flex-1 py-2.5 bg-[#FBA455] text-white font-semibold rounded-xl text-sm">
              Feedback Report
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}