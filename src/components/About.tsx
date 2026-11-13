const stats = [
  { value: '15+', label: 'Years of Service' },
  { value: '120', label: 'Luxury Rooms' },
  { value: '25k+', label: 'Happy Guests' },
  { value: '4.9', label: 'Guest Rating' },
]

const features = [
  'Prime beachfront location',
  'Award-winning restaurant',
  'Spa, pool and fitness centre',
  '24/7 concierge service',
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Images */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900"
            alt="Taprobane Horizon hotel exterior"
            className="h-[420px] w-full rounded-2xl object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500"
            alt="Hotel lobby"
            className="absolute -bottom-8 -right-4 hidden h-40 w-56 rounded-xl border-4 border-navy-900 object-cover shadow-xl sm:block"
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gold">About Us</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
            A Place Where Luxury Meets <span className="text-gold">Comfort</span>
          </h2>
          <p className="mt-6 text-white/70">
            Taprobane Horizon has welcomed travellers from around the world for over
            fifteen years. Our mission is simple: to make every stay feel
            effortless, personal and memorable.
          </p>
          <p className="mt-4 text-white/70">
            From elegantly designed rooms to exceptional dining and warm,
            attentive service, every detail is crafted for your comfort.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs text-navy-900">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#rooms"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-medium text-navy-900 transition hover:opacity-90"
          >
            Explore Our Rooms
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-24 grid grid-cols-2 gap-6 rounded-2xl bg-navy-800 p-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-serif text-4xl text-gold">{s.value}</p>
            <p className="mt-2 text-sm text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}