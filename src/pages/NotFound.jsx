import { useState } from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  const [noticed, setNoticed] = useState(false)

  return (
    <>
      <section className="section error-section">
        <div className="container">
          <div className="error-content">
            <h1 className="error-title">
              <button type="button" className="quiet-egg error-title-egg" onClick={() => setNoticed(true)}>
                This page doesn't exist.
              </button>
            </h1>
            <p className="error-subtitle">But curiosity brought you here.</p>
            {noticed && (
              <p className="error-egg">You can still keep going. Try Odds. Or type oddish anywhere.</p>
            )}
            <Link to="/other" className="error-link">→ Why this site exists</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound


