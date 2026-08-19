import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { philosophies } from '../data/philosophy'

function Philosophy() {
  const { visible, showAll, toggle } = useCollection('philosophy', philosophies, 3)
  const [page, setPage] = useState(0)
  const essay = visible[page % visible.length] || philosophies[0]

  return (
    <RoomShell roomId="philosophy">
      <section className="section journal-room">
        <div className="container">
          <ShowAllButton label="essays" showAll={showAll} onToggle={toggle} />
          <div className="journal-spread">
            <button
              type="button"
              className="journal-turn"
              onClick={() => setPage((p) => (p - 1 + visible.length) % visible.length)}
              aria-label="Previous essay"
            >
              ‹
            </button>
            <article className="journal-page">
              <p className="journal-count">
                { (page % visible.length) + 1 } / {visible.length}
              </p>
              <h2>{essay.title}</h2>
              <p className="journal-preview">{essay.preview}</p>
              {essay.paragraphs.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </article>
            <button
              type="button"
              className="journal-turn"
              onClick={() => setPage((p) => (p + 1) % visible.length)}
              aria-label="Next essay"
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </RoomShell>
  )
}

export default Philosophy
