export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center pt-24 pb-16"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800')" }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-navy-900/75 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center w-full">
        <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-gold font-semibold">
          Luxury Stay & Resort
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white">
          Experience Timeless <span className="text-gold">Elegance</span>
        </h1>
        <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-white/70 font-light">
          Relax in unmatched comfort, indulge in world-class hospitality, and create memories that last a lifetime.
        </p>

        {/* Booking Search Bar Container */}
        <div className="mt-10 sm:mt-12 bg-navy-900/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl max-w-4xl mx-auto shadow-2xl border border-white/15">
          <form id="heroBookingForm" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            
            {/* Check-in */}
            <div className="bg-navy-950/60 p-3.5 rounded-2xl border border-white/5 hover:border-gold/40 transition">
              <label htmlFor="heroCheckIn" className="block text-xs text-gold uppercase tracking-wider font-semibold mb-1">
                Check-in
              </label>
              <input 
                type="date" 
                id="heroCheckIn" 
                required 
                className="bg-transparent text-white w-full focus:outline-none text-sm font-medium cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* Check-out */}
            <div className="bg-navy-950/60 p-3.5 rounded-2xl border border-white/5 hover:border-gold/40 transition">
              <label htmlFor="heroCheckOut" className="block text-xs text-gold uppercase tracking-wider font-semibold mb-1">
                Check-out
              </label>
              <input 
                type="date" 
                id="heroCheckOut" 
                required 
                className="bg-transparent text-white w-full focus:outline-none text-sm font-medium cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* Guests */}
            <div className="bg-navy-950/60 p-3.5 rounded-2xl border border-white/5 hover:border-gold/40 transition">
              <label htmlFor="heroGuests" className="block text-xs text-gold uppercase tracking-wider font-semibold mb-1">
                Guests
              </label>
              <select 
                id="heroGuests" 
                defaultValue="2 Adults"
                className="bg-transparent text-white w-full focus:outline-none text-sm font-medium cursor-pointer [&>option]:bg-navy-900 [&>option]:text-white"
              >
                <option value="1 Adult">1 Guest</option>
                <option value="2 Adults">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4+ Guests">4+ Guests</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button 
                type="submit" 
                className="w-full h-full min-h-[50px] bg-gradient-to-r from-gold to-[#dfc385] text-navy-900 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:brightness-110 active:scale-95 transition-all"
              >
                <i className="fa-solid fa-magnifying-glass text-sm"></i>
                <span>Search Availability</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}