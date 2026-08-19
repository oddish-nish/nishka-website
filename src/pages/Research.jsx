import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import ViewToggle from '../components/ViewToggle'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { useViewMode } from '../context/ViewModeContext'
import { research } from '../data/research'

function Research() {
  const { isHiring } = useViewMode()
  const { visible, showAll, toggle } = useCollection('research', research, 2)
  const entries = isHiring || showAll ? research : visible
  const [page, setPage] = useState(0)
  const [glasses, setGlasses] = useState('simple')
  const entry = entries[page % entries.length] || research[0]
  const explore = entry.explore[glasses] || entry.explore.simple

  return (
    <RoomShell roomId="research">
      <ViewToggle />
      <section className="section notebook-room">
        <div className="container">
          {!isHiring && (
            <>
              <ShowAllButton label="labs" showAll={showAll} onToggle={toggle} />
              <div className="explanation-toggle glasses-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${glasses === 'simple' ? 'active' : ''}`}
                  onClick={() => setGlasses('simple')}
                >
                  Explain like I&apos;m 5
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${glasses === 'technical' ? 'active' : ''}`}
                  onClick={() => setGlasses('technical')}
                >
                  Explain like I&apos;m a reviewer
                </button>
              </div>
            </>
          )}

          <div className="notebook">
            <button
              type="button"
              className="notebook-flip"
              onClick={() => setPage((p) => (p - 1 + entries.length) % entries.length)}
              aria-label="Previous page"
            >
              ‹
            </button>
            <article className="notebook-page">
              <p className="notebook-count">
                page {(page % entries.length) + 1} of {entries.length}
              </p>
              <p className="notebook-question">
                <em>{entry.question}</em>
              </p>
              <h2>{entry.title}</h2>
              <p className="notebook-meta">
                {entry.place} · {entry.when}
              </p>
              {isHiring ? (
                <>
                  <p>
                    <strong>Focus:</strong> {entry.hire.focus}
                  </p>
                  <p>
                    <strong>Methods:</strong> {entry.hire.methods}
                  </p>
                  <p>
                    <strong>Achievements:</strong> {entry.hire.achievements}
                  </p>
                  <p>
                    <strong>Technologies:</strong> {entry.hire.tech}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>What I studied:</strong> {explore.studied}
                  </p>
                  <p>
                    <strong>Why I cared:</strong> {explore.cared}
                  </p>
                  <p>
                    <strong>What I actually did:</strong> {explore.did}
                  </p>
                  <p>
                    <strong>What it taught me:</strong> {explore.taught}
                  </p>
                </>
              )}
            </article>
            <button
              type="button"
              className="notebook-flip"
              onClick={() => setPage((p) => (p + 1) % entries.length)}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </RoomShell>
  )
}

export default Research
