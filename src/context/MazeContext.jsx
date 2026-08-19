import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { ROOMS, WINGS } from '../data/rooms'
import { hashString, mulberry32, sample } from '../lib/rng'

const STORAGE_KEY = 'nishka-visit-seed'
const SEEN_KEY = 'nishka-visit-seen'

function createSeed() {
  return (Math.floor(Math.random() * 2 ** 31) ^ Date.now()) >>> 0
}

function readSeed() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) return Number(stored) >>> 0
  } catch {
    /* ignore */
  }
  const seed = createSeed()
  try {
    sessionStorage.setItem(STORAGE_KEY, String(seed))
  } catch {
    /* ignore */
  }
  return seed
}

function readSeen() {
  try {
    const stored = sessionStorage.getItem(SEEN_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const MazeContext = createContext(null)

export function MazeProvider({ children }) {
  const [seed] = useState(() => (typeof window === 'undefined' ? 1 : readSeed()))
  const [seen, setSeen] = useState(() => (typeof window === 'undefined' ? [] : readSeen()))

  const rngFor = useCallback(
    (salt) => mulberry32(hashString(`${seed}:${salt}`)),
    [seed]
  )

  const markSeen = useCallback((id) => {
    setSeen((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      try {
        sessionStorage.setItem(SEEN_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const sampleItems = useCallback(
    (key, items, count, { all = false } = {}) => {
      if (all || !items?.length) return items || []
      return sample(items, count, rngFor(`items:${key}`))
    },
    [rngFor]
  )

  const getHallwayDoors = useCallback((wingId) => {
    const wing = WINGS[wingId]
    if (!wing) return []
    return wing.rooms.map((id) => ROOMS[id]).filter(Boolean)
  }, [])

  const getExits = useCallback((roomId) => {
    const room = ROOMS[roomId]
    if (!room) return []
    return room.connections.slice(0, 2).map((id) => ROOMS[id]).filter(Boolean)
  }, [])

  const value = useMemo(
    () => ({
      seed,
      seen,
      markSeen,
      sampleItems,
      getHallwayDoors,
      getExits,
    }),
    [seed, seen, markSeen, sampleItems, getHallwayDoors, getExits]
  )

  return <MazeContext.Provider value={value}>{children}</MazeContext.Provider>
}

export function useMaze() {
  const ctx = useContext(MazeContext)
  if (!ctx) throw new Error('useMaze must be used inside MazeProvider')
  return ctx
}
