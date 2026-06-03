import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface HeroSliderProps {
  images: string[];
}

const SLIDE_DURATION = 6000;

export function HeroSlider({ images }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setSlideKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setTimeout(advance, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, images.length]);

  if (images.length === 0) {
    return <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slides with Ken Burns */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slideKey}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.img
            src={images[currentIndex]}
            alt=""
            className="w-full h-full object-cover"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (timerRef.current) clearTimeout(timerRef.current);
                setCurrentIndex(i);
                setSlideKey((prev) => prev + 1);
              }}
              className={`transition-all duration-500 rounded-full ${
                i === currentIndex
                  ? "w-7 h-2 bg-amber-400"
                  : "w-2 h-2 bg-white/35 hover:bg-white/65"
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-white/40" />
      </motion.div>
    </div>
  );
}
