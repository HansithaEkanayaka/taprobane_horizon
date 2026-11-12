import { useEffect, useState } from 'react'
import Icon from './Icon'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  // Show the button only after the visitor has scrolled down a bit.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gold text-navy-900 shadow-lg shadow-black/40 transition-all duration-300 hover:scale-110 hover:brightness-110 active:scale-95 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon name="arrowUp" className="h-5 w-5" />
    </button>
  )
}
