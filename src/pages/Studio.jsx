import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BOOK_SPINES,
  PLANT_POTS,
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

const TAB_GROUPS = [
  {
    label: 'heart',
    tabs: [
      { id: 'poems', label: 'poems' },
      { id: 'quotes', label: 'quotes' },
      { id: 'plants', label: 'plants' },
      { id: 'photos', label: 'photos' },
    ],
  },
  {
    label: 'brain',
    tabs: [
      { id: 'questions', label: 'thoughts' },
      { id: 'philosophies', label: 'theories' },
      { id: 'books', label: 'books' },
      { id: 'learning', label: 'rabbit holes' },
    ],
  },
  {
    label: 'odds',
    tabs: [{ id: 'facts', label: 'facts' }],
  },
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

function emptyPlant() {
  return {
    name: '',
    latin: '',
    pot: PLANT_POTS[0],
    why: '',
    ritual: '',
    confession: '',
  }
}

function emptyQuestion() {
  return { text: '' }
}

function emptyTheory() {
  return { title: '', preview: '', body: '' }
}

function emptyLearning() {
  return { title: '', note: '' }
}

function emptyFact() {
  return { text: '' }
}

function poemBody(lines) {
  return (lines || []).join('\n')
}

function poemLines(body) {
  return body.replace(/\r\n/g, '\n').split('\n')
}

function essayBody(paragraphs) {
  return (paragraphs || []).join('\n\n')
}

function essayParagraphs(body) {
  return body
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean)
}

function StudioList({ items, label, collection, onEdit, onRemove }) {
  return (
    <ul className="studio-list">
      {items.map((item) => (
        <li key={item.id}>
          <span>{label(item)}</span>
          <span>
            <button type="button" onClick={() => onEdit(item)}>edit</button>
            <button type="button" onClick={() => onRemove(collection, item.id)}>remove</button>
          </span>
        </li>
      ))}
    </ul>
  )
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
  const plants = useLiving('plants')
  const questions = useLiving('questions')
  const philosophies = useLiving('philosophies')
  const learning = useLiving('learning')
  const facts = useLiving('facts')
  const [dropping, setDropping] = useState(false)

  const [poemForm, setPoemForm] = useState(emptyPoem)
  const [quoteForm, setQuoteForm] = useState(emptyQuote)
  const [bookForm, setBookForm] = useState(emptyBook)
  const [plantForm, setPlantForm] = useState(emptyPlant)
  const [questionForm, setQuestionForm] = useState(emptyQuestion)
  const [theoryForm, setTheoryForm] = useState(emptyTheory)
  const [learningForm, setLearningForm] = useState(emptyLearning)
  const [factForm, setFactForm] = useState(emptyFact)

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
    setPlantForm(emptyPlant())
    setQuestionForm(emptyQuestion())
    setTheoryForm(emptyTheory())
    setLearningForm(emptyLearning())
    setFactForm(emptyFact())
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

  const saveNamed = async (event, collection, patch, titleForId) => {
    event.preventDefault()
    if (editingId) {
      updateItem(collection, editingId, patch)
    } else {
      addItem(collection, { id: uniqueId(collection, titleForId), ...patch })
    }
    resetForms()
    await remember(collection)
  }

  const savePoem = (event) => {
    event.preventDefault()
    if (!poemForm.title.trim() || !poemForm.body.trim()) return
    const lines = poemLines(poemForm.body)
    return saveNamed(event, 'poems', { title: poemForm.title.trim(), lines }, poemForm.title)
  }

  const saveQuote = (event) => {
    event.preventDefault()
    if (!quoteForm.text.trim()) return
    return saveNamed(event, 'quotes', {
      text: quoteForm.text.trim(),
      author: quoteForm.author.trim() || 'Unknown',
      flavor: quoteForm.flavor,
    }, quoteForm.text)
  }

  const saveBook = (event) => {
    event.preventDefault()
    if (!bookForm.title.trim() || !bookForm.author.trim()) return
    return saveNamed(event, 'books', {
      title: bookForm.title.trim(),
      author: bookForm.author.trim(),
      why: bookForm.why.trim(),
      line: bookForm.line.trim(),
      nightstand: Boolean(bookForm.nightstand),
      spine: bookForm.spine,
    }, bookForm.title)
  }

  const savePlant = (event) => {
    event.preventDefault()
    if (!plantForm.name.trim()) return
    return saveNamed(event, 'plants', {
      name: plantForm.name.trim(),
      latin: plantForm.latin.trim(),
      pot: plantForm.pot,
      why: plantForm.why.trim(),
      ritual: plantForm.ritual.trim(),
      confession: plantForm.confession.trim(),
    }, plantForm.name)
  }

  const saveQuestion = (event) => {
    event.preventDefault()
    if (!questionForm.text.trim()) return
    return saveNamed(event, 'questions', { text: questionForm.text.trim() }, questionForm.text)
  }

  const saveTheory = (event) => {
    event.preventDefault()
    if (!theoryForm.title.trim() || !theoryForm.body.trim()) return
    return saveNamed(event, 'philosophies', {
      title: theoryForm.title.trim(),
      preview: theoryForm.preview.trim(),
      paragraphs: essayParagraphs(theoryForm.body),
    }, theoryForm.title)
  }

  const saveLearning = (event) => {
    event.preventDefault()
    if (!learningForm.title.trim() || !learningForm.note.trim()) return
    return saveNamed(event, 'learning', {
      title: learningForm.title.trim(),
      note: learningForm.note.trim(),
    }, learningForm.title)
  }

  const saveFact = (event) => {
    event.preventDefault()
    if (!factForm.text.trim()) return
    return saveNamed(event, 'facts', { text: factForm.text.trim() }, factForm.text)
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

  const editPlant = (plant) => {
    setTab('plants')
    setEditingId(plant.id)
    setPlantForm({
      name: plant.name,
      latin: plant.latin || '',
      pot: plant.pot || PLANT_POTS[0],
      why: plant.why || '',
      ritual: plant.ritual || '',
      confession: plant.confession || '',
    })
  }

  const editQuestion = (question) => {
    setTab('questions')
    setEditingId(question.id)
    setQuestionForm({ text: question.text })
  }

  const editTheory = (essay) => {
    setTab('philosophies')
    setEditingId(essay.id)
    setTheoryForm({
      title: essay.title,
      preview: essay.preview || '',
      body: essayBody(essay.paragraphs),
    })
  }

  const editLearning = (item) => {
    setTab('learning')
    setEditingId(item.id)
    setLearningForm({ title: item.title, note: item.note || '' })
  }

  const editFact = (fact) => {
    setTab('facts')
    setEditingId(fact.id)
    setFactForm({ text: fact.text })
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
        {TAB_GROUPS.map((group) => (
          <div key={group.label} className="studio-tab-group">
            <span className="studio-tab-group-label">{group.label}</span>
            {group.tabs.map((item) => (
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
          </div>
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
          <StudioList items={poems} collection="poems" label={(item) => item.title} onEdit={editPoem} onRemove={remove} />
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
          <StudioList items={quotes} collection="quotes" label={(item) => item.text} onEdit={editQuote} onRemove={remove} />
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
          <StudioList
            items={books}
            collection="books"
            label={(item) => `${item.title}${item.nightstand ? ' · nightstand' : ''}`}
            onEdit={editBook}
            onRemove={remove}
          />
        </section>
      )}

      {tab === 'plants' && (
        <section className="studio-panel">
          <form className="studio-form" onSubmit={savePlant}>
            <h2>{editingId ? 'Edit plant' : 'New plant'}</h2>
            <label>
              Name
              <input value={plantForm.name} onChange={(e) => setPlantForm({ ...plantForm, name: e.target.value })} />
            </label>
            <label>
              Latin, if you know it
              <input value={plantForm.latin} onChange={(e) => setPlantForm({ ...plantForm, latin: e.target.value })} />
            </label>
            <label>
              Why you keep it
              <textarea rows={3} value={plantForm.why} onChange={(e) => setPlantForm({ ...plantForm, why: e.target.value })} />
            </label>
            <label>
              Ritual
              <textarea rows={2} value={plantForm.ritual} onChange={(e) => setPlantForm({ ...plantForm, ritual: e.target.value })} />
            </label>
            <label>
              Confession
              <textarea rows={2} value={plantForm.confession} onChange={(e) => setPlantForm({ ...plantForm, confession: e.target.value })} />
            </label>
            <label>
              Pot
              <input type="color" value={plantForm.pot} onChange={(e) => setPlantForm({ ...plantForm, pot: e.target.value })} />
            </label>
            <div className="studio-form-actions">
              <button type="submit">{editingId ? 'save changes' : 'add plant'}</button>
              {editingId && <button type="button" className="studio-ghost" onClick={resetForms}>cancel</button>}
            </div>
          </form>
          <StudioList items={plants} collection="plants" label={(item) => item.name} onEdit={editPlant} onRemove={remove} />
        </section>
      )}

      {tab === 'questions' && (
        <section className="studio-panel">
          <form className="studio-form" onSubmit={saveQuestion}>
            <h2>{editingId ? 'Edit thought' : 'New thought'}</h2>
            <label>
              A question you cannot leave alone
              <textarea rows={3} value={questionForm.text} onChange={(e) => setQuestionForm({ text: e.target.value })} />
            </label>
            <div className="studio-form-actions">
              <button type="submit">{editingId ? 'save changes' : 'add thought'}</button>
              {editingId && <button type="button" className="studio-ghost" onClick={resetForms}>cancel</button>}
            </div>
          </form>
          <StudioList items={questions} collection="questions" label={(item) => item.text} onEdit={editQuestion} onRemove={remove} />
        </section>
      )}

      {tab === 'philosophies' && (
        <section className="studio-panel">
          <form className="studio-form" onSubmit={saveTheory}>
            <h2>{editingId ? 'Edit theory' : 'New theory'}</h2>
            <label>
              Title
              <input value={theoryForm.title} onChange={(e) => setTheoryForm({ ...theoryForm, title: e.target.value })} />
            </label>
            <label>
              Opening line
              <input value={theoryForm.preview} onChange={(e) => setTheoryForm({ ...theoryForm, preview: e.target.value })} />
            </label>
            <label>
              The rest
              <textarea
                rows={12}
                value={theoryForm.body}
                onChange={(e) => setTheoryForm({ ...theoryForm, body: e.target.value })}
                placeholder="a paragraph&#10;&#10;another paragraph"
              />
            </label>
            <div className="studio-form-actions">
              <button type="submit">{editingId ? 'save changes' : 'add theory'}</button>
              {editingId && <button type="button" className="studio-ghost" onClick={resetForms}>cancel</button>}
            </div>
          </form>
          <StudioList items={philosophies} collection="philosophies" label={(item) => item.title} onEdit={editTheory} onRemove={remove} />
        </section>
      )}

      {tab === 'learning' && (
        <section className="studio-panel">
          <form className="studio-form" onSubmit={saveLearning}>
            <h2>{editingId ? 'Edit rabbit hole' : 'New rabbit hole'}</h2>
            <label>
              Title
              <input value={learningForm.title} onChange={(e) => setLearningForm({ ...learningForm, title: e.target.value })} />
            </label>
            <label>
              What you’re disappearing into
              <textarea rows={4} value={learningForm.note} onChange={(e) => setLearningForm({ ...learningForm, note: e.target.value })} />
            </label>
            <div className="studio-form-actions">
              <button type="submit">{editingId ? 'save changes' : 'add rabbit hole'}</button>
              {editingId && <button type="button" className="studio-ghost" onClick={resetForms}>cancel</button>}
            </div>
          </form>
          <StudioList items={learning} collection="learning" label={(item) => item.title} onEdit={editLearning} onRemove={remove} />
        </section>
      )}

      {tab === 'facts' && (
        <section className="studio-panel">
          <form className="studio-form" onSubmit={saveFact}>
            <h2>{editingId ? 'Edit fact' : 'New fact'}</h2>
            <label>
              Something true, and a little specific
              <textarea rows={4} value={factForm.text} onChange={(e) => setFactForm({ text: e.target.value })} />
            </label>
            <div className="studio-form-actions">
              <button type="submit">{editingId ? 'save changes' : 'add fact'}</button>
              {editingId && <button type="button" className="studio-ghost" onClick={resetForms}>cancel</button>}
            </div>
          </form>
          <StudioList items={facts} collection="facts" label={(item) => item.text} onEdit={editFact} onRemove={remove} />
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
