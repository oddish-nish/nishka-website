import { useState, useEffect } from 'react'

const messages = [
  "You're curious. I like that. Keep clicking!",
  "Most people don't click this far.",
  "If you found this, we'd probably get along.",
  "okay, enough clicking. Send me a message: (408) 712-1844"
]

export function openEasterEgg(message, kind = 'default') {
  window.dispatchEvent(new CustomEvent('nishka-easter-egg', { detail: { message, kind } }))
}

function EasterEggModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [kind, setKind] = useState('default')

  const showEgg = (nextMessage, nextKind = 'default') => {
    setMessage(nextMessage)
    setKind(nextKind)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  useEffect(() => {
    const onEgg = (event) => {
      const detail = event.detail
      if (!detail?.message) return
      showEgg(detail.message, detail.kind || 'default')
    }

    window.addEventListener('nishka-easter-egg', onEgg)
    return () => window.removeEventListener('nishka-easter-egg', onEgg)
  }, [])

  useEffect(() => {
    const navLogo = document.querySelector('.nav-logo')
    if (!navLogo) return

    let clickCount = 0
    let lastClickTime = 0
    const clickResetTime = 3000
    const minClicks = 5
    const maxClicks = 7

    const handleClick = (e) => {
      const currentTime = Date.now()
      
      if (currentTime - lastClickTime > clickResetTime) {
        clickCount = 0
      }
      
      clickCount++
      lastClickTime = currentTime

      if (clickCount >= minClicks && clickCount <= maxClicks) {
        e.preventDefault()
        e.stopPropagation()
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        showEgg(randomMessage)
        clickCount = 0
      } else if (clickCount > maxClicks) {
        clickCount = 0
      }
    }

    navLogo.addEventListener('click', handleClick)

    return () => {
      navLogo.removeEventListener('click', handleClick)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    const handleClickOutside = (e) => {
      if (isOpen && e.target.classList.contains('easter-egg-modal')) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className={`easter-egg-modal ${isOpen ? 'active' : ''}`} id="easter-egg-modal">
      <div className="easter-egg-content">
        <p className={`easter-egg-message ${kind === 'brain' ? 'is-brain-map' : ''}`} id="easter-egg-message">{message}</p>
        <button className="easter-egg-close" id="easter-egg-close" onClick={closeModal} aria-label="Close">×</button>
      </div>
    </div>
  )
}

export default EasterEggModal


