import { HouseHallway } from '../components/HouseHallway'
import { useMaze } from '../context/MazeContext'

function Creative() {
  const { getHallwayDoors } = useMaze()
  const doors = getHallwayDoors('heart')

  return <HouseHallway wingId="heart" doors={doors} />
}

export default Creative
