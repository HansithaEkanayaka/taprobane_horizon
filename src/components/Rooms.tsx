import { useState } from 'react'
import { rooms } from '../data/rooms'
import Icon from './Icon'
import { formatDate, nightsBetween } from '../utils/dates'
import type { Room, RoomCategory, SearchParams } from '../types'

const filters: ('All' | RoomCategory)[] = ['All', 'Standard', 'Deluxe', 'Suite']

interface RoomsProps {
  search: SearchParams | null
  onClearSearch: () => void
  onBook: (room: Room) => void
}

export default function Rooms({ search, onClearSearch, onBook }: RoomsProps) {
  const [active, setActive] = useState<'All' | RoomCategory>('All')

  // Category filter + (when the hero search was used) capacity filter.
  const visible = rooms.filter(
    (r) => (active === 'All' || r.category === active) && (!search || r.guests >= search.guests),
  )
  const nights = search ? nightsBetween(search.checkIn, search.checkOut) : 0

  return (
    <section id="rooms" className="relative py-24 bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="mb-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-gold font-semibold">
            Accommodation
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Our Rooms & <span className="text-gold">Suites</span>
          </h2>
          <p className="mt-4 text-white/70 font-light text-sm sm:text-base">
            Each room is thoughtfully designed to provide absolute comfort, elegance, and breathtaking views.
          </p>
        </div>

        {/* Active search summary */}
        {search && (
          <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-navy-900 px-6 py-4 text-sm sm:flex-row">
            <p className="text-white/80">
              <span className="text-gold font-semibold">{formatDate(search.checkIn)}</span> →{' '}
              <span className="text-gold font-semibold">{formatDate(search.checkOut)}</span> · {nights}{' '}
              {nights === 1 ? 'night' : 'nights'} · {search.guests} {search.guests === 1 ? 'guest' : 'guests'}
            </p>
            <button
              onClick={onClearSearch}
              className="rounded-full border border-white/20 px-4 py-1.5 text-xs transition hover:border-gold hover:text-gold"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === f
                  ? 'border-gold bg-gold text-navy-950 shadow-lg shadow-gold/20 scale-105'
                  : 'border-white/15 bg-navy-900/50 text-white/80 hover:border-gold/50 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <p className="text-center text-white/60">
            No rooms match your filters. Try a different category or fewer guests.
          </p>
        )}

        {/* Rooms Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((room) => (
            <article 
              key={room.id} 
              className="group overflow-hidden rounded-3xl bg-navy-900 border border-white/10 shadow-xl hover:border-gold/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative overflow-hidden h-56">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80" />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md border border-white/10 text-gold text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  {room.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors">
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/60 font-medium">
                    <Icon name="user" className="h-4 w-4 text-gold" />
                    <span>Up to {room.guests} guests</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-2xl font-bold text-gold">${room.price}</span>
                    <span className="text-xs text-white/50 font-light"> / night</span>
                    {nights > 0 && (
                      <p className="mt-1 text-xs text-white/60">
                        ${room.price * nights} for {nights} {nights === 1 ? 'night' : 'nights'}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onBook(room)}
                    className="bg-white/10 hover:bg-gold hover:text-navy-950 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
