import Icon from "./Icon"

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 bg-navy-900 text-white overflow-hidden">
      {/* Subtle decorative top glow or gradient border effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-wide text-gold">Grand Horizon</h3>
            <p className="text-sm leading-relaxed text-white/60">
              Relax in comfort, enjoy world-class service, and make memories that last.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg tracking-wide text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <a href="#home" className="transition-colors duration-200 hover:text-gold flex items-center gap-2">Home
                </a>
              </li>
              <li>
                <a href="#rooms" className="transition-colors duration-200 hover:text-gold flex items-center gap-2">Rooms & Suites
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-colors duration-200 hover:text-gold flex items-center gap-2">Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-serif text-lg tracking-wide text-white">Contact Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="h-4 w-4 text-gold mt-0.5" />
                <span>123 Beach Road, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" className="h-4 w-4 text-gold mt-0.5" />
                <a href="tel:+94112345678" className="hover:text-gold transition-colors">+94 11 234 5678</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="h-4 w-4 text-gold mt-0.5" />
                <a href="mailto:info@grandhorizon.com" className="hover:text-gold transition-colors">info@grandhorizon.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social / Follow */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white">Follow Grand Horizon</h4>
            <p className="mt-3 text-xs leading-relaxed text-white/50">
              Connect with us on social media for daily coastal inspiration and exclusive offers.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {["instagram", "facebook", "twitter"].map((s) => (
                <a 
                  key={s} 
                  href="#top" 
                  aria-label={s} 
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 hover:scale-105"
                >
                  <Icon name={s} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>© {new Date().getFullYear()} Grand Horizon. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}