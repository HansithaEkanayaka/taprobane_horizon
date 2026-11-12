import { useState } from 'react'
import type { FormEvent } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="font-serif text-4xl">Stay in the Loop</h2>
      <p className="mt-4 text-white/60">
        Subscribe for exclusive offers and news from Grand Horizon.
      </p>

      {sent ? (
        <p className="mt-8 text-gold">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 rounded-full border border-white/20 bg-navy-800 px-6 py-3 outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="rounded-full bg-gold px-8 py-3 font-medium text-navy-900 transition hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  )
}