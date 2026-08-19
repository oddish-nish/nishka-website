import { useEffect, useRef } from 'react'
import { GlassDoor } from '../components/HouseHallway'
import { WINGS } from '../data/rooms'
import { useLiving } from '../lib/living'

const fonts = [
  'Fraunces',
  'Georgia',
  'Palatino, Palatino Linotype, serif',
  'Times New Roman',
  'Courier New',
  'Outfit',
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

  useEffect(() => {
    const nameElement = nameRef.current
    if (!nameElement) return
    const handleMouseOver = () => {
      nameElement.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)]
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
        <p className="hero-subtitle">Ask questions endlessly. Find the answers shamelessly.</p>

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
