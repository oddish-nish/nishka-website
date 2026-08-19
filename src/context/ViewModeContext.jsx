import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'nishka-view-mode'
const ViewModeContext = createContext(null)

function readMode() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) || 'exploring'
  } catch {
    return 'exploring'
  }
}

export function ViewModeProvider({ children }) {
  const [viewMode, setViewModeState] = useState(() =>
    typeof window === 'undefined' ? 'exploring' : readMode()
  )
  const [toggleCount, setToggleCount] = useState(0)

  useEffect(() => {
    document.body.classList.toggle('hire-mode', viewMode === 'hiring')
    document.body.classList.toggle('explore-mode', viewMode === 'exploring')
    return () => {
      document.body.classList.remove('hire-mode', 'explore-mode')
    }
  }, [viewMode])

  const setViewMode = useCallback((mode) => {
    setViewModeState((prev) => {
      if (prev !== mode) setToggleCount((c) => c + 1)
      return mode
    })
    try {
      sessionStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({
      viewMode,
      setViewMode,
      isHiring: viewMode === 'hiring',
      toggleCount,
    }),
    [viewMode, setViewMode, toggleCount]
  )

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext)
  if (!ctx) throw new Error('useViewMode must be used inside ViewModeProvider')
  return ctx
}
