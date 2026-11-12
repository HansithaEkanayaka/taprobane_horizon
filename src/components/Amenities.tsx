import { amenities } from '../data/amenities'

export default function Amenities() {
  return (
    <section id="amenities" className="bg-navy-800 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">
          Resort Amenities
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl md:text-5xl">
          Everything You Need for a <span className="text-gold">Perfect Stay</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
          Enjoy world-class facilities designed to make every moment relaxing and memorable.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-white/10 bg-navy-900 p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-gold"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-3xl transition group-hover:bg-gold/10">
                {item.icon}
              </div>
              <h3 className="mt-5 font-serif text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}