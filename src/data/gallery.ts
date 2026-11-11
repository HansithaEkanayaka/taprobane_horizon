export type GalleryCategory = 'Rooms' | 'Dining' | 'Pool & Spa'

export interface GalleryItem {
  id: number
  title: string
  category: GalleryCategory
  image: string
}

export const gallery: GalleryItem[] = [
  { id: 1, title: 'Ocean View Suite', category: 'Rooms',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800' },
  { id: 2, title: 'Fine Dining Restaurant', category: 'Dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800' },
  { id: 3, title: 'Infinity Pool', category: 'Pool & Spa',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },
  { id: 4, title: 'Deluxe Bedroom', category: 'Rooms',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800' },
  { id: 5, title: 'Breakfast Buffet', category: 'Dining',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800' },
  { id: 6, title: 'Luxury Spa', category: 'Pool & Spa',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800' },
]