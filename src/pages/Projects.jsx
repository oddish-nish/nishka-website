import { HouseHallway } from '../components/HouseHallway'
import ViewToggle from '../components/ViewToggle'
import { useMaze } from '../context/MazeContext'
import { useViewMode } from '../context/ViewModeContext'
import Resume from './Resume'

function Projects() {
  const { getHallwayDoors } = useMaze()
  const { isHiring } = useViewMode()
  const doors = getHallwayDoors('work')

  if (isHiring) {
    return <Resume />
  }

  return (
    <HouseHallway
      wingId="work"
      doors={doors}
      kicker="A workshop behind glass."
      lead={<ViewToggle />}
    />
  )
}

export default Projects
