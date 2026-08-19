import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GlassDoor } from '../components/HouseHallway'
import { WINGS } from '../data/rooms'
import { useLiving } from '../lib/living'
import { useViewMode } from '../context/ViewModeContext'
import { openEasterEgg } from '../components/EasterEggModal'

const fonts = [
  'Fraunces',
  'Outfit',
  'Georgia',
  'Palatino, Palatino Linotype, Palatino, serif',
  'Times New Roman, Times, serif',
  'Courier New, Courier, monospace',
  'Didot, Bodoni MT, serif',
  'Baskerville, Baskerville Old Face, serif',
  'Hoefler Text, serif',
  'Garamond, EB Garamond, serif',
  'Futura, Trebuchet MS, sans-serif',
  'Optima, Candara, sans-serif',
  'Gill Sans, Gill Sans MT, sans-serif',
  'American Typewriter, Courier New, monospace',
  'Snell Roundhand, Apple Chancery, cursive',
  'Brush Script MT, cursive',
  'Impact, Haettenschweiler, sans-serif',
  'Copperplate, Copperplate Gothic Light, serif',
  'Marker Felt, Comic Sans MS, cursive',
  'Playfair Display, serif',
  'Cormorant Garamond, serif',
  'Instrument Serif, serif',
  'DM Serif Display, serif',
  'Bodoni Moda, serif',
  'Italiana, serif',
  'Gloock, serif',
  'Yeseva One, serif',
  'Cinzel, serif',
  'Caveat, cursive',
  'Great Vibes, cursive',
  'Homemade Apple, cursive',
  'Dancing Script, cursive',
  'Special Elite, cursive',
  'Space Mono, monospace',
  'Syne, sans-serif',
  'Unbounded, sans-serif',
  'Fredoka, sans-serif',
]

const doors = [WINGS.brain, WINGS.work, WINGS.heart, WINGS.soul]

const HERO_PLACES = [
  { top: '10%', left: '5%', width: '280px', height: '280px', transform: 'rotate(-5deg)' },
  { top: '20%', right: '8%', width: '250px', height: '250px', transform: 'rotate(4deg)' },
  { bottom: '15%', left: '8%', width: '320px', height: '320px', transform: 'rotate(-3deg)' },
  { top: '5%', left: '50%', width: '260px', height: '260px', transform: 'translateX(-50%) rotate(2deg)' },
  { bottom: '10%', right: '6%', width: '200px', height: '200px', transform: 'rotate(-6deg)' },
  { top: '48%', left: '2%', width: '170px', height: '170px', transform: 'rotate(7deg)' },
  { top: '58%', right: '20%', width: '160px', height: '160px', transform: 'rotate(-4deg)' },
  { bottom: '32%', left: '30%', width: '150px', height: '150px', transform: 'rotate(5deg)' },
]

function Home() {
  const nameRef = useRef(null)
  const photos = useLiving('photos').filter((photo) => photo.onHome !== false)
  const { setViewMode } = useViewMode()

  useEffect(() => {
    setViewMode('exploring')
  }, [setViewMode])

  useEffect(() => {
    const nameElement = nameRef.current
    if (!nameElement) return
    let last = nameElement.style.fontFamily
    const handleMouseOver = () => {
      let next = fonts[Math.floor(Math.random() * fonts.length)]
      while (next === last && fonts.length > 1) {
        next = fonts[Math.floor(Math.random() * fonts.length)]
      }
      last = next
      nameElement.style.fontFamily = next
    }
    nameElement.addEventListener('mouseover', handleMouseOver)
    return () => nameElement.removeEventListener('mouseover', handleMouseOver)
  }, [])

  return (
    <section id="hero" className="hero atrium">
      <div className="hero-photos">
        {photos.map((photo, i) => (
          <img
            key={photo.id}
            src={photo.src}
            className="hero-photo"
            style={HERO_PLACES[i % HERO_PLACES.length]}
            alt=""
          />
        ))}
      </div>

      <div className="hero-content">
        <h1 className="hero-title" id="nishka-name">
          Hi, I&apos;m <span className="name-hover" ref={nameRef}>Nishka</span>.
        </h1>
        <p className="hero-subtitle">
          <button
            type="button"
            className="quiet-egg hero-subtitle-egg"
            onClick={() => openEasterEgg('I printed that on the front door on purpose.')}
          >
            Ask questions endlessly. Find the answers shamelessly.
          </button>
        </p>
        {new Date().getHours() < 5 && (
          <p className="hero-late">It’s late. I like this hour.</p>
        )}
        <p className="hero-hire">
          <Link to="/work?hire=1">
            For roles, research, and projects, start here.
          </Link>
        </p>

        <div className="glass-door-row atrium-doors">
          {doors.map((place) => (
            <GlassDoor
              key={place.id}
              place={place}
              label={`see my ${place.title.toLowerCase()}`}
            />
          ))}
        </div>

        <div className="socials">
            <a href="https://github.com/oddish-nish" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="/assets/github.svg" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/nish-awa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/assets/linkedin.svg" alt="LinkedIn" />
          </a>
          <a href="https://www.instagram.com/nishkaawasthi/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/assets/instagram.svg" alt="Instagram" />
          </a>
          <a href="mailto:nishkaawasthi@gmail.com" aria-label="Email">
            <img src="/assets/email.svg" alt="Email" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Home
