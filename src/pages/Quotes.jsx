import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { useLiving } from '../lib/living'

function tease(text, id) {
  const words = text.split(' ')
  const n = 4 + (String(id).length % 4)
  if (words.length <= n) return `${text.replace(/[.?!]$/, '')}…`
  return `${words.slice(0, n).join(' ').replace(/[.,;:!?]$/, '')}…`
}

function Quotes() {
  const quotes = useLiving('quotes')
  const { visible, showAll, toggle } = useCollection('quotes', quotes, 8)
  const [held, setHeld] = useState(null)

  return (
    <RoomShell roomId="quotes">
      <section className="section fizz-room">
        <div className="container">
          <p className="fizz-hint">Pick a scrap. The rest is underneath.</p>
          <ShowAllButton label="quotes" showAll={showAll} onToggle={toggle} />
          <div className={`fizz-tank ${showAll ? 'is-all' : 'is-float'} ${held ? 'is-holding' : ''}`}>
            {visible.map((quote, i) => {
              const open = held === quote.id
              return (
                <button
                  key={quote.id}
                  type="button"
                  className={`fizz-bubble flavor-${quote.flavor} ${open ? 'is-popped' : ''}`}
                  style={{ '--i': i }}
                  onClick={() => setHeld(open ? null : quote.id)}
                >
                  {open ? (
                    <>
                      <span className="fizz-text">{quote.text}</span>
                      <span className="fizz-author">— {quote.author}</span>
                    </>
                  ) : (
                    <span className="fizz-tease">{tease(quote.text, quote.id)}</span>
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
