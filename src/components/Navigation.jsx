import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navigation() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>nishka</Link>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/curiosity" className={`nav-link ${isActive('/curiosity') ? 'active' : ''}`} onClick={closeMenu}>brain</Link>
          <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`} onClick={closeMenu}>work</Link>
          <Link to="/creative" className={`nav-link ${isActive('/creative') ? 'active' : ''}`} onClick={closeMenu}>heart</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>soul</Link>
          <Link to="/odds" className={`nav-link ${isActive('/odds') ? 'active' : ''}`} onClick={closeMenu}>odds</Link>
          <Link to="/other" className={`nav-link ${isActive('/other') ? 'active' : ''}`} onClick={closeMenu}>other</Link>
        </div>
        <button className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navigation


