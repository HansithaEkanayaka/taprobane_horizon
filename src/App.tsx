import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Gallery from './components/Gallery'
import Amenities from './components/Amenities'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import MyBookings from './components/MyBookings'
import PolicyModal from './components/PolicyModal'
import type { PolicyKind } from './components/PolicyModal'
import BackToTop from './components/BackToTop'
import { useBookings } from './hooks/useBookings'
import type { Room, SearchParams } from './types'

export default function App() {
  // Shared state: Hero writes the search, Rooms reads it, BookingModal uses both.
  const [search, setSearch] = useState<SearchParams | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [bookingsOpen, setBookingsOpen] = useState(false)
  const [highlight, setHighlight] = useState<string | undefined>()
  const [policy, setPolicy] = useState<PolicyKind | null>(null)

  const { bookings, addBooking, cancelBooking, removeBooking } = useBookings()
  const activeCount = bookings.filter((b) => b.status === 'confirmed').length

  const openBookings = (reference?: string) => {
    setSelectedRoom(null)
    setHighlight(reference)
    setBookingsOpen(true)
  }

  return (
    <>
      <Navbar bookingCount={activeCount} onOpenBookings={() => openBookings()} />
      <main>
        <Hero onSearch={setSearch} />
        <About />
        <Rooms
          search={search}
          onClearSearch={() => setSearch(null)}
          onBook={setSelectedRoom}
        />
        <Gallery />
        <Amenities />
        <Newsletter />
      </main>
      <Footer onOpenPolicy={setPolicy} />
      <BackToTop />

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          search={search}
          existing={bookings}
          onBooked={addBooking}
          onViewBookings={openBookings}
          onClose={() => setSelectedRoom(null)}
        />
      )}

      {bookingsOpen && (
        <MyBookings
          bookings={bookings}
          highlight={highlight}
          onCancel={cancelBooking}
          onRemove={removeBooking}
          onClose={() => setBookingsOpen(false)}
        />
      )}

      {policy && <PolicyModal kind={policy} onClose={() => setPolicy(null)} />}
    </>
  )
}
