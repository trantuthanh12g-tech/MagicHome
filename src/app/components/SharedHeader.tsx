import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useServices } from "../hooks/useServices";
import { logoImg } from "../data/initialServices";
import { ContactModal } from "./ContactModal";

export function SharedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { services } = useServices();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Listen for global "open-contact-modal" event (dispatched by other components)
  useEffect(() => {
    const handler = () => setContactOpen(true);
    window.addEventListener("open-contact-modal", handler);
    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo — bigger with "MagicHome" wordmark */}
            <Link to="/" className="flex items-center gap-3 select-none flex-shrink-0 group">
              <img
                src={logoImg}
                alt="Magic Home"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                <span className="text-orange-500">Magic</span>
                <span className="text-gray-900">Home</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
          
<Link to="/" className="text-gray-600 hover:text-orange-500 text-sm transition-colors" style={{ letterSpacing: "0.02em" }}>
  Home
</Link>

              {/* Services dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-gray-600 hover:text-orange-500 text-sm transition-colors"
                  style={{ letterSpacing: "0.02em" }}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.14 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      {/* Caret */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 overflow-hidden">
                        <div className="w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 translate-y-1/2 mx-auto shadow-sm" />
                      </div>

                      <div className="pt-3 pb-2">
                        {services.map((s) => (
                          <Link
                            key={s.id}
                            to={`/service/${s.id}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-5 py-2.5 hover:bg-orange-50 text-gray-700 hover:text-orange-500 text-sm transition-colors group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 group-hover:scale-125 transition-transform" />
                            <span className="flex-1">{s.name}</span>
                            {s.price && (
                              <span className="text-xs text-gray-400 group-hover:text-orange-400">{s.price}</span>
                            )}
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 px-3 py-2">
                        <a
                          href="/#services"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-1 px-2 py-1.5 text-orange-500 hover:text-orange-600 text-xs transition-colors"
                          style={{ letterSpacing: "0.04em" }}
                        >
                          View all services <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/portfolio" className="text-gray-600 hover:text-orange-500 text-sm transition-colors" style={{ letterSpacing: "0.02em" }}>
                Portfolio
              </Link>

              <Link to="/pricing" className="text-gray-600 hover:text-orange-500 text-sm transition-colors" style={{ letterSpacing: "0.02em" }}>
                Pricing
              </Link>

              {/* Contact → opens modal popup */}
              <button
                onClick={() => setContactOpen(true)}
                className="text-gray-600 hover:text-orange-500 text-sm transition-colors"
                style={{ letterSpacing: "0.02em" }}
              >
                Contact
              </button>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Magichome.editing@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm transition-colors"
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                <a
                  href="/MagicHome"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded text-sm transition-colors"
                >
                  Home
                </a>

                {/* Mobile Services expandable */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded text-sm transition-colors"
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 py-1 flex flex-col gap-0.5">
                          {services.map((s) => (
                            <Link
                              key={s.id}
                              to={`/service/${s.id}`}
                              onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                              className="flex items-center gap-2.5 px-3 py-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded text-sm transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                              {s.name}
                              {s.price && <span className="ml-auto text-xs text-gray-400">{s.price}</span>}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/portfolio"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded text-sm transition-colors"
                >
                  Portfolio
                </Link>

                <Link
                  to="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded text-sm transition-colors"
                >
                  Pricing
                </Link>

                <button
                  onClick={() => { setMenuOpen(false); setContactOpen(true); }}
                  className="text-left px-3 py-2.5 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded text-sm transition-colors"
                >
                  Contact
                </button>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=Magichome.editing@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 px-3 py-2.5 bg-orange-500 text-white rounded text-sm text-center"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}