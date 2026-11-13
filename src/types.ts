export type RoomCategory = 'Standard' | 'Deluxe' | 'Suite'

export interface Room {
  id: number
  name: string
  category: RoomCategory
  price: number
  guests: number
  image: string
}

/** What the visitor entered in the hero "Search Availability" form. */
export interface SearchParams {
  checkIn: string
  checkOut: string
  guests: number
}

export type BookingStatus = 'confirmed' | 'cancelled'

/** A saved reservation. Room details are copied in so later price changes never alter an old booking. */
export interface Booking {
  id: string
  reference: string
  roomId: number
  roomName: string
  category: RoomCategory
  image: string
  pricePerNight: number
  guestName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  total: number
  notes: string
  status: BookingStatus
  createdAt: string
}

/** What the booking form hands over; the hook adds id, reference, status and createdAt. */
export type NewBooking = Omit<Booking, 'id' | 'reference' | 'status' | 'createdAt'>

/** Display state of a booking, worked out from its dates. */
export type StayPhase = 'upcoming' | 'staying' | 'completed' | 'cancelled'
