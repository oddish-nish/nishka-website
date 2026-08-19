import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HouseHallway } from '../components/HouseHallway'
import ViewToggle from '../components/ViewToggle'
import { useMaze } from '../context/MazeContext'
import { useViewMode } from '../context/ViewModeContext'
import Resume from './Resume'

function Projects() {
  const { getHallwayDoors } = useMaze()
  const { isHiring, setViewMode } = useViewMode()
  const [params, setParams] = useSearchParams()
  const doors = getHallwayDoors('work')

  useEffect(() => {
    if (!params.has('hire')) return
    setViewMode('hiring')
    const next = new URLSearchParams(params)
    next.delete('hire')
    setParams(next, { replace: true })
  }, [params, setParams, setViewMode])

  if (isHiring) {
    return <Resume />
  }

  return (
    <HouseHallway
      wingId="work"
      doors={doors}
      lead={<ViewToggle />}
    />
  )
}

export default Projects
