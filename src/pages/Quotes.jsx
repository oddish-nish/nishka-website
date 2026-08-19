import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { useLiving } from '../lib/living'

const spots = [
  { top: '6%', left: '4%' },
  { top: '2%', left: '38%' },
  { top: '10%', left: '70%' },
  { top: '48%', left: '10%' },
  { top: '42%', left: '40%' },
  { top: '52%', left: '68%' },
]

function Quotes() {
  const quotes = useLiving('quotes')
  const { visible, showAll, toggle } = useCollection('quotes', quotes, 6)
  const [popped, setPopped] = useState(null)

  return (
    <RoomShell roomId="quotes">
      <section className="section fizz-room">
        <div className="container">
          <p className="fizz-hint">Click a bubble. It tastes like the sentence that would not leave.</p>
          <ShowAllButton label="quotes" showAll={showAll} onToggle={toggle} />
          <div className={`fizz-tank ${showAll ? 'is-all' : 'is-float'}`}>
            {visible.map((quote, i) => {
              const spot = spots[i % spots.length]
              return (
                <button
                  key={quote.id}
                  type="button"
                  className={`fizz-bubble flavor-${quote.flavor} ${popped === quote.id ? 'is-popped' : ''}`}
                  style={
                    showAll
                      ? { animationDelay: `${(i % 8) * 0.18}s` }
                      : {
                          top: spot.top,
                          left: spot.left,
                          animationDelay: `${i * 0.35}s`,
                        }
                  }
                  onClick={() => setPopped(popped === quote.id ? null : quote.id)}
                >
                  <span className="fizz-glint" />
                  {popped === quote.id ? (
                    <>
                      <span className="fizz-text">{quote.text}</span>
                      <span className="fizz-author">— {quote.author}</span>
                    </>
                  ) : (
                    <span className="fizz-tease">{quote.text.split(' ').slice(0, 4).join(' ')}…</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </RoomShell>
  )
}

export default Quotes
