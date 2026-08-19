import { HouseHallway } from '../components/HouseHallway'
import { useMaze } from '../context/MazeContext'

function About() {
  const { getHallwayDoors } = useMaze()
  const doors = getHallwayDoors('soul')

  return (
    <HouseHallway
      wingId="soul"
      doors={doors}
      kicker="Quieter. The lights are lower on purpose."
    />
  )
}

export default About
