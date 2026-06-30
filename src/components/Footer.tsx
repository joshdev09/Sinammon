function Footer() {
  return (
    <footer className="w-full bg-white">
      <hr className="border-t border-neutral-200" />
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="text-center sm:text-left">
          <p className="text-base font-semibold text-neutral-900 tracking-tight">
            Sinammon
          </p>
          <p className="text-sm text-neutral-500 mt-0.5">
            Centralized Open-source Tool Platform for Educators
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            developed by: Joshua Halili
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <p className="text-xs text-neutral-400">
            Centralized Open-source Tools <span className="mx-1">•</span> v1.0.0
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/joshua-emmanuel-m-halili-133155377/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-neutral-400 hover:text-indigo-600 transition-colors"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.532 0-1.768 1.198-1.768 2.433v4.684h-3v-9h2.881v1.231h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.605 2.001 3.605 4.604v4.728z" />
                </svg>
            </a>
            <a
              href="https://github.com/joshdev09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;