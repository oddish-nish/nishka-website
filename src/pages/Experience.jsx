import { useState } from 'react'
import RoomShell from '../components/RoomShell'
import ViewToggle from '../components/ViewToggle'
import { ShowAllButton, useCollection } from '../components/ShowAllButton'
import { useViewMode } from '../context/ViewModeContext'
import { experience } from '../data/experience'

function Experience() {
  const { isHiring } = useViewMode()
  const { visible, showAll, toggle } = useCollection('experience', experience, 2)
  const roles = isHiring
    ? experience.filter((role) => role.onResume !== false)
    : showAll
      ? experience
      : visible
  const [openId, setOpenId] = useState(null)

  return (
    <RoomShell roomId="experience">
      <ViewToggle />
      <section className="section timeline-room">
        <div className="container">
          <p className="section-subtitle">Click a year to open a role.</p>
          {!isHiring && <ShowAllButton label="roles" showAll={showAll} onToggle={toggle} />}
          <div className="timeline">
            {roles.map((role) => {
              const open = openId === role.id
              const copy = isHiring ? role.hire : role.explore
              return (
                <article
                  key={role.id}
                  className={`timeline-node ${open ? 'is-open' : ''}`}
                  onClick={() => setOpenId(open ? null : role.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenId(open ? null : role.id)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <span className="timeline-year">{role.year}</span>
                  <span className="timeline-title">{role.title}</span>
                  <span className="timeline-meta">
                    {role.role} · {role.when}
                  </span>
                  <span className="timeline-preview">{copy.preview}</span>
                  {open && (
                    <div className="timeline-expanded">
                      {isHiring ? (
                        <>
                          <ul>
                            {role.hire.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                          <p className="timeline-tech">{role.hire.tech}</p>
                        </>
                      ) : (
                        <>
                          <p>{role.explore.why}</p>
                          <p>{role.explore.learned}</p>
                          <p>{role.explore.thinking}</p>
                        </>
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </RoomShell>
  )
}

export default Experience
