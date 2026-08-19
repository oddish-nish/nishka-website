import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <section className="section error-section">
        <div className="container">
          <div className="error-content">
            <h1 className="error-title">This page doesn't exist.</h1>
            <p className="error-subtitle">But curiosity brought you here.</p>
            <Link to="/other" className="error-link">→ Why this site exists</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound


