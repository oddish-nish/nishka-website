import { useMemo, useState } from 'react'
import { useMaze } from '../context/MazeContext'

export function ShowAllButton({ label, showAll, onToggle }) {
  return (
    <button type="button" className={`show-all-btn ${showAll ? 'is-on' : ''}`} onClick={onToggle}>
      {showAll ? 'show fewer' : `all ${label}`}
    </button>
  )
}

export function useCollection(key, items, previewCount) {
  const { sampleItems, seed } = useMaze()
  const [showAll, setShowAll] = useState(false)
  const visible = useMemo(
    () => sampleItems(key, items, previewCount, { all: showAll }),
    [sampleItems, seed, key, items, previewCount, showAll]
  )

  return {
    visible,
    showAll,
    toggle: () => setShowAll((prev) => !prev),
    total: items.length,
  }
}
