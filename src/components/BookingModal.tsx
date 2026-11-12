import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import Icon from './Icon'
import { addDays, formatDate, nightsBetween, todayISO } from '../utils/dates'
import type { Room, SearchParams } from '../types'

interface BookingModalProps {
  room: Room
  search: SearchParams | null
  onClose: () => void
}

const inputClass =
  'w-full rounded-xl border border-white/15 bg-navy-950 px-4 py-2.5 text-sm text-white outline-none focus:border-gold [color-scheme:dark]'

export default function BookingModal({ room, search, onClose }: BookingModalProps) {
  const today = todayISO()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [checkIn, setCheckIn] = useState(search?.checkIn ?? '')
  const [checkOut, setCheckOut] = useState(search?.checkOut ?? '')
  const [guests, setGuests] = useState(Math.min(search?.guests ?? 2, room.guests))
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')

  // Close on Escape and stop the page behind from scrolling while the modal is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  const nights = nightsBetween(checkIn, checkOut)
  const total = nights * room.price

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) return setError('Please enter your full name.')
    if (checkIn < today) return setError('Check-in date cannot be in the past.')
    if (nights === 0) return setError('Check-out must be after check-in.')
    setError('')
    // No backend yet: a real site would POST this to an API here.
    setReference('TH-' + Math.random().toString(36).slice(2, 8).toUpperCase())
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div
        className="relative my-8 w-full max-w-lg rounded-3xl border border-white/10 bg-navy-900 p-6 shadow-2xl animate-fadeIn sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-white/60 transition hover:text-gold"
        >
          <Icon name="x" className="h-6 w-6" />
        </button>

        {reference ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center text-gold">
              <Icon name="check" className="h-16 w-16" />
            </div>
            <h3 id="booking-title" className="mt-4 font-serif text-3xl">Booking Request Received</h3>
            <p className="mt-3 text-sm text-white/70">
              Thank you, {name.trim()}. We have reserved the <span className="text-gold">{room.name}</span> for{' '}
              {formatDate(checkIn)} – {formatDate(checkOut)} ({nights} {nights === 1 ? 'night' : 'nights'}).
            </p>
            <p className="mt-4 text-sm text-white/60">Reference</p>
            <p className="font-serif text-2xl tracking-widest text-gold">{reference}</p>
            <p className="mt-2 text-xs text-white/50">
              A confirmation will be sent to {email}.
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-gold px-8 py-3 font-medium text-navy-900 transition hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 id="booking-title" className="font-serif text-2xl sm:text-3xl">
              Book <span className="text-gold">{room.name}</span>
            </h3>
            <p className="mt-1 text-sm text-white/60">
              ${room.price} / night · up to {room.guests} guests
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div>
                <label htmlFor="bk-name" className="mb-1 block text-xs uppercase tracking-wider text-gold">Full name</label>
                <input id="bk-name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-email" className="mb-1 block text-xs uppercase tracking-wider text-gold">Email</label>
                  <input id="bk-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="bk-phone" className="mb-1 block text-xs uppercase tracking-wider text-gold">Phone (optional)</label>
                  <input id="bk-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-in" className="mb-1 block text-xs uppercase tracking-wider text-gold">Check-in</label>
                  <input
                    id="bk-in" type="date" required min={today} value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value)
                      if (checkOut && nightsBetween(e.target.value, checkOut) === 0) setCheckOut('')
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="bk-out" className="mb-1 block text-xs uppercase tracking-wider text-gold">Check-out</label>
                  <input
                    id="bk-out" type="date" required
                    min={checkIn ? addDays(checkIn, 1) : addDays(today, 1)}
                    value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bk-guests" className="mb-1 block text-xs uppercase tracking-wider text-gold">Guests</label>
                <select id="bk-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={inputClass}>
                  {Array.from({ length: room.guests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="bk-notes" className="mb-1 block text-xs uppercase tracking-wider text-gold">Special requests (optional)</label>
                <textarea id="bk-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-navy-950 px-4 py-3 text-sm">
                <span className="text-white/70">
                  {nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'} × $${room.price}` : 'Select your dates'}
                </span>
                <span className="font-serif text-xl text-gold">{nights > 0 ? `$${total}` : '—'}</span>
              </div>

              {error && <p role="alert" className="text-sm text-red-300">{error}</p>}

              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-gold to-[#dfc385] px-8 py-3 font-semibold text-navy-900 transition hover:brightness-110 active:scale-95"
              >
                Confirm Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
