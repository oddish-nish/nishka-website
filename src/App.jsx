import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import EasterEggModal from './components/EasterEggModal'
import { MazeProvider } from './context/MazeContext'
import { ViewModeProvider } from './context/ViewModeContext'
import Home from './pages/Home'
import About from './pages/About'
import Curiosity from './pages/Curiosity'
import Projects from './pages/Projects'
import Creative from './pages/Creative'
import Quotes from './pages/Quotes'
import Poems from './pages/Poems'
import WhyThisSite from './pages/WhyThisSite'
import Odds from './pages/Odds'
import NotFound from './pages/NotFound'
import Questions from './pages/Questions'
import Philosophy from './pages/Philosophy'
import Books from './pages/Books'
import Learning from './pages/Learning'
import Experience from './pages/Experience'
import Research from './pages/Research'
import Playground from './pages/Playground'
import Greenhouse from './pages/Greenhouse'
import Performance from './pages/Performance'
import Moments from './pages/Moments'
import Beliefs from './pages/Beliefs'
import Boundaries from './pages/Boundaries'
import Studio from './pages/Studio'
import ScrollToTop from './components/ScrollToTop'

function Shell() {
  const { pathname } = useLocation()
  const desk = pathname === '/studio'

  return (
    <div className={`app ${desk ? 'is-desk' : ''}`}>
      <ScrollToTop />
      {!desk && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/beliefs" element={<Beliefs />} />
        <Route path="/about/boundaries" element={<Boundaries />} />
        <Route path="/curiosity" element={<Curiosity />} />
        <Route path="/curiosity/questions" element={<Questions />} />
        <Route path="/curiosity/philosophy" element={<Philosophy />} />
        <Route path="/curiosity/books" element={<Books />} />
        <Route path="/curiosity/learning" element={<Learning />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/experience" element={<Experience />} />
        <Route path="/projects/research" element={<Research />} />
        <Route path="/projects/playground" element={<Playground />} />
        <Route path="/creative" element={<Creative />} />
        <Route path="/creative/quotes" element={<Quotes />} />
        <Route path="/creative/poems" element={<Poems />} />
        <Route path="/creative/greenhouse" element={<Greenhouse />} />
        <Route path="/creative/performance" element={<Performance />} />
        <Route path="/creative/moments" element={<Moments />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/other" element={<WhyThisSite />} />
        <Route path="/odds" element={<Odds />} />
        <Route path="/quotes" element={<Navigate to="/creative/quotes" replace />} />
        <Route path="/poems" element={<Navigate to="/creative/poems" replace />} />
        <Route path="/why-this-site" element={<Navigate to="/other" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!desk && <Footer />}
      {!desk && <EasterEggModal />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <MazeProvider>
        <ViewModeProvider>
          <Shell />
        </ViewModeProvider>
      </MazeProvider>
    </Router>
  )
}

export default App

