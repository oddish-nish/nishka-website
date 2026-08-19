import { useCallback, useEffect, useState } from 'react'
import { shuffle } from '../lib/rng'
import { useLiving } from '../lib/living'
import { openEasterEgg } from '../components/EasterEggModal'

function freshDeck(items, avoidId) {
  let next = shuffle(items, Math.random)
  if (avoidId && next[0]?.id === avoidId && next.length > 1) {
    next = [...next.slice(1), next[0]]
  }
  return next
}

function Odds() {
  const facts = useLiving('facts')
  const [deck, setDeck] = useState(() => freshDeck(facts))
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setDeck(freshDeck(facts))
    setIndex(0)
  }, [facts])

  const current = deck[index] || facts[0]

  const draw = useCallback(() => {
    if (!deck.length) return
    if (index + 1 >= deck.length) {
      setDeck(freshDeck(facts, current?.id))
      setIndex(0)
      return
    }
    setIndex(index + 1)
  }, [deck, index, facts, current])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== ' ' && event.key !== 'Enter') return
      if (event.target.closest?.('button, input, textarea, a')) return
      event.preventDefault()
      draw()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [draw])

  return (
    <section className="house-hallway hallway-odds">
      <div className="container hallway-inner no-kicker">
        <h1 className="hallway-title">
          <button
            type="button"
            className="hallway-title-egg"
            onClick={() => openEasterEgg('Junk drawer. Organized by affection.')}
          >
            Odds
          </button>
        </h1>
        <p className="hallway-subtitle odds-subtitle">Things that didn’t get their own room.</p>
        <button type="button" className="odds-draw" onClick={draw}>
          <span className="odds-fact" key={current?.id || current?.text}>
            {current?.text}
          </span>
          <span className="odds-hint">click for another</span>
        </button>
      </div>
    </section>
  )
}

export default Odds
