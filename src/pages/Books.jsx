import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { useLiving } from '../lib/living'

function Books() {
  const books = useLiving('books')
  const { visible, showAll, toggle } = useCollection('books', books, 4)
  const [openId, setOpenId] = useState(null)
  const open = visible.find((b) => b.id === openId)

  return (
    <RoomShell roomId="books">
      <section className="section shelf-room">
        <div className="container">
          <p className="section-subtitle">Click a spine to pull it off the shelf.</p>
          <ShowAllButton label="books" showAll={showAll} onToggle={toggle} />
          <div className="bookshelf">
            {visible.map((book) => (
              <button
                key={book.id}
                type="button"
                className={`book-spine ${openId === book.id ? 'is-open' : ''} ${book.nightstand ? 'is-nightstand' : ''}`}
                style={{ '--spine': book.spine }}
                onClick={() => setOpenId(openId === book.id ? null : book.id)}
              >
                <span className="book-spine-title">{book.title}</span>
                <span className="book-spine-author">{book.author}</span>
              </button>
            ))}
          </div>

          {open && (
            <article className="book-open">
              <p className="book-open-kicker">{open.nightstand ? 'Still on the nightstand' : 'Pulled from the shelf'}</p>
              <h2>{open.title}</h2>
              <p className="book-open-author">{open.author}</p>
              <p>{open.why}</p>
              <blockquote>{open.line}</blockquote>
            </article>
          )}
        </div>
      </section>
    </RoomShell>
  )
}

export default Books
