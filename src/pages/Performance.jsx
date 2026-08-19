import RoomShell from '../components/RoomShell'

function Performance() {
  return (
    <RoomShell roomId="performance" className="stage-shell">
      <section className="section stage-room">
        <div className="container">
          <div className="stage-lights" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="stage-copy">
            Singing, dancing, poetry readings — stage moments that made me feel alive.
          </p>
          <p className="section-subtitle">The lights are on. The set is still being built. Check back soon.</p>
        </div>
      </section>
    </RoomShell>
  )
}

export default Performance
