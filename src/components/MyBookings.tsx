import { useEffect, useMemo, useState } from 'react'
import Icon from './Icon'
import { formatDate, nightsBetween, stayPhase, todayISO } from '../utils/dates'
import type { Booking, StayPhase } from '../types'

interface MyBookingsProps {
  bookings: Booking[]
  highlight?: string
  onCancel: (id: string) => void
  onRemove: (id: string) => void
  onClose: () => void
}

const phaseStyle: Record<StayPhase, { label: string; className: string }> = {
  upcoming: { label: 'Upcoming', className: 'bg-gold/15 text-gold border-gold/40' },
  staying: { label: 'Staying now', className: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40' },
  completed: { label: 'Completed', className: 'bg-white/10 text-white/60 border-white/20' },
  cancelled: { label: 'Cancelled', className: 'bg-red-500/10 text-red-300 border-red-400/30' },
}

export default function MyBookings({ bookings, highlight, onCancel, onRemove, onClose }: MyBookingsProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const today = todayISO()

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

  // Live stays first (soonest check-in on top), then history (newest first).
  const sorted = useMemo(() => {
    const live = bookings
      .filter((b) => ['upcoming', 'staying'].includes(stayPhase(b, today)))
      .sort((a, b) => a.checkIn.localeCompare(b.checkIn))
    const past = bookings
      .filter((b) => !['upcoming', 'staying'].includes(stayPhase(b, today)))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return [...live, ...past]
  }, [bookings, today])

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mybookings-title"
    >
      <aside
        className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-navy-900 shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h3 id="mybookings-title" className="font-serif text-2xl">
              My <span className="text-gold">Bookings</span>
            </h3>
            <p className="mt-1 text-xs text-white/50">Saved on this device and browser</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-white/60 transition hover:text-gold">
            <Icon name="x" className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {sorted.length === 0 && (
            <div className="py-16 text-center">
              <Icon name="calendar" className="mx-auto h-12 w-12 text-gold/70" />
              <p className="mt-4 font-serif text-xl">No bookings yet</p>
              <p className="mt-2 text-sm text-white/60">Reserve a room and it will appear here.</p>
              <a
                href="#rooms"
                onClick={onClose}
                className="mt-6 inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-navy-900 transition hover:opacity-90"
              >
                Browse rooms
              </a>
            </div>
          )}

          {sorted.map((b) => {
            const phase = stayPhase(b, today)
            const style = phaseStyle[phase]
            const daysToGo = phase === 'upcoming' ? nightsBetween(today, b.checkIn) : 0
            return (
              <article
                key={b.id}
                className={`overflow-hidden rounded-2xl border bg-navy-950 ${
                  b.reference === highlight ? 'border-gold shadow-lg shadow-gold/10' : 'border-white/10'
                } ${phase === 'cancelled' || phase === 'completed' ? 'opacity-80' : ''}`}
              >
                <div className="flex gap-4 p-4">
                  <img src={b.image} alt={b.roomName} className="h-20 w-20 flex-none rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="truncate font-serif text-lg leading-tight">{b.roomName}</h4>
                      <span className={`flex-none rounded-full border px-2.5 py-0.5 text-[11px] ${style.className}`}>
                        {style.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">
                      {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                    </p>
                    <p className="text-xs text-white/60">
                      {b.nights} {b.nights === 1 ? 'night' : 'nights'} · {b.guests} {b.guests === 1 ? 'guest' : 'guests'}
                    </p>
                    {daysToGo > 0 && (
                      <p className="mt-1 text-xs text-gold">
                        Check-in in {daysToGo} {daysToGo === 1 ? 'day' : 'days'}
                      </p>
                    )}
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-white/10 px-4 py-3 text-xs">
                  <dt className="text-white/50">Reference</dt>
                  <dd className="text-right font-medium tracking-wider text-gold">{b.reference}</dd>
                  <dt className="text-white/50">Guest</dt>
                  <dd className="truncate text-right">{b.guestName}</dd>
                  <dt className="text-white/50">Total</dt>
                  <dd className={`text-right font-serif text-base ${phase === 'cancelled' ? 'line-through text-white/40' : 'text-gold'}`}>
                    ${b.total}
                  </dd>
                </dl>

                {b.notes && (
                  <p className="border-t border-white/10 px-4 py-3 text-xs text-white/60">
                    <span className="text-white/40">Request: </span>
                    {b.notes}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 border-t border-white/10 px-4 py-3 text-xs">
                  {phase === 'upcoming' && confirmingId !== b.id && (
                    <button
                      onClick={() => setConfirmingId(b.id)}
                      className="rounded-full border border-white/20 px-4 py-1.5 transition hover:border-red-400 hover:text-red-300"
                    >
                      Cancel booking
                    </button>
                  )}
                  {phase === 'upcoming' && confirmingId === b.id && (
                    <>
                      <span className="mr-auto text-white/70">Cancel this booking?</span>
                      <button onClick={() => setConfirmingId(null)} className="px-2 py-1.5 text-white/60 hover:text-white">
                        Keep it
                      </button>
                      <button
                        onClick={() => {
                          onCancel(b.id)
                          setConfirmingId(null)
                        }}
                        className="rounded-full bg-red-500/80 px-4 py-1.5 font-medium text-white transition hover:bg-red-500"
                      >
                        Yes, cancel
                      </button>
                    </>
                  )}
                  {(phase === 'cancelled' || phase === 'completed') && (
                    <button onClick={() => onRemove(b.id)} className="px-2 py-1.5 text-white/50 transition hover:text-white">
                      Remove from list
                    </button>
                  )}
                  {phase === 'staying' && <span className="text-white/50">Enjoy your stay</span>}
                </div>
              </article>
            )
          })}
        </div>
      </aside>
    </div>
  )
}
