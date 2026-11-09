export default function About() {
  return (
    <section id="about" className="relative py-24 bg-navy-900 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="mb-3 text-xs sm:text-sm uppercase tracking-[0.3em] text-gold font-semibold">
            Welcome to Taprobane Horizon
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            A Sanctuary of <span className="text-gold">Luxury & Comfort</span>
          </h2>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Image Collage / Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200" 
                alt="Luxury Hotel Interior" 
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition duration-700"
              />
            </div>
            
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 z-20 bg-navy-950/90 backdrop-blur-md border border-gold/30 p-6 rounded-2xl shadow-2xl max-w-[220px]">
              <p className="font-serif text-3xl font-bold text-gold">15+</p>
              <p className="text-xs text-white/70 uppercase tracking-wider mt-1 font-medium">
                Years of Exceptional Hospitality
              </p>
            </div>
          </div>

          {/* Right Side: Description and Features */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-white/90">
              Designed for those who appreciate the finer things in life.
            </h3>
            <p className="text-white/70 font-light leading-relaxed">
              Nestled in a breathtaking destination, Taprobane Horizon offers a seamless blend of timeless elegance and modern sophistication. From our meticulously designed suites to our world-class dining and wellness amenities, every detail is crafted to provide an unforgettable stay.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              
              <div className="bg-navy-950/50 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <div className="text-gold text-xl mt-1">
                  <i className="fa-solid fa-key"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">Prime Location</h4>
                  <p className="text-xs text-white/60 mt-1">Situated right at the heart of scenic beauty and tranquility.</p>
                </div>
              </div>

              <div className="bg-navy-950/50 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <div className="text-gold text-xl mt-1">
                  <i className="fa-solid fa-concierge-bell"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">24/7 Concierge</h4>
                  <p className="text-xs text-white/60 mt-1">Personalized services tailored to fulfill your every need.</p>
                </div>
              </div>

              <div className="bg-navy-950/50 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <div className="text-gold text-xl mt-1">
                  <i className="fa-solid fa-utensils"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">Fine Dining</h4>
                  <p className="text-xs text-white/60 mt-1">Exquisite culinary masterpieces crafted by master chefs.</p>
                </div>
              </div>

              <div className="bg-navy-950/50 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <div className="text-gold text-xl mt-1">
                  <i className="fa-solid fa-spa"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">Luxury Spa & Wellness</h4>
                  <p className="text-xs text-white/60 mt-1">Rejuvenate your body and mind in our peaceful sanctuary.</p>
                </div>
              </div>

            </div>

            {/* Learn More Button */}
            <div className="pt-4">
              <a 
                href="#rooms" 
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-white transition-colors group"
              >
                <span>Explore our rooms & suites</span>
                <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}