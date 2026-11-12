import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Gallery from './components/Gallery'
import Amenities from './components/Amenities'
import Newsletter from './components/Newsletter'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import type { Room, SearchParams } from './types'

export default function App() {
  // Shared state: Hero writes the search, Rooms reads it, BookingModal uses both.
  const [search, setSearch] = useState<SearchParams | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  return (
    <>
      <Navbar />
      <main>
        <Hero onSearch={setSearch}/>
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
      <Footer />
      <BackToTop />

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          search={search}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </>
  )
}