import { useCallback, useEffect, useState } from 'react'
import { gallery } from '../data/gallery'
import type { GalleryCategory } from '../data/gallery'
import Icon from './Icon'

const filters: ('All' | GalleryCategory)[] = ['All', 'Rooms', 'Dining', 'Pool & Spa']

export default function Gallery() {
  const [active, setActive] = useState<'All' | GalleryCategory>('All')
  const [lightbox, setLightbox] = useState<number | null>(null) // index inside `visible`
  const visible = active === 'All' ? gallery : gallery.filter((g) => g.category === active)

  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  )

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [lightbox, close, step])

  const current = lightbox !== null ? visible[lightbox] : null

  return (
    <section id="gallery" className="bg-navy-800 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-gold">Gallery</p>
        <h2 className="mt-3 text-center font-serif text-4xl">A Glimpse of Taprobane Horizon</h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                active === f
                  ? 'border-gold bg-gold text-navy-900'
                  : 'border-white/20 hover:border-gold'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <figure key={item.id} className="group relative overflow-hidden rounded-xl">
              <button
                onClick={() => setLightbox(index)}
                aria-label={`View ${item.title}`}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </button>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent p-4 font-serif text-lg opacity-0 transition group-hover:opacity-100">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <button onClick={close} aria-label="Close" className="absolute right-5 top-5 text-white/80 hover:text-gold">
            <Icon name="x" className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1) }}
            aria-label="Previous image"
            className="absolute left-3 text-white/80 hover:text-gold sm:left-6"
          >
            <Icon name="chevronLeft" className="h-10 w-10" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-4xl">
            <img src={current.image.replace('w=800', 'w=1400')} alt={current.title} className="max-h-[80vh] w-full rounded-xl object-contain" />
            <figcaption className="mt-3 text-center font-serif text-lg">{current.title}</figcaption>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); step(1) }}
            aria-label="Next image"
            className="absolute right-3 text-white/80 hover:text-gold sm:right-6"
          >
            <Icon name="arrow" className="h-10 w-10" />
          </button>
        </div>
      )}
    </section>
  )
}
