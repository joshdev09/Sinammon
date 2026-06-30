import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import About from './components/About'
// import Tools from './components/Tools'
import DepEdOERs from './components/DepEdOERsPage'
import AiTools from './components/AiTools'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/deped-oers" element={<DepEdOERs />} /> 
          <Route path="/ai-tools" element={<AiTools />} /> 
          {/*
          <Route path="/tools" element={<Tools />} /> 
          */}
      </Routes>
    </Router>
  )
}

export default App