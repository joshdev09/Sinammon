import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/NavBar'
import LandingPage from './components/LandingPage'
import About from './components/About'
import Footer from './components/Footer'
import DepEdOERs from './components/DepEdOERsPage'
import AiTools from './components/AiTools'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="font-sans antialiased min-h-screen bg-[var(--color-surface)] text-[var(--color-text-primary)]">
          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/deped-oers" element={<DepEdOERs />} />
            <Route path="/ai-tools" element={<AiTools />} />
            {/*
            <Route path="/tools" element={<Tools />} />
            */}
          </Routes>

          <hr />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App