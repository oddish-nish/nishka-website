import RoomShell from '../components/RoomShell'
import { useLiving } from '../lib/living'

function Moments() {
  const frames = useLiving('photos').filter((photo) => photo.inFrames !== false)

  return (
    <RoomShell roomId="moments">
      <section className="section polaroid-room">
        <div className="container">
          <p className="section-subtitle">Scattered on the glass table.</p>
          <div className="polaroid-spread">
            {frames.map((frame, i) => (
              <figure key={frame.id} className={`polaroid polaroid-${(i % 4) + 1}`}>
                <img src={frame.src} alt={frame.caption || ''} />
                <figcaption>{frame.caption || ' '}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </RoomShell>
  )
}

export default Moments
