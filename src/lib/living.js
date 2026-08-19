import { useEffect, useState } from 'react'
import { poems as seedPoems } from '../data/poems'
import { quotes as seedQuotes } from '../data/quotes'
import { books as seedBooks } from '../data/books'
import { photos as seedPhotos } from '../data/photos'
import { plants as seedPlants } from '../data/plants'
import { questions as seedQuestions } from '../data/questions'
import { philosophies as seedPhilosophies } from '../data/philosophies'
import { learning as seedLearning } from '../data/learning'
import { facts as seedFacts } from '../data/facts'
import { stories as seedStories } from '../data/stories'

export const SEEDS = {
  poems: seedPoems,
  quotes: seedQuotes,
  books: seedBooks,
  photos: seedPhotos,
  plants: seedPlants,
  questions: seedQuestions,
  philosophies: seedPhilosophies,
  learning: seedLearning,
  facts: seedFacts,
  stories: seedStories,
}

export const QUOTE_FLAVORS = ['curiosity', 'growth', 'identity', 'courage', 'purpose', 'love', 'wisdom']

export const BOOK_SPINES = ['#3a2a24', '#6B5A7A', '#6B8B6B', '#A66B7D', '#C88B7A', '#5A7A8B', '#8BA68B', '#8B7A9A', '#C97A5A']

export const PLANT_POTS = ['#6B8B6B', '#8BA68B', '#5A6B5A', '#A66B7D', '#C88B7A', '#8B7A9A', '#6B9AB8', '#D4A87A']

const STORE_KEY = 'nishka-living'
const EVENT = 'nishka-living-change'
const AUTH_KEY = 'nishka-studio-auth'
const PASS_KEY = 'nishka-studio-key'

function emptyLayer() {
  return { added: [], updates: {}, removed: [] }
}

function readStore() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store))
  window.dispatchEvent(new Event(EVENT))
}

export function studioPassword() {
  return import.meta.env.VITE_STUDIO_KEY || 'oddish-nish'
}

export function isStudioUnlocked() {
  return typeof window !== 'undefined' && sessionStorage.getItem(AUTH_KEY) === '1'
}

export function unlockStudio(password) {
  if (password.trim() !== studioPassword()) return false
  sessionStorage.setItem(AUTH_KEY, '1')
  sessionStorage.setItem(PASS_KEY, password.trim())
  return true
}

export function lockStudio() {
  sessionStorage.removeItem(AUTH_KEY)
  sessionStorage.removeItem(PASS_KEY)
}

export function storedStudioPassword() {
  return sessionStorage.getItem(PASS_KEY) || ''
}

export function slugify(text) {
  const base = String(text || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
  return base || `item-${Date.now()}`
}

export function uniqueId(name, title) {
  const used = new Set(getCollection(name).map((item) => item.id))
  let id = slugify(title)
  let n = 2
  while (used.has(id)) {
    id = `${slugify(title)}-${n++}`
  }
  return id
}

export function getCollection(name) {
  const seed = SEEDS[name] || []
  const layer = readStore()[name] || emptyLayer()
  const removed = new Set(layer.removed)
  const seedIds = new Set(seed.map((item) => item.id))

  const rest = seed
    .filter((item) => !removed.has(item.id))
    .map((item) => ({ ...item, ...(layer.updates[item.id] || {}) }))

  const head = layer.added
    .filter((item) => !removed.has(item.id) && !seedIds.has(item.id))
    .map((item) => ({ ...item, ...(layer.updates[item.id] || {}) }))

  return [...head, ...rest]
}

export function addItem(name, item) {
  const store = readStore()
  const layer = store[name] || emptyLayer()
  layer.added = [...layer.added, item]
  store[name] = layer
  writeStore(store)
}

export function updateItem(name, id, patch) {
  const store = readStore()
  const layer = store[name] || emptyLayer()
  const addedIdx = layer.added.findIndex((item) => item.id === id)
  if (addedIdx >= 0) {
    layer.added[addedIdx] = { ...layer.added[addedIdx], ...patch }
  } else {
    layer.updates[id] = { ...(layer.updates[id] || {}), ...patch }
  }
  store[name] = layer
  writeStore(store)
}

export function removeItem(name, id) {
  const store = readStore()
  const layer = store[name] || emptyLayer()
  layer.added = layer.added.filter((item) => item.id !== id)
  delete layer.updates[id]
  if (!layer.removed.includes(id)) layer.removed.push(id)
  store[name] = layer
  writeStore(store)
}

export function clearLayer(name) {
  const store = readStore()
  delete store[name]
  writeStore(store)
}

export async function persistCollection(name) {
  const items = getCollection(name)
  try {
    const res = await fetch('/api/studio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: storedStudioPassword() || studioPassword(),
        collection: name,
        items,
      }),
    })
    if (!res.ok) return { ok: true, where: 'browser' }
    clearLayer(name)
    return { ok: true, where: 'files' }
  } catch {
    return { ok: true, where: 'browser' }
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      const comma = result.indexOf(',')
      resolve(comma >= 0 ? result.slice(comma + 1) : result)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export async function uploadPhotoFile(file) {
  const data = await fileToBase64(file)
  try {
    const res = await fetch('/api/studio/photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: storedStudioPassword() || studioPassword(),
        filename: file.name,
        data,
      }),
    })
    if (res.ok) {
      const body = await res.json()
      if (body.src) return { src: body.src, where: 'files' }
    }
  } catch {
    /* fall through */
  }
  return { src: `data:${file.type};base64,${data}`, where: 'browser' }
}

export function useLiving(name) {
  const [items, setItems] = useState(() => getCollection(name))

  useEffect(() => {
    const sync = () => setItems(getCollection(name))
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [name])

  return items
}
