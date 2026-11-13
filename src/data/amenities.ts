export interface Amenity {
  id: number
  /** Name of an icon from src/components/Icon.tsx */
  icon: string
  title: string
  description: string
}

export const amenities: Amenity[] = [
  { id: 1, icon: 'waves', title: 'Infinity Pool',
    description: 'Swim with a stunning horizon view, open from sunrise to sunset.' },
  { id: 2, icon: 'leaf', title: 'Luxury Spa',
    description: 'Massages, facials and wellness treatments to help you unwind.' },
  { id: 3, icon: 'utensils', title: 'Fine Dining',
    description: 'Fresh local and international dishes prepared by expert chefs.' },
  { id: 4, icon: 'dumbbell', title: 'Fitness Centre',
    description: 'Modern equipment and personal trainers available every day.' },
  { id: 5, icon: 'wifi', title: 'Free High-Speed Wi-Fi',
    description: 'Stay connected in every room and across the whole resort.' },
  { id: 6, icon: 'car', title: 'Airport Transfers',
    description: 'Comfortable private pick-up and drop-off on request.' },
  { id: 7, icon: 'martini', title: 'Rooftop Bar',
    description: 'Signature cocktails and live music with a sunset backdrop.' },
  { id: 8, icon: 'bell', title: '24/7 Concierge',
    description: 'Tours, bookings and recommendations whenever you need them.' },
]