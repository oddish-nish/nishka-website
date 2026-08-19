import { Link } from 'react-router-dom'
import { WINGS } from '../data/rooms'
import { openEasterEgg } from './EasterEggModal'

function GlassDoor({ place, className = '', label }) {
  const wingId = place.rooms ? place.id : place.wing
  const isHall = Boolean(place.rooms)

  return (
    <Link to={place.path} className={`glass-door glass-door-${wingId} ${className}`}>
      <span className="glass-door-frost" />
      <span className="glass-door-label">
        {label || (isHall ? place.title.toLowerCase() : place.title)}
      </span>
      <span className="glass-door-whisper">{place.whisper || place.subtitle}</span>
    </Link>
  )
}

export function HouseHallway({ wingId, doors, kicker }) {
  const wing = WINGS[wingId]

  return (
    <section className={`house-hallway hallway-${wingId}`}>
      <div className={`container hallway-inner ${kicker ? '' : 'no-kicker'}`}>
        {kicker && <p className="hallway-kicker">{kicker}</p>}
        <h1 className="hallway-title">
          {wing.egg ? (
            <button
              type="button"
              className="hallway-title-egg"
              onClick={() => openEasterEgg(wing.egg, 'brain')}
            >
              {wing.title}
            </button>
          ) : (
            wing.title
          )}
        </h1>
        <p className="hallway-subtitle">{wing.subtitle}</p>
        <div className="glass-door-row">
          {doors.map((place) => (
            <GlassDoor key={place.id} place={place} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { GlassDoor }
