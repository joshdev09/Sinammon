import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/NavBar'
import LandingPage from './components/LandingPage'
import About from './components/About'
import Footer from './components/Footer'
import DepEdOERs from './components/DepEdOERsPage'
import AiTools from './components/AiTools'
import FeedbackPage from './pages/FeedbackPage'

function App() {
  return (
      <Router>
        <div className="font-sans antialiased min-h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/deped-oers" element={<DepEdOERs />} />
            <Route path="/ai-tools" element={<AiTools />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>

          <hr className="border-t border-[#e5e5e5]" />
          <Footer />
        </div>
      </Router>
  )
}

export default App