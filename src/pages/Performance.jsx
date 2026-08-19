import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { openEasterEgg } from '../components/EasterEggModal'
import { useLiving } from '../lib/living'

function Performance() {
  const stories = useLiving('stories')
  const [lit, setLit] = useState([false, false, false])
  const [openId, setOpenId] = useState(null)

  const toggleLight = (index) => {
    setLit((prev) => {
      const next = prev.map((on, i) => (i === index ? !on : on))
      if (next.every(Boolean) && !prev.every(Boolean)) {
        openEasterEgg('The lights are on. Sit down. I’ll tell you a story.')
      }
      return next
    })
  }

  return (
    <RoomShell roomId="performance" className="stage-shell">
      <section className="section stage-room">
        <div className="container">
          <div className="stage-lights">
            {['pink', 'amber', 'blue'].map((color, index) => (
              <button
                key={color}
                type="button"
                className={lit[index] ? 'is-lit' : ''}
                aria-label={`${color} stage light`}
                aria-pressed={lit[index]}
                onClick={() => toggleLight(index)}
              />
            ))}
          </div>
          <p className="stage-copy">Fun stories. The ones that asked to be told.</p>
          {stories.length === 0 ? (
            <p className="section-subtitle">The set is ready. The stories are still finding their way here.</p>
          ) : (
            <ul className="stage-program">
              {stories.map((story) => (
                <li key={story.id}>
                  <button
                    type="button"
                    className={`stage-play ${openId === story.id ? 'is-open' : ''}`}
                    onClick={() => setOpenId(openId === story.id ? null : story.id)}
                  >
                    <span className="stage-play-title">{story.title}</span>
                    {openId === story.id && story.body && (
                      <span className="stage-play-body">{story.body}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </RoomShell>
  )
}

export default Performance
