import { Link, useLocation } from 'react-router-dom'

function Footer() {
  const { pathname } = useLocation()

  if (pathname === '/') return null

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-ending">This is not the end of the house.<br />Just a pause by a window.</p>
        <Link to="/" className="footer-return-btn">Return to the atrium</Link>
      </div>
    </footer>
  )
}

export default Footer
