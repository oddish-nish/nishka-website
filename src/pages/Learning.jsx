import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { learning } from '../data/learning'

const positions = [
  { x: 18, y: 28 },
  { x: 72, y: 22 },
  { x: 48, y: 48 },
  { x: 28, y: 68 },
  { x: 78, y: 62 },
  { x: 55, y: 82 },
]

function Learning() {
  const { visible, showAll, toggle } = useCollection('learning', learning, 4)
  const [openId, setOpenId] = useState(null)
  const open = visible.find((s) => s.id === openId)

  return (
    <RoomShell roomId="learning">
      <section className="section constellation-room">
        <div className="container">
          <p className="section-subtitle">Stars I am still walking toward.</p>
          <ShowAllButton label="topics" showAll={showAll} onToggle={toggle} />
          <div className="constellation">
            {visible.map((star, i) => {
              const pos = positions[i % positions.length]
              return (
                <button
                  key={star.id}
                  type="button"
                  className={`star ${openId === star.id ? 'is-open' : ''}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  onClick={() => setOpenId(openId === star.id ? null : star.id)}
                >
                  <span className="star-dot" />
                  <span className="star-label">{star.title}</span>
                </button>
              )
            })}
          </div>
          {open && (
            <article className="star-note">
              <h2>{open.title}</h2>
              <p>{open.note}</p>
            </article>
          )}
        </div>
      </section>
    </RoomShell>
  )
}

export default Learning
