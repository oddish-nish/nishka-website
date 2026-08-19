import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { useLiving } from '../lib/living'

const positions = [
  { x: 18, y: 16 },
  { x: 72, y: 12 },
  { x: 48, y: 22 },
  { x: 28, y: 32 },
  { x: 82, y: 30 },
  { x: 10, y: 46 },
  { x: 40, y: 42 },
  { x: 64, y: 38 },
  { x: 88, y: 48 },
  { x: 22, y: 56 },
  { x: 52, y: 52 },
  { x: 76, y: 58 },
  { x: 8, y: 68 },
  { x: 34, y: 70 },
  { x: 58, y: 66 },
  { x: 84, y: 72 },
  { x: 16, y: 82 },
  { x: 44, y: 86 },
  { x: 68, y: 80 },
  { x: 90, y: 88 },
  { x: 30, y: 94 },
]

function Learning() {
  const learning = useLiving('learning')
  const { visible, showAll, toggle } = useCollection('learning', learning, 5)
  const [openId, setOpenId] = useState(null)
  const open = visible.find((s) => s.id === openId)

  return (
    <RoomShell roomId="learning">
      <section className="section constellation-room">
        <div className="container">
          <p className="section-subtitle">Stars I am still walking toward.</p>
          <ShowAllButton label="topics" showAll={showAll} onToggle={toggle} />
          <div className={`constellation ${showAll ? 'is-all' : ''}`}>
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
