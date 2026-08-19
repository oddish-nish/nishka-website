import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { beliefs } from '../data/soul'

function Beliefs() {
  const { visible, showAll, toggle } = useCollection('beliefs', beliefs, 4)
  const [held, setHeld] = useState(null)

  return (
    <RoomShell roomId="beliefs">
      <section className="section stone-room">
        <div className="container">
          <p className="section-subtitle">Pick one up. Even when it is inconvenient.</p>
          <ShowAllButton label="beliefs" showAll={showAll} onToggle={toggle} />
          <div className="stone-row">
            {visible.map((belief, i) => (
              <button
                key={belief}
                type="button"
                className={`belief-stone stone-${i % 4} ${held === belief ? 'is-held' : ''}`}
                onClick={() => setHeld(held === belief ? null : belief)}
              >
                {held === belief ? belief : '·'}
              </button>
            ))}
          </div>
          {held && <p className="stone-held">{held}</p>}
        </div>
      </section>
    </RoomShell>
  )
}

export default Beliefs
