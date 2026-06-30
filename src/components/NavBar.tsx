import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

// Make sure this path matches your folder structure relative to the Navbar file
import logo from '../assets/images/logo.png'

function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 sm:p-3 cursor-pointer bg-[#E6C1AE] rounded-xl hover:bg-[#d9ae99] transition-colors ${className}`}
    >
      {isDark ? (
        // sun icon — shown when currently dark, click to go light
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#555" className="w-4 h-4 sm:w-5 sm:h-5">
          <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // moon icon — shown when currently light, click to go dark
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#555" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  )
}

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
    <nav className="flex flex-row px-4 sm:px-6 py-3 sm:py-4 bg-[var(--color-nav)] items-center justify-between relative z-50">
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
        <ThemeToggle />
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
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}