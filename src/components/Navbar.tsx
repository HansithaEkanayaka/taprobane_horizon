import { useEffect, useState } from 'react'
import Icon from './Icon'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Rooms & Suites', href: '#rooms' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  bookingCount: number
  onOpenBookings: () => void
}

export default function Navbar({ bookingCount, onOpenBookings }: NavbarProps) {
  const [open, setOpen] = useState(false)

  // Close the mobile menu with Escape, and when the screen grows to desktop size.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-navy-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <a href="#home" className="whitespace-nowrap font-serif text-2xl font-bold tracking-wide text-white">
          Taprobane <span className="text-gold">Horizon</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-8 whitespace-nowrap text-sm font-medium text-white/80 lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenBookings}
            aria-label="My Bookings"
            className="relative flex items-center gap-2 rounded-full p-2 text-sm font-medium text-white/80 transition-colors hover:text-gold"
          >
            <Icon name="calendar" className="h-5 w-5" />
            <span className="hidden xl:inline">My Bookings</span>
            {bookingCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-navy-900 xl:static xl:h-5 xl:min-w-5 xl:text-xs">
                {bookingCount}
              </span>
            )}
          </button>
          <a
            href="#rooms"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-gold to-[#dfc385] text-navy-900 font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-gold/10 hover:shadow-gold/25 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Book Now</span>
            <Icon name="arrow" className="h-4 w-4" />
          </a>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            aria-expanded={open}
            className="lg:hidden text-white text-2xl focus:outline-none p-1"
          >
            <Icon name={open ? 'x' : 'menu'} className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <ul className="space-y-3 border-t border-white/10 bg-navy-900 px-6 py-6 lg:hidden shadow-2xl animate-fadeIn">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-medium text-white/90 hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false)
                onOpenBookings()
              }}
              className="flex w-full items-center gap-2 py-2 text-left text-base font-medium text-white/90 transition-colors hover:text-gold"
            >
              <span>My Bookings{bookingCount > 0 ? ` (${bookingCount})` : ''}</span>
            </button>
          </li>
          <li className="pt-2">
            <a
              href="#rooms"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-gold to-[#dfc385] text-navy-900 font-semibold py-3 rounded-xl shadow-md"
            >
              <span>Book Now</span>
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}