import { useMemo, useState } from 'react'
import RoomShell from '../components/RoomShell'
import { useMaze } from '../context/MazeContext'
import { boundaries } from '../data/soul'

function Boundaries() {
  const { sampleItems, seed } = useMaze()
  const pairs = useMemo(
    () => sampleItems('boundaries', boundaries, boundaries.length, { all: true }),
    [sampleItems, seed]
  )
  const [hover, setHover] = useState(null)

  return (
    <RoomShell roomId="boundaries">
      <section className="section scale-room">
        <div className="container">
          <p className="section-subtitle">Letting go on one side. Protecting on the other.</p>
          <div className="scale-pairs">
            {pairs.map((pair, i) => (
              <div
                key={pair.lettingGo}
                className={`scale-pair ${hover === i ? 'is-hot' : ''}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <p className="scale-letgo">Letting go of {pair.lettingGo}</p>
                <p className="scale-protect">Protecting {pair.protecting}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RoomShell>
  )
}

export default Boundaries
