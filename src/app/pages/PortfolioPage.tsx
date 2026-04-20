import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { SharedHeader } from "../components/SharedHeader";
import { SharedFooter } from "../components/SharedFooter";
import { CtaBanner } from "../components/CtaBanner";
import { portfolioImages, heroImages } from "../data/initialServices";

export function PortfolioPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i === null ? 0 : (i + 1) % portfolioImages.length));
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i === null ? 0 : (i - 1 + portfolioImages.length) % portfolioImages.length));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  const coverPhoto = heroImages[0];

  return (
    <div className="min-h-screen bg-white">
      <SharedHeader />

      {/* ── HERO BANNER ── */}
      <section className="relative pt-[68px] overflow-hidden" style={{ height: "clamp(220px, 32vw, 360px)" }}>
        <img
          src={coverPhoto}
          alt="Portfolio"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-orange-400 text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "0.2em" }}>
              Our Work
            </p>
            <h1
              className="text-white mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "Georgia, serif", lineHeight: 1.1 }}
            >
              Portfolio
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">
              Every image transformed to captivate buyers — our best real estate photo editing work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {portfolioImages.length === 0 ? (
            <div className="text-center py-24">
              <Images className="w-20 h-20 mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400">No portfolio images yet.</p>
              <p className="text-gray-300 text-sm mt-1">Add images to the portfolioImages array in services.ts</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-400 text-sm">
                  Showing <span className="text-gray-700" style={{ fontWeight: 600 }}>{portfolioImages.length}</span> images
                </p>
              </div>

              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {portfolioImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 8) * 0.06 }}
                    className="break-inside-avoid rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group mb-3 cursor-pointer relative"
                    onClick={() => setLightboxIdx(i)}
                  >
                    <img
                      src={img}
                      alt={`Portfolio ${i + 1}`}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA ── */}

      {/* ── FOOTER ── */}
      <SharedFooter />

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 z-[9998] flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10 text-xl"
              onClick={() => setLightboxIdx(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/50 rounded-full text-white/70 text-sm z-10">
              {lightboxIdx + 1} / {portfolioImages.length}
            </div>

            {/* Prev */}
            {portfolioImages.length > 1 && (
              <button
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((i) => (i === null ? 0 : (i - 1 + portfolioImages.length) % portfolioImages.length));
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <motion.img
              key={lightboxIdx}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.22 }}
              src={portfolioImages[lightboxIdx]}
              alt={`Portfolio ${lightboxIdx + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{ maxHeight: "85vh", maxWidth: "90vw" }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {portfolioImages.length > 1 && (
              <button
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((i) => (i === null ? 0 : (i + 1) % portfolioImages.length));
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
