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

function RedirectKeepSearch({ to }) {
  const { search } = useLocation()
  return <Navigate to={`${to}${search}`} replace />
}

function Shell() {
  const { pathname } = useLocation()
  const desk = pathname === '/studio'

  return (
    <div className={`app ${desk ? 'is-desk' : ''}`}>
      <ScrollToTop />
      {!desk && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brain" element={<Curiosity />} />
        <Route path="/brain/questions" element={<Questions />} />
        <Route path="/brain/philosophy" element={<Philosophy />} />
        <Route path="/brain/books" element={<Books />} />
        <Route path="/brain/learning" element={<Learning />} />
        <Route path="/work" element={<Projects />} />
        <Route path="/work/experience" element={<Experience />} />
        <Route path="/work/research" element={<Research />} />
        <Route path="/work/playground" element={<Playground />} />
        <Route path="/heart" element={<Creative />} />
        <Route path="/heart/quotes" element={<Quotes />} />
        <Route path="/heart/poems" element={<Poems />} />
        <Route path="/heart/greenhouse" element={<Greenhouse />} />
        <Route path="/heart/performance" element={<Performance />} />
        <Route path="/heart/moments" element={<Moments />} />
        <Route path="/soul" element={<About />} />
        <Route path="/soul/beliefs" element={<Beliefs />} />
        <Route path="/soul/boundaries" element={<Boundaries />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/other" element={<WhyThisSite />} />
        <Route path="/odds" element={<Odds />} />
        <Route path="/quotes" element={<RedirectKeepSearch to="/heart/quotes" />} />
        <Route path="/poems" element={<RedirectKeepSearch to="/heart/poems" />} />
        <Route path="/why-this-site" element={<RedirectKeepSearch to="/other" />} />
        <Route path="/curiosity" element={<RedirectKeepSearch to="/brain" />} />
        <Route path="/curiosity/questions" element={<RedirectKeepSearch to="/brain/questions" />} />
        <Route path="/curiosity/philosophy" element={<RedirectKeepSearch to="/brain/philosophy" />} />
        <Route path="/curiosity/books" element={<RedirectKeepSearch to="/brain/books" />} />
        <Route path="/curiosity/learning" element={<RedirectKeepSearch to="/brain/learning" />} />
        <Route path="/projects" element={<RedirectKeepSearch to="/work" />} />
        <Route path="/projects/experience" element={<RedirectKeepSearch to="/work/experience" />} />
        <Route path="/projects/research" element={<RedirectKeepSearch to="/work/research" />} />
        <Route path="/projects/playground" element={<RedirectKeepSearch to="/work/playground" />} />
        <Route path="/creative" element={<RedirectKeepSearch to="/heart" />} />
        <Route path="/creative/quotes" element={<RedirectKeepSearch to="/heart/quotes" />} />
        <Route path="/creative/poems" element={<RedirectKeepSearch to="/heart/poems" />} />
        <Route path="/creative/greenhouse" element={<RedirectKeepSearch to="/heart/greenhouse" />} />
        <Route path="/creative/performance" element={<RedirectKeepSearch to="/heart/performance" />} />
        <Route path="/creative/moments" element={<RedirectKeepSearch to="/heart/moments" />} />
        <Route path="/about" element={<RedirectKeepSearch to="/soul" />} />
        <Route path="/about/beliefs" element={<RedirectKeepSearch to="/soul/beliefs" />} />
        <Route path="/about/boundaries" element={<RedirectKeepSearch to="/soul/boundaries" />} />
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

