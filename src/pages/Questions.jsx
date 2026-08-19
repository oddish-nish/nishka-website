import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { useLiving } from '../lib/living'

function Questions() {
  const questions = useLiving('questions')
  const { visible, showAll, toggle } = useCollection('questions', questions, 5)
  const [index, setIndex] = useState(0)
  const [note, setNote] = useState(() => {
    try {
      return localStorage.getItem('nishka-question-note') || ''
    } catch {
      return ''
    }
  })

  const current = visible[index % Math.max(visible.length, 1)] || questions[0]

  const pull = () => {
    if (!visible.length) return
    setIndex((prev) => (prev + 1) % visible.length)
  }

  const saveNote = (value) => {
    setNote(value)
    try {
      localStorage.setItem('nishka-question-note', value)
    } catch {
      /* ignore */
    }
  }

  return (
    <RoomShell roomId="questions">
      <section className="section question-room">
        <div className="container">
          <p className="section-subtitle">These are a starting point. Not the end of the conversation.</p>
          <ShowAllButton label="questions" showAll={showAll} onToggle={toggle} />
          <button type="button" className="question-pull" onClick={pull}>
            <span className="question-pull-cord" />
            <span className="question-text">{current?.text}</span>
            <span className="question-hint">pull for another</span>
          </button>
          {showAll && (
            <ul className="question-index">
              {questions.map((q) => (
                <li key={q.id}>
                  <button type="button" onClick={() => setIndex(Math.max(visible.findIndex((item) => item.id === q.id), 0))}>
                    {q.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <label className="question-note">
            Sit with it, if you want. This stays on your machine.
            <textarea
              value={note}
              onChange={(e) => saveNote(e.target.value)}
              placeholder="a private note..."
              rows={4}
            />
          </label>
        </div>
      </section>
    </RoomShell>
  )
}

export default Questions
