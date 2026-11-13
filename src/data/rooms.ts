import type { Room } from '../types'

export const rooms: Room[] = [
  { id: 1, name: 'Classic Garden Room', category: 'Standard', price: 120, guests: 2,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800' },
  { id: 2, name: 'Deluxe Ocean View', category: 'Deluxe', price: 220, guests: 3,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },
  { id: 3, name: 'Executive Suite', category: 'Suite', price: 380, guests: 4,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800' },
  { id: 4, name: 'Royal Penthouse', category: 'Suite', price: 650, guests: 4,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800' },
]