import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import About from './components/About'
// import Tools from './components/Tools'
// import DepEdOers from './components/DepEdOers'
// import AiTools from './components/AiTools'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          {/*
          <Route path="/tools" element={<Tools />} /> 
          <Route path="/deped-oers" element={<DepEdOers />} /> 
          <Route path="/ai-tools" element={<AiTools />} /> 
          */}
      </Routes>
    </Router>
  )
}

export default App