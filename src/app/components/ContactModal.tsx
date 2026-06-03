import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Phone } from "lucide-react";
import { EmailDropdownButton } from "./EmailDropdownButton";

const EMAIL = "Magichome.editing@gmail.com";
const WHATSAPP = "84385603388";
const FACEBOOK_URL = "https://www.facebook.com/magichome.editing";
const INSTAGRAM_URL = "https://www.instagram.com/magichome.editing";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
      style={{ fill: "url(#ig-modal-gradient)" }}>
      <defs>
        <linearGradient id="ig-modal-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const contacts = [
    {
      icon: <Mail className="w-5 h-5 text-orange-500" />, 
      bg: "bg-orange-50",
      label: "Email",
      value: EMAIL,
      href: undefined, // Sẽ xử lý riêng
      description: "Chọn phương thức gửi email",
      isEmail: true,
    },
    {
      icon: <span className="text-green-500"><WhatsAppIcon /></span>,
      bg: "bg-green-50",
      label: "WhatsApp",
      value: `+${WHATSAPP}`,
      href: `https://wa.me/${WHATSAPP}`,
      description: "Chat with us on WhatsApp",
    },
    {
      icon: <span className="text-blue-600"><FacebookIcon /></span>,
      bg: "bg-blue-50",
      label: "Facebook",
      value: "Magichome.editing",
      href: FACEBOOK_URL,
      description: "Follow us on Facebook",
    },
    {
      icon: <InstagramIcon />,
      bg: "bg-pink-50",
      label: "Instagram",
      value: "magichome.editing",
      href: INSTAGRAM_URL,
      description: "Follow us on Instagram",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative px-7 pt-7 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-500 text-xs tracking-widest uppercase" style={{ letterSpacing: "0.18em" }}>
                    Get In Touch
                  </p>
                  <h2 className="text-gray-900 mt-1" style={{ fontSize: "1.5rem", fontFamily: "Georgia, serif" }}>
                    Contact Us
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Reach out via any channel — we respond quickly.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mx-7" />

            {/* Contact items */}
            <div className="px-7 py-5 flex flex-col gap-3">
              {contacts.map((c) => (
                c.isEmail ? (
                  <EmailDropdownButton key={c.label} icon={c.icon} bg={c.bg} label={c.label} value={c.value} />
                ) : (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href && c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex items-center gap-4 p-3.5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group"
                    style={{ textDecoration: "none" }}
                  >
                    <div className={`w-11 h-11 rounded-2xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{c.label}</p>
                      <p className="text-gray-500 text-xs truncate">{c.value}</p>
                    </div>
                    <div className="text-gray-300 group-hover:text-orange-400 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.a>
                )
              ))}
            </div>

            {/* Footer */}
            <div className="px-7 pb-7">
              <p className="text-center text-gray-400 text-xs">
                We typically respond within a few hours ✦
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
