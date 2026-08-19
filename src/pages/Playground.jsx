import { useEffect, useState } from 'react'
import RoomShell from '../components/RoomShell'
import ViewToggle from '../components/ViewToggle'
import { useViewMode } from '../context/ViewModeContext'
import { playground } from '../data/playground'

function Playground() {
  const { isHiring } = useViewMode()
  const cabinets = isHiring ? playground.filter((p) => p.onResume) : playground
  const [litId, setLitId] = useState(cabinets[0]?.id || null)
  const lit = cabinets.find((c) => c.id === litId) || cabinets[0]

  useEffect(() => {
    if (!cabinets.some((c) => c.id === litId)) {
      setLitId(cabinets[0]?.id || null)
    }
  }, [cabinets, litId])

  return (
    <RoomShell roomId="playground">
      <ViewToggle />
      <section className="arcade-room">
        <div className="container">
          <div className="arcade-floor">
            {cabinets.map((cab, i) => (
              <button
                key={cab.id}
                type="button"
                className={`arcade-cabinet tone-${i % 5} ${litId === cab.id ? 'is-lit' : ''}`}
                onClick={() => setLitId(cab.id)}
              >
                <span className="arcade-marquee">{cab.badge}</span>
                <span className="arcade-crt">
                  <span className="arcade-crt-scan" />
                  <span className="arcade-crt-title">{cab.title}</span>
                </span>
                <span className="arcade-controls" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="arcade-nameplate">{cab.meta}</span>
              </button>
            ))}
          </div>

          {lit && (
            <article className="arcade-ticket">
              <p className="arcade-ticket-kicker">{lit.badge}</p>
              <h2>{lit.title}</h2>
              {lit.awards?.length > 0 && (
                <p className="arcade-awards">{lit.awards.join(' · ')}</p>
              )}
              <p>{isHiring ? lit.hire : lit.explore}</p>
              {lit.link && (
                <a href={lit.link} target="_blank" rel="noopener noreferrer" className="arcade-ticket-link">
                  {lit.linkLabel} →
                </a>
              )}
            </article>
          )}
        </div>
      </section>
    </RoomShell>
  )
}

export default Playground
