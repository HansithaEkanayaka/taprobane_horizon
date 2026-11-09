import { useState } from 'react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Rooms & Suites', href: '#rooms' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-navy-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <a href="#home" className="font-serif text-2xl font-bold tracking-wide text-gold">
          Taprobane Horizon
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
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
          <a
            href="#rooms"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-gold to-[#dfc385] text-navy-900 font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-gold/10 hover:shadow-gold/25 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Book Now</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            className="md:hidden text-white text-2xl focus:outline-none p-1"
          >
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <ul className="space-y-3 border-t border-white/10 bg-navy-900 px-6 py-6 md:hidden shadow-2xl animate-fadeIn">
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
          <li className="pt-2">
            <a
              href="#rooms"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-gold to-[#dfc385] text-navy-900 font-semibold py-3 rounded-xl shadow-md"
            >
              <span>Book Now</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}