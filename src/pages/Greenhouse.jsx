import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { plants } from '../data/plants'

function Greenhouse() {
  const { visible, showAll, toggle } = useCollection('plants', plants, 3)
  const [closeId, setCloseId] = useState(null)
  const close = visible.find((p) => p.id === closeId)

  return (
    <RoomShell roomId="greenhouse" className="greenhouse-shell">
      <section className="section greenhouse-room">
        <div className="container">
          <ShowAllButton label="plants" showAll={showAll} onToggle={toggle} />
          <div className="pot-row">
            {visible.map((plant) => (
              <button
                key={plant.id}
                type="button"
                className={`plant-pot ${closeId === plant.id ? 'is-close' : ''}`}
                onClick={() => setCloseId(closeId === plant.id ? null : plant.id)}
              >
                <span className="plant-silhouette" style={{ '--pot': plant.pot }} />
                <span className="plant-name">{plant.name}</span>
                <span className="plant-latin">{plant.latin}</span>
              </button>
            ))}
          </div>
          {close && (
            <article className="plant-closeup">
              <h2>{close.name}</h2>
              <p className="plant-latin">{close.latin}</p>
              <p>{close.why}</p>
              <p>
                <strong>Ritual:</strong> {close.ritual}
              </p>
              <p>
                <strong>Confession:</strong> {close.confession}
              </p>
            </article>
          )}
        </div>
      </section>
    </RoomShell>
  )
}

export default Greenhouse
