import { useEffect } from 'react'
import Icon from './Icon'

export type PolicyKind = 'privacy' | 'terms'

const content: Record<PolicyKind, { title: string; body: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Taprobane Horizon is a demo website. Your booking details (name, email, phone, dates and requests) are kept only in this browser on this device, using local storage.',
      'Nothing you enter is sent to a server, sold or shared. Clearing your browser data, or removing a booking in My Bookings, deletes it.',
      'The newsletter form does not store your email address.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    body: [
      'Bookings made on this site are demonstration reservations and are not linked to a real hotel system, so no payment is taken and no room is actually held.',
      'You can cancel an upcoming booking at any time from My Bookings. Prices shown are per night in US dollars.',
      'Photos are provided by Unsplash contributors.',
    ],
  },
}

export default function PolicyModal({ kind, onClose }: { kind: PolicyKind; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const { title, body } = content[kind]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-title"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-navy-900 p-6 shadow-2xl animate-fadeIn sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-white/60 transition hover:text-gold">
          <Icon name="x" className="h-6 w-6" />
        </button>
        <h3 id="policy-title" className="font-serif text-2xl text-gold">{title}</h3>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
          {body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
