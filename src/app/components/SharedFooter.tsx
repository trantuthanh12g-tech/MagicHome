import { Mail, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useServices } from "../hooks/useServices";
import { logoImg } from "../data/initialServices";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"
      style={{ fill: "url(#ig-footer-shared-g)" }}>
      <defs>
        <linearGradient id="ig-footer-shared-g" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
];

interface SharedFooterProps {
  onContactOpen?: () => void;
}

export function SharedFooter({ onContactOpen }: SharedFooterProps) {
  const { services } = useServices();
  const footerImg = `/Footer-Img/Footer.jpg`;

  const handleContactClick = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Question CTA Banner */}
{/*
        <div className="mb-8 border border-gray-700 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <h3 className="text-white text-xl sm:text-2xl" style={{ fontFamily: "Georgia, serif" }}>
            Try 3 HDR for free now !!!
          </h3>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Magichome.editing@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded transition-all duration-300 text-sm uppercase tracking-wider whitespace-nowrap"
            style={{ fontWeight: 700, letterSpacing: "0.1em" }}
          >
            GET IN TOUCH
            <span className="text-lg" aria-hidden>»</span>
          </a>
        </div>
*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">

          {/* Brand + Contact */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5 select-none w-fit">
              <img src={logoImg} alt="Magic Home" className="h-9 w-auto object-contain opacity-90" />
              <span style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem" }}>
                <span className="text-orange-400">Magic</span>
                <span className="text-white">Home</span>
              </span>
            </Link>

            <address className="not-italic text-gray-400 text-sm mb-3">Address: Ha Long, Quang Ninh, Viet Nam</address>

            {/* Contact info */}
            <ul className="space-y-3 mb-5">
              <li>
                <a href="mailto:Magichome.editing@gmail.com" className="flex items-start gap-2.5 text-gray-400 hover:text-orange-400 text-sm transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Magichome.editing@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/84385603388" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-orange-400 text-sm transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +84 385 603 388
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/magichome.editing" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/magichome.editing" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4 text-sm" style={{ fontWeight: 600, letterSpacing: "0.05em" }}>Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/service/${s.id}`} className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 opacity-50" />{s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4 text-sm" style={{ fontWeight: 600, letterSpacing: "0.05em" }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 opacity-50" />{l.label}
                  </a>
                </li>
              ))}
              {onContactOpen && (
                <li>
                  <button
                    onClick={onContactOpen}
                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 opacity-50" />Contact
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Footer image (right column) */}
          <div className="hidden md:block lg:col-span-2">
            <div className="w-full h-36 md:h-48 lg:h-56 rounded-xl overflow-hidden">
              <img
                src={footerImg}
                alt="MagicHome"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Magic Home. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Professional Real Estate Photo Editing</p>
        </div>
      </div>
    </footer>
  );
}