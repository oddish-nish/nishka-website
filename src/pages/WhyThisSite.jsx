import { Link } from 'react-router-dom'
import { openEasterEgg } from '../components/EasterEggModal'

function WhyThisSite() {
  return (
    <>
      <section className="section why-site-section">
        <div className="container">
          <div className="why-site-content">
            <p className="why-site-kicker">
              <button
                type="button"
                className="quiet-egg"
                onClick={() => openEasterEgg('The leftover drawer. On purpose.')}
              >
                other
              </button>
            </p>
            <p className="why-site-opening">
              This site wasn't designed to impress.<br />It was designed to reflect how I think.
            </p>
            <p className="why-site-note">
              <button
                type="button"
                className="quiet-egg"
                onClick={() => openEasterEgg('You already were. That’s why you’re still here.')}
              >
                Glad you explored a little deeper.
              </button>
            </p>

            <div className="why-site-section-block">
              <h2 className="why-site-heading">Why This Layout</h2>
              <p className="why-site-text">I chose a structure that mirrors how I move through the world.</p>
              <p className="why-site-text">
                I think first.<br />
                I build next.<br />
                I feel deeply.<br />
                And I try to live intentionally.
              </p>
              <p className="why-site-text">These sections aren't categories. They're layers.</p>
            </div>
            
            <div className="why-site-section-block">
              <h2 className="why-site-heading">Not a Portfolio</h2>
              <p className="why-site-text">I didn't want this to feel like a template.</p>
              <p className="why-site-text">I wanted something quiet, readable, and personal — something that would still feel right a few years from now.</p>
            </div>
            
            <div className="why-site-section-block">
              <h2 className="why-site-heading">Simplicity & Clarity</h2>
              <p className="why-site-text">I care about clarity because confusion hides meaning.</p>
              <p className="why-site-text">Whether I'm building software or writing thoughts, I try to make things easy to understand.</p>
            </div>
            
            <div className="why-site-section-block">
              <h2 className="why-site-heading">Why Curiosity Drives the Design</h2>
              <p className="why-site-text">Curiosity is the throughline.</p>
              <p className="why-site-text">
                It's why the site unfolds instead of explaining everything at once.<br />
                It's why some things are hidden.<br />
                It's why nothing demands your attention.
              </p>
              <p className="why-site-text">I like spaces that invite exploration instead of instruction.</p>
            </div>
            
            <div className="why-site-closing">
              <p className="why-site-closing-text">If you found this page, you were probably curious.</p>
              <p className="why-site-closing-text">That's my favorite kind of person.</p>
              <p className="why-site-closing-text" style={{ marginTop: '1.5rem' }}>
                This site isn't finished.<br />
                Neither am I.
              </p>
              <p className="why-site-closing-text" style={{ marginTop: '1.5rem', fontStyle: 'italic' }}>
                Thanks for looking a little closer.{' '}
                <button
                  type="button"
                  className="quiet-egg"
                  onClick={() => openEasterEgg('You already are. That’s why you’re still here.')}
                >
                  Stay curious.
                </button>{' '}
                &lt;3
              </p>
            </div>
            <Link to="/studio" className="why-site-studio">studio</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default WhyThisSite


