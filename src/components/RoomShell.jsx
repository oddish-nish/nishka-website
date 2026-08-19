import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMaze } from '../context/MazeContext'
import { useViewMode } from '../context/ViewModeContext'
import { ROOMS, WINGS } from '../data/rooms'
import { GlassDoor } from './HouseHallway'

function RoomShell({ roomId, children, className = '' }) {
  const { markSeen, getExits } = useMaze()
  const { isHiring } = useViewMode()
  const room = ROOMS[roomId]
  const wing = WINGS[room.wing]
  const exits = getExits(roomId)

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
            <p className="keep-walking-label">Keep going.</p>
            <div className="glass-door-row glass-door-row-compact">
              {exits.map((place) => (
                <GlassDoor key={place.id} place={place} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default RoomShell
