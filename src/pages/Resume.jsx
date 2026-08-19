import ViewToggle from '../components/ViewToggle'
import { contact, education, hireIntro, leadership, skills } from '../data/resume'
import { experience } from '../data/experience'
import { playground } from '../data/playground'
import { research } from '../data/research'

const resumeRoles = experience.filter((role) => role.onResume !== false)
const resumeProjects = playground.filter((p) => p.onResume)

function Resume() {
  return (
    <div className="resume-page">
      <ViewToggle />
      <article className="resume">
        <header className="resume-header">
          <h1>Nishka Awasthi</h1>
          <p className="resume-now">
            Currently {hireIntro.availability}. Updated {hireIntro.updated}.
          </p>
          <p className="resume-summary">{hireIntro.summary}</p>
          <p className="resume-focus">
            <span>Focus.</span> {hireIntro.focus}
          </p>
          <p className="resume-contact-one">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </header>

        <section className="resume-section">
          <h2>Education</h2>
          <div className="resume-item">
            <div className="resume-item-top">
              <h3>{education.school}</h3>
              <span>{education.when}</span>
            </div>
            <p>
              {education.degree} · {education.extras} · GPA {education.gpa}
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          {resumeRoles.map((role) => (
            <div key={role.id} className="resume-item">
              <div className="resume-item-top">
                <h3>
                  {role.title} — {role.role}
                </h3>
                <span>{role.when}</span>
              </div>
              <ul>
                {role.hire.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Projects</h2>
          {resumeProjects.map((project) => (
            <div key={project.id} className="resume-item">
              <div className="resume-item-top">
                <h3>{project.title}</h3>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.linkLabel}
                  </a>
                )}
              </div>
              <p>{project.hire}</p>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Research</h2>
          {research.map((item) => (
            <div key={item.id} className="resume-item">
              <div className="resume-item-top">
                <h3>{item.title}</h3>
                <span>{item.when}</span>
              </div>
              <p>
                {item.place}. {item.hire.achievements}
              </p>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Leadership</h2>
          {leadership.map((item) => (
            <div key={item.id} className="resume-item">
              <div className="resume-item-top">
                <h3>
                  {item.title} — {item.org}
                </h3>
                <span>{item.when}</span>
              </div>
              <ul>
                {item.hire.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          {skills.map((group) => (
            <p key={group.label} className="resume-skills">
              <strong>{group.label}:</strong> {group.items}
            </p>
          ))}
        </section>
      </article>
    </div>
  )
}

export default Resume
