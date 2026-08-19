import { Link, useLocation } from 'react-router-dom'
import { openEasterEgg } from './EasterEggModal'

function Footer() {
  const { pathname } = useLocation()

  if (pathname === '/') return null

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-ending">
          This is not the end of the house.
          <br />
          <button
            type="button"
            className="quiet-egg"
            onClick={() =>
              openEasterEgg('Some of the best conversations in this house happen at a window.')
            }
          >
            Just a pause by a window.
          </button>
        </p>
        <Link to="/" className="footer-return-btn">Return to the atrium</Link>
      </div>
    </footer>
  )
}

export default Footer
