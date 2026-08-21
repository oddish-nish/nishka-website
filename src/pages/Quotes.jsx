import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { useLiving } from '../lib/living'

function Quotes() {
  const quotes = useLiving('quotes')
  const { visible, showAll, toggle } = useCollection('quotes', quotes, 6)
  const [held, setHeld] = useState(null)

  return (
    <RoomShell roomId="quotes">
      <section className="section fizz-room">
        <div className="container">
          <ShowAllButton label="quotes" showAll={showAll} onToggle={toggle} />
          <div className={`fizz-tank ${held ? 'is-holding' : ''}`}>
            {visible.map((quote) => (
              <button
                key={quote.id}
                type="button"
                className={`fizz-bubble flavor-${quote.flavor} ${held === quote.id ? 'is-popped' : ''}`}
                onClick={() => setHeld(held === quote.id ? null : quote.id)}
              >
                <span className="fizz-text">{quote.text}</span>
                <span className="fizz-author">— {quote.author}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </RoomShell>
  )
}

export default Quotes
