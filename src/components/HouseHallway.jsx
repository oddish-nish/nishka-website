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

function Passage({ place }) {
  const wingId = place.rooms ? place.id : place.wing
  const isHall = Boolean(place.rooms)

  return (
    <Link to={place.path} className={`passage passage-${wingId}`}>
      <span className="passage-name">{isHall ? place.title.toLowerCase() : place.title}</span>
      <span className="passage-whisper">{place.whisper || place.subtitle}</span>
    </Link>
  )
}

export function HouseHallway({ wingId, doors, kicker, lead }) {
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
        {lead}
        <nav className="hallway-doors" aria-label={`${wing.title} rooms`}>
          {doors.map((place) => (
            <Passage key={place.id} place={place} />
          ))}
        </nav>
      </div>
    </section>
  )
}

export { GlassDoor, Passage }
