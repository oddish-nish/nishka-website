import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { useLiving } from '../lib/living'

function Poems() {
  const poems = useLiving('poems')
  const [current, setCurrent] = useState(0)
  const [showIndex, setShowIndex] = useState(false)
  const poem = poems[current] || poems[0]

  return (
    <RoomShell roomId="poems">
      <section className="section poems-scrapbook-section">
        <div className="container">
          <div className="poems-scrapbook">
            <div className="poem-navigation">
              <button
                className="poem-nav-btn"
                onClick={() => setCurrent((p) => (p - 1 + poems.length) % poems.length)}
                aria-label="Previous poem"
              >
                ←
              </button>
              <span className="poem-counter">
                {current + 1} / {poems.length}
              </span>
              <button
                className="poem-nav-btn"
                onClick={() => setCurrent((p) => (p + 1) % poems.length)}
                aria-label="Next poem"
              >
                →
              </button>
              <button
                className="poem-nav-btn poem-random-btn"
                onClick={() => setCurrent(Math.floor(Math.random() * poems.length))}
                aria-label="Another poem"
              >
                another
              </button>
              <button className="poem-index-btn" onClick={() => setShowIndex(true)}>
                all poems
              </button>
            </div>

            <div className="poems-scrapbook-container">
              {poem ? (
                <div className="poem-scrapbook-item active">
                  <div className="poem-scrapbook-card">
                    <h3 className="poem-title">{poem.title}</h3>
                    {poem.author && <p className="poem-author">{poem.author}</p>}
                    <div className="poem-content">
                      {poem.lines.map((line, i) =>
                        line ? <p key={`${poem.id}-${i}`}>{line}</p> : <br key={`${poem.id}-${i}`} />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="studio-status">Nothing on this page yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {showIndex && (
        <div className="poem-index-modal active" onClick={() => setShowIndex(false)}>
          <div className="poem-index-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="poem-index-modal-header">
              <h2>All Poems</h2>
              <button className="poem-index-close" onClick={() => setShowIndex(false)} aria-label="Close">
                ×
              </button>
            </div>
            <div className="poem-index-list">
              {poems.map((p, index) => (
                <div
                  key={p.id}
                  className="poem-index-item"
                  onClick={() => {
                    setCurrent(index)
                    setShowIndex(false)
                  }}
                >
                  {p.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </RoomShell>
  )
}

export default Poems
