import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BOOK_SPINES,
  QUOTE_FLAVORS,
  addItem,
  isStudioUnlocked,
  lockStudio,
  persistCollection,
  removeItem,
  uniqueId,
  unlockStudio,
  updateItem,
  uploadPhotoFile,
  useLiving,
} from '../lib/living'

const TABS = [
  { id: 'poems', label: 'poems' },
  { id: 'quotes', label: 'quotes' },
  { id: 'books', label: 'books' },
  { id: 'photos', label: 'photos' },
]

function emptyPoem() {
  return { title: '', body: '' }
}

function emptyQuote() {
  return { text: '', author: '', flavor: 'love' }
}

function emptyBook() {
  return {
    title: '',
    author: '',
    why: '',
    line: '',
    nightstand: true,
    spine: BOOK_SPINES[0],
  }
}

function poemBody(lines) {
  return (lines || []).join('\n')
}

function poemLines(body) {
  return body.replace(/\r\n/g, '\n').split('\n')
}

function Studio() {
  const [unlocked, setUnlocked] = useState(() => isStudioUnlocked())
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('poems')
  const [status, setStatus] = useState('')
  const [editingId, setEditingId] = useState(null)

  const poems = useLiving('poems')
  const quotes = useLiving('quotes')
  const books = useLiving('books')
  const photos = useLiving('photos')
  const [dropping, setDropping] = useState(false)

  const [poemForm, setPoemForm] = useState(emptyPoem)
  const [quoteForm, setQuoteForm] = useState(emptyQuote)
  const [bookForm, setBookForm] = useState(emptyBook)

  const remember = async (name) => {
    const result = await persistCollection(name)
    setStatus(result.where === 'files'
      ? 'Saved into the site files. Commit when you want it live.'
      : 'Saved on this browser. Run the site locally to write it into the project.')
  }

  const resetForms = () => {
    setEditingId(null)
    setPoemForm(emptyPoem())
    setQuoteForm(emptyQuote())
    setBookForm(emptyBook())
  }

  const handleUnlock = (event) => {
    event.preventDefault()
    if (!unlockStudio(password)) {
      setError('not quite')
      return
    }
    setError('')
    setUnlocked(true)
  }

  const handleLock = () => {
    lockStudio()
    setUnlocked(false)
    setPassword('')
    resetForms()
  }

  const savePoem = async (event) => {
    event.preventDefault()
    if (!poemForm.title.trim() || !poemForm.body.trim()) return
    const lines = poemLines(poemForm.body)
    if (editingId) {
      updateItem('poems', editingId, { title: poemForm.title.trim(), lines })
    } else {
      addItem('poems', {
        id: uniqueId('poems', poemForm.title),
        title: poemForm.title.trim(),
        lines,
      })
    }
    resetForms()
    await remember('poems')
  }

  const saveQuote = async (event) => {
    event.preventDefault()
    if (!quoteForm.text.trim()) return
    const patch = {
      text: quoteForm.text.trim(),
      author: quoteForm.author.trim() || 'Unknown',
      flavor: quoteForm.flavor,
    }
    if (editingId) {
      updateItem('quotes', editingId, patch)
    } else {
      addItem('quotes', { id: uniqueId('quotes', quoteForm.text), ...patch })
    }
    resetForms()
    await remember('quotes')
  }

  const saveBook = async (event) => {
    event.preventDefault()
    if (!bookForm.title.trim() || !bookForm.author.trim()) return
    const patch = {
      title: bookForm.title.trim(),
      author: bookForm.author.trim(),
      why: bookForm.why.trim(),
      line: bookForm.line.trim(),
      nightstand: Boolean(bookForm.nightstand),
      spine: bookForm.spine,
    }
    if (editingId) {
      updateItem('books', editingId, patch)
    } else {
      addItem('books', { id: uniqueId('books', bookForm.title), ...patch })
    }
    resetForms()
    await remember('books')
  }

  const editPoem = (poem) => {
    setTab('poems')
    setEditingId(poem.id)
    setPoemForm({ title: poem.title, body: poemBody(poem.lines) })
  }

  const editQuote = (quote) => {
    setTab('quotes')
    setEditingId(quote.id)
    setQuoteForm({ text: quote.text, author: quote.author, flavor: quote.flavor })
  }

  const editBook = (book) => {
    setTab('books')
    setEditingId(book.id)
    setBookForm({
      title: book.title,
      author: book.author,
      why: book.why,
      line: book.line,
      nightstand: book.nightstand,
      spine: book.spine,
    })
  }

  const remove = async (name, id) => {
    if (editingId === id) resetForms()
    removeItem(name, id)
    await remember(name)
  }

  const addPhotos = async (fileList) => {
    const files = [...fileList].filter((file) => file.type.startsWith('image/'))
    if (!files.length) return
    setStatus('Adding photos…')
    for (const file of files) {
      const uploaded = await uploadPhotoFile(file)
      addItem('photos', {
        id: uniqueId('photos', `${file.name}-${file.size}`),
        src: uploaded.src,
        caption: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
        onHome: true,
        inFrames: true,
      })
    }
    await remember('photos')
  }

  if (!unlocked) {
    return (
      <main className="studio">
        <form className="studio-gate" onSubmit={handleUnlock}>
          <p className="studio-kicker">backstage</p>
          <h1>Is it you?</h1>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="the quiet word"
          />
          {error && <p className="studio-error">{error}</p>}
          <button type="submit">come in</button>
          <Link to="/" className="studio-leave">never mind</Link>
        </form>
      </main>
    )
  }

  return (
    <main className="studio">
      <header className="studio-top">
        <div>
          <p className="studio-kicker">the desk</p>
          <h1>Add things. Change things.</h1>
        </div>
        <div className="studio-top-actions">
          <Link to="/">back to the house</Link>
          <button type="button" className="studio-lock" onClick={handleLock}>lock</button>
        </div>
      </header>

      {status && <p className="studio-status">{status}</p>}

      <nav className="studio-tabs">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? 'is-on' : ''}
            onClick={() => {
              setTab(item.id)
              resetForms()
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === 'poems' && (
        <section className="studio-panel">
          <form className="studio-form" onSubmit={savePoem}>
            <h2>{editingId ? 'Edit poem' : 'New poem'}</h2>
            <label>
              Title
              <input value={poemForm.title} onChange={(e) => setPoemForm({ ...poemForm, title: e.target.value })} />
            </label>
            <label>
              Poem
              <textarea
                rows={12}
                value={poemForm.body}
                onChange={(e) => setPoemForm({ ...poemForm, body: e.target.value })}
                placeholder="line&#10;line&#10;&#10;blank line for a breath"
              />
            </label>
            <div className="studio-form-actions">
              <button type="submit">{editingId ? 'save changes' : 'add poem'}</button>
              {editingId && <button type="button" className="studio-ghost" onClick={resetForms}>cancel</button>}
            </div>
          </form>
          <ul className="studio-list">
            {poems.map((poem) => (
              <li key={poem.id}>
                <span>{poem.title}</span>
                <span>
                  <button type="button" onClick={() => editPoem(poem)}>edit</button>
                  <button type="button" onClick={() => remove('poems', poem.id)}>remove</button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === 'quotes' && (
        <section className="studio-panel">
          <form className="studio-form" onSubmit={saveQuote}>
            <h2>{editingId ? 'Edit quote' : 'New quote'}</h2>
            <label>
              Quote
              <textarea rows={4} value={quoteForm.text} onChange={(e) => setQuoteForm({ ...quoteForm, text: e.target.value })} />
            </label>
            <label>
              Who said it
              <input value={quoteForm.author} onChange={(e) => setQuoteForm({ ...quoteForm, author: e.target.value })} />
            </label>
            <label>
              Flavor
              <select value={quoteForm.flavor} onChange={(e) => setQuoteForm({ ...quoteForm, flavor: e.target.value })}>
                {QUOTE_FLAVORS.map((flavor) => (
                  <option key={flavor} value={flavor}>{flavor}</option>
                ))}
              </select>
            </label>
            <div className="studio-form-actions">
              <button type="submit">{editingId ? 'save changes' : 'add quote'}</button>
              {editingId && <button type="button" className="studio-ghost" onClick={resetForms}>cancel</button>}
            </div>
          </form>
          <ul className="studio-list">
            {quotes.map((quote) => (
              <li key={quote.id}>
                <span>{quote.text}</span>
                <span>
                  <button type="button" onClick={() => editQuote(quote)}>edit</button>
                  <button type="button" onClick={() => remove('quotes', quote.id)}>remove</button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === 'books' && (
        <section className="studio-panel">
          <form className="studio-form" onSubmit={saveBook}>
            <h2>{editingId ? 'Edit book' : 'New book'}</h2>
            <label>
              Title
              <input value={bookForm.title} onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })} />
            </label>
            <label>
              Author
              <input value={bookForm.author} onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} />
            </label>
            <label>
              Why it stayed
              <textarea rows={3} value={bookForm.why} onChange={(e) => setBookForm({ ...bookForm, why: e.target.value })} />
            </label>
            <label>
              A line I keep
              <input value={bookForm.line} onChange={(e) => setBookForm({ ...bookForm, line: e.target.value })} />
            </label>
            <label className="studio-check">
              <input
                type="checkbox"
                checked={bookForm.nightstand}
                onChange={(e) => setBookForm({ ...bookForm, nightstand: e.target.checked })}
              />
              still on the nightstand
            </label>
            <label>
              Spine
              <input type="color" value={bookForm.spine} onChange={(e) => setBookForm({ ...bookForm, spine: e.target.value })} />
            </label>
            <div className="studio-form-actions">
              <button type="submit">{editingId ? 'save changes' : 'add book'}</button>
              {editingId && <button type="button" className="studio-ghost" onClick={resetForms}>cancel</button>}
            </div>
          </form>
          <ul className="studio-list">
            {books.map((book) => (
              <li key={book.id}>
                <span>
                  {book.title}
                  {book.nightstand ? ' · nightstand' : ''}
                </span>
                <span>
                  <button type="button" onClick={() => editBook(book)}>edit</button>
                  <button type="button" onClick={() => remove('books', book.id)}>remove</button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === 'photos' && (
        <section className="studio-panel studio-panel-photos">
          <label
            className={`studio-drop ${dropping ? 'is-over' : ''}`}
            onDragOver={(e) => {
              e.preventDefault()
              setDropping(true)
            }}
            onDragLeave={() => setDropping(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDropping(false)
              addPhotos(e.dataTransfer.files)
            }}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                addPhotos(e.target.files)
                e.target.value = ''
              }}
            />
            Drop photos here, or click to choose.
          </label>
          <p className="studio-hint">They land on the home collage and in Life in frames. Uncheck either if you want them quieter.</p>
          <ul className="studio-photo-grid">
            {photos.map((photo) => (
              <li key={photo.id}>
                <img src={photo.src} alt="" />
                <input
                  value={photo.caption || ''}
                  onChange={(e) => updateItem('photos', photo.id, { caption: e.target.value })}
                  onBlur={() => remember('photos')}
                  placeholder="a caption, if you want"
                />
                <label className="studio-check">
                  <input
                    type="checkbox"
                    checked={photo.onHome !== false}
                    onChange={(e) => {
                      updateItem('photos', photo.id, { onHome: e.target.checked })
                      remember('photos')
                    }}
                  />
                  home
                </label>
                <label className="studio-check">
                  <input
                    type="checkbox"
                    checked={photo.inFrames !== false}
                    onChange={(e) => {
                      updateItem('photos', photo.id, { inFrames: e.target.checked })
                      remember('photos')
                    }}
                  />
                  frames
                </label>
                <button type="button" onClick={() => remove('photos', photo.id)}>remove</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default Studio
