import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Mail, X } from "lucide-react";

const EMAIL = "Magichome.editing@gmail.com";
const WHATSAPP = "84385603388";
const FACEBOOK_URL = "https://www.facebook.com/magichome.editing";
const INSTAGRAM_URL = "https://www.instagram.com/magichome.editing";
const BUBBLE_SIZE = 56;
const EDGE_MARGIN = 16;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
      style={{ fill: "url(#ig-gradient)" }}>
      <defs>
        <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
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

export function ContactBubble() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Sync pos to ref
  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  // Init position bottom-right
  useEffect(() => {
    const x = window.innerWidth - BUBBLE_SIZE - EDGE_MARGIN;
    const y = window.innerHeight - BUBBLE_SIZE - 80;
    setPos({ x, y });
    posRef.current = { x, y };
    setReady(true);
  }, []);

  // Re-snap to nearest edge on window resize
  useEffect(() => {
    const handleResize = () => {
      const current = posRef.current;
      const centerX = current.x + BUBBLE_SIZE / 2;
      const snapX =
        centerX < window.innerWidth / 2
          ? EDGE_MARGIN
          : window.innerWidth - BUBBLE_SIZE - EDGE_MARGIN;
      const clampedY = Math.max(
        EDGE_MARGIN,
        Math.min(window.innerHeight - BUBBLE_SIZE - EDGE_MARGIN, current.y)
      );
      setIsTransitioning(true);
      setPos({ x: snapX, y: clampedY });
      setTimeout(() => setIsTransitioning(false), 400);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    hasDragged.current = false;
    setIsTransitioning(false);
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
    bubbleRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);
    if (dx > 4 || dy > 4) hasDragged.current = true;

    const newX = Math.max(0, Math.min(window.innerWidth - BUBBLE_SIZE, e.clientX - dragOffset.current.x));
    const newY = Math.max(0, Math.min(window.innerHeight - BUBBLE_SIZE, e.clientY - dragOffset.current.y));
    setPos({ x: newX, y: newY });
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Snap to nearest horizontal edge
    const current = posRef.current;
    const centerX = current.x + BUBBLE_SIZE / 2;
    const snapX =
      centerX < window.innerWidth / 2
        ? EDGE_MARGIN
        : window.innerWidth - BUBBLE_SIZE - EDGE_MARGIN;

    const clampedY = Math.max(
      EDGE_MARGIN,
      Math.min(window.innerHeight - BUBBLE_SIZE - EDGE_MARGIN, current.y)
    );

    setIsTransitioning(true);
    setPos({ x: snapX, y: clampedY });

    // Remove transition flag after animation
    const timer = setTimeout(() => setIsTransitioning(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasDragged.current) {
      setIsOpen((prev) => !prev);
    }
    hasDragged.current = false;
  }, []);

  if (!ready) return null;

  const showAbove = pos.y > window.innerHeight / 2;
  const showLeft = pos.x > window.innerWidth / 2;

  return (
    <div
      ref={bubbleRef}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 99999,
        touchAction: "none",
        userSelect: "none",
        cursor: isDragging.current ? "grabbing" : "grab",
        transition: isTransitioning
          ? "left 0.38s cubic-bezier(0.34,1.56,0.64,1), top 0.38s cubic-bezier(0.34,1.56,0.64,1)"
          : "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      {/* Popup options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            style={{
              position: "absolute",
              bottom: showAbove ? BUBBLE_SIZE + 12 : "auto",
              top: showAbove ? "auto" : BUBBLE_SIZE + 12,
              right: showLeft ? 0 : "auto",
              left: showLeft ? "auto" : 0,
            }}
            className="flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Email */}
            <motion.a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-2xl shadow-xl border border-gray-100 text-sm whitespace-nowrap hover:shadow-2xl transition-shadow cursor-pointer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs leading-tight">Email</p>
                <p className="text-gray-400 text-xs leading-tight">{EMAIL}</p>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-2xl shadow-xl border border-gray-100 text-sm whitespace-nowrap hover:shadow-2xl transition-shadow cursor-pointer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs leading-tight">WhatsApp</p>
                <p className="text-gray-400 text-xs leading-tight">+{WHATSAPP}</p>
              </div>
            </motion.a>

            {/* Facebook */}
            <motion.a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-2xl shadow-xl border border-gray-100 text-sm whitespace-nowrap hover:shadow-2xl transition-shadow cursor-pointer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FacebookIcon />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs leading-tight">Facebook</p>
                <p className="text-gray-400 text-xs leading-tight">Magichome</p>
              </div>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-2xl shadow-xl border border-gray-100 text-sm whitespace-nowrap hover:shadow-2xl transition-shadow cursor-pointer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                <InstagramIcon />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs leading-tight">Instagram</p>
                <p className="text-gray-400 text-xs leading-tight">Magichome</p>
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main bubble */}
      <motion.div
        animate={{
          scale: isOpen ? 0.92 : 1,
          rotate: isOpen ? 45 : 0,
        }}
        whileHover={{ scale: isOpen ? 0.92 : 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative flex items-center justify-center"
        style={{
          width: BUBBLE_SIZE,
          height: BUBBLE_SIZE,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f59e0b, #f97316)",
          boxShadow: "0 8px 32px rgba(245,158,11,0.45), 0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <X className="w-6 h-6 text-white" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid #f59e0b",
              pointerEvents: "none",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}