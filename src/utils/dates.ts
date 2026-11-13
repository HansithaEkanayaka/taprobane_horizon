const DAY_MS = 24 * 60 * 60 * 1000

/** Format a Date as YYYY-MM-DD in the user's local time (what <input type="date"> expects). */
export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayISO(): string {
  return toISODate(new Date())
}

/** Add days to a YYYY-MM-DD string and return a YYYY-MM-DD string. */
export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  return toISODate(new Date(y, m - 1, d + days))
}

/** Number of nights between two YYYY-MM-DD strings (0 if invalid or checkout <= checkin). */
export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0
  const [y1, m1, d1] = checkIn.split('-').map(Number)
  const [y2, m2, d2] = checkOut.split('-').map(Number)
  const diff = Math.round((new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime()) / DAY_MS)
  return diff > 0 ? diff : 0
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Where a booking stands today: upcoming, in progress, finished, or cancelled. */
export function stayPhase(
  booking: { status: 'confirmed' | 'cancelled'; checkIn: string; checkOut: string },
  today: string = todayISO(),
): 'upcoming' | 'staying' | 'completed' | 'cancelled' {
  if (booking.status === 'cancelled') return 'cancelled'
  if (today >= booking.checkOut) return 'completed'
  if (today >= booking.checkIn) return 'staying'
  return 'upcoming'
}
