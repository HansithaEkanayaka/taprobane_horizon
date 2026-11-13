import { useCallback, useEffect, useState } from 'react'
import type { Booking, NewBooking } from '../types'

const STORAGE_KEY = 'taprobane-horizon:bookings'

function load(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return [] // storage blocked or corrupted: start empty instead of crashing
  }
}

function save(list: Booking[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* private mode or full storage: bookings just won't survive a refresh */
  }
}

function makeReference(taken: Set<string>): string {
  let ref = ''
  do {
    ref = 'TH-' + Math.random().toString(36).slice(2, 8).toUpperCase()
  } while (taken.has(ref))
  return ref
}

/** Returns the active booking of the same room whose dates overlap, if any. */
export function findConflict(
  bookings: Booking[],
  roomId: number,
  checkIn: string,
  checkOut: string,
): Booking | undefined {
  return bookings.find(
    (b) => b.status === 'confirmed' && b.roomId === roomId && b.checkIn < checkOut && checkIn < b.checkOut,
  )
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(load)

  useEffect(() => save(bookings), [bookings])

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) setBookings(load())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const addBooking = useCallback(
    (data: NewBooking): Booking => {
      const booking: Booking = {
        ...data,
        id: crypto.randomUUID(),
        reference: makeReference(new Set(bookings.map((b) => b.reference))),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }
      setBookings((prev) => [booking, ...prev])
      return booking
    },
    [bookings],
  )

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)))
  }, [])

  const removeBooking = useCallback((id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id))
  }, [])

  return { bookings, addBooking, cancelBooking, removeBooking }
}
