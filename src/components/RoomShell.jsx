import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMaze } from '../context/MazeContext'
import { useViewMode } from '../context/ViewModeContext'
import { ROOMS, WINGS } from '../data/rooms'
import { Passage } from './HouseHallway'
import { openEasterEgg } from './EasterEggModal'

function RoomShell({ roomId, children, className = '' }) {
  const { markSeen, getExits } = useMaze()
  const { isHiring } = useViewMode()
  const room = ROOMS[roomId]
  const wing = WINGS[room.wing]
  const exits = getExits(roomId)
  const [keepGoingTaps, setKeepGoingTaps] = useState(0)

  useEffect(() => {
    markSeen(roomId)
  }, [roomId, markSeen])

  return (
    <div className={`room-shell room-${room.wing} ${className}`}>
      <div className="container room-top">
        <Link to={wing.path} className="back-link room-back">
          {isHiring && wing.id === 'work' ? '← back to resume' : `← back to the ${wing.title.toLowerCase()} hallway`}
        </Link>
      </div>

      <header className="room-header">
        <div className="container">
          {!isHiring && <p className="room-kicker">{wing.title}</p>}
          <h1 className="room-title">{room.title}</h1>
          {!isHiring && <p className="room-whisper">{room.whisper}</p>}
        </div>
      </header>

      <div className="room-body">{children}</div>

      {!isHiring && (
        <section className="keep-walking">
          <div className="container">
            <p className="keep-walking-label">
              <button
                type="button"
                className="quiet-egg"
                onClick={() => {
                  const next = keepGoingTaps + 1
                  setKeepGoingTaps(next)
                  if (next === 3) {
                    openEasterEgg('The house is not trying to trap you. It is trying to see what you notice.')
                  }
                }}
              >
                Keep going.
              </button>
            </p>
            <nav className="keep-walking-doors" aria-label="Keep going">
              {exits.map((place) => (
                <Passage key={place.id} place={place} />
              ))}
            </nav>
          </div>
        </section>
      )}
    </div>
  )
}

export default RoomShell
