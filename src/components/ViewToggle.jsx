import { useViewMode } from '../context/ViewModeContext'

function ViewToggle() {
  const { viewMode, setViewMode, toggleCount } = useViewMode()

  return (
    <section className="view-toggle-section">
      <div className="container">
        <div className="view-toggle-container">
          <p className="view-toggle-label">Viewing this as:</p>
          <div className="view-toggle">
            <label className="view-toggle-option">
              <input
                type="radio"
                name="view-mode"
                value="exploring"
                checked={viewMode === 'exploring'}
                onChange={() => setViewMode('exploring')}
              />
              <span className="view-toggle-text">Exploring</span>
            </label>
            <label className="view-toggle-option">
              <input
                type="radio"
                name="view-mode"
                value="hiring"
                checked={viewMode === 'hiring'}
                onChange={() => setViewMode('hiring')}
              />
              <span className="view-toggle-text">Hiring</span>
            </label>
          </div>
        </div>
        {toggleCount >= 3 && (
          <div className="toggle-easter-egg">
            <p>You are allowed to be both, you know. I am always down to collaborate with a fellow curious mind.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ViewToggle
