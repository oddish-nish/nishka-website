import { HouseHallway } from '../components/HouseHallway'
import { useMaze } from '../context/MazeContext'

function Curiosity() {
  const { getHallwayDoors } = useMaze()
  const doors = getHallwayDoors('brain')

  return <HouseHallway wingId="brain" doors={doors} />
}

export default Curiosity
