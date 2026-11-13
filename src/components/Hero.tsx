import { useState } from 'react'
import type { FormEvent } from 'react'
import Icon from './Icon'
import { addDays, nightsBetween, todayISO } from '../utils/dates'
import type { SearchParams } from '../types'

interface HeroProps {
  onSearch: (params: SearchParams) => void
}

const guestOptions = [1, 2, 3, 4]

export default function Hero({ onSearch }: HeroProps) {
  const today = todayISO()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [error, setError] = useState('')

  const handleCheckIn = (value: string) => {
    setCheckIn(value)
    setError('')
    // If the chosen check-out is no longer after the new check-in, clear it.
    if (checkOut && nightsBetween(value, checkOut) === 0) setCheckOut('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (checkIn < today) return setError('Check-in date cannot be in the past.')
    if (nightsBetween(checkIn, checkOut) === 0) return setError('Check-out must be after check-in.')

    setError('')
    onSearch({ checkIn, checkOut, guests })
    // Jump to the rooms list, which now shows only rooms that fit the search.
    document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center pt-24 pb-16"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800')" }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-navy-900/75 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center w-full">
        <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.2em] text-gold font-semibold">
          Luxury Stay & Resort
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white">
          Experience Timeless <span className="text-gold">Elegance</span>
        </h1>
        <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-white/70 font-light">
          Relax in unmatched comfort, indulge in world-class hospitality, and create memories that last a lifetime.
        </p>

        {/* Booking Search Bar Container */}
        <div className="mt-10 sm:mt-12 bg-navy-900/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl max-w-4xl mx-auto shadow-2xl border border-white/15">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left"
          >
            
            {/* Check-in */}
            <div className="bg-navy-950/60 p-3.5 rounded-2xl border border-white/5 hover:border-gold/40 transition">
              <label htmlFor="heroCheckIn" className="block text-xs text-gold uppercase tracking-wider font-semibold mb-1">
                Check-in
              </label>
              <input
                type="date"
                id="heroCheckIn"
                required
                min={today}
                value={checkIn}
                onChange={(e) => handleCheckIn(e.target.value)}
                className="bg-transparent text-white w-full focus:outline-none text-sm font-medium cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* Check-out */}
            <div className="bg-navy-950/60 p-3.5 rounded-2xl border border-white/5 hover:border-gold/40 transition">
              <label htmlFor="heroCheckOut" className="block text-xs text-gold uppercase tracking-wider font-semibold mb-1">
                Check-out
              </label>
              <input
                type="date"
                id="heroCheckOut"
                required
                min={checkIn ? addDays(checkIn, 1) : addDays(today, 1)}
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value)
                  setError('')
                }}
                className="bg-transparent text-white w-full focus:outline-none text-sm font-medium cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* Guests */}
            <div className="bg-navy-950/60 p-3.5 rounded-2xl border border-white/5 hover:border-gold/40 transition">
              <label htmlFor="heroGuests" className="block text-xs text-gold uppercase tracking-wider font-semibold mb-1">
                Guests
              </label>
              <select
                id="heroGuests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent text-white w-full focus:outline-none text-sm font-medium cursor-pointer [&>option]:bg-navy-900 [&>option]:text-white"
              >
                {guestOptions.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-full min-h-[50px] bg-gradient-to-r from-gold to-[#dfc385] text-navy-900 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:brightness-110 active:scale-95 transition-all"
              >
                <Icon name="search" className="h-4 w-4" />
                <span>Search Availability</span>
              </button>
            </div>
          </form>

          {error && (
            <p role="alert" className="mt-4 text-left text-sm text-red-300">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}