import { useParams, Link, useNavigate } from "react-router-dom";
import { useServices } from "../hooks/useServices";
import { ArrowLeft, Image as ImageIcon, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { SharedHeader } from "../components/SharedHeader";
import { SharedFooter } from "../components/SharedFooter";

function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  }
  return null;
}

export function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { getServiceById } = useServices();
  const navigate = useNavigate();
  const service = serviceId ? getServiceById(serviceId) : undefined;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-gray-700">Service not found</h2>
          <Link to="/" className="text-amber-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const hasVideos = (service.videos?.length ?? 0) > 0;
  const hasImages = service.images.length > 0;
  const hasBeforeAfter = (service.beforeAfterPairs?.length ?? 0) > 0;

  const openLightbox = (url: string, idx: number) => {
    setSelectedImage(url);
    setSelectedIdx(idx);
  };

  const closeLightbox = () => setSelectedImage(null);

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = (selectedIdx - 1 + service.images.length) % service.images.length;
    setSelectedIdx(newIdx);
    setSelectedImage(service.images[newIdx].url);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = (selectedIdx + 1) % service.images.length;
    setSelectedIdx(newIdx);
    setSelectedImage(service.images[newIdx].url);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Shared Header */}
      <SharedHeader />

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-[68px]" style={{ height: "clamp(260px, 38vw, 420px)" }}>
        <img
          src={service.coverImage}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Back button overlay */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 sm:left-8 flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm z-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-amber-400 text-xs tracking-widest uppercase mb-2" style={{ letterSpacing: "0.2em" }}>
              Magic Home Services
            </p>
            <h1
              className="text-white mb-2"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "Georgia, serif" }}
            >
              {service.name}
            </h1>
            <p className="text-white/70 max-w-2xl text-base sm:text-lg">{service.description}</p>
            <div className="flex items-center gap-5 mt-3 text-white/45 text-sm">
              {hasImages && (
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  {service.images.length} {service.images.length === 1 ? "sample" : "samples"}
                </span>
              )}
              {hasVideos && (
                <span className="flex items-center gap-1.5">
                  <Play className="w-4 h-4" />
                  {service.videos!.length} {service.videos!.length === 1 ? "video" : "videos"}
                </span>
              )}
              {service.price && (
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-xs">
                  {service.price}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* ── Videos ── */}
        {hasVideos && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-8">
              <Play className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <h2 className="text-gray-900" style={{ fontSize: "1.35rem", fontFamily: "Georgia, serif" }}>
                Videos
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.videos!.map((video, index) => {
                const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
                if (!embedUrl) return null;
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-video">
                      <iframe
                        src={embedUrl}
                        title={video.title || `Video ${index + 1}`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    {video.title && (
                      <div className="px-4 py-3 border-t border-gray-50">
                        <p className="text-gray-700 text-sm">{video.title}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Gallery ── */}
        {(hasImages || hasBeforeAfter) && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <ImageIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <h2 className="text-gray-900" style={{ fontSize: "1.35rem", fontFamily: "Georgia, serif" }}>
                Gallery
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ── Before / After Sliders ── */}
            {hasBeforeAfter && (
              <div className="mb-8">
                <p className="text-xs text-gray-400 tracking-widest uppercase mb-4" style={{ letterSpacing: "0.18em" }}>
                  Before &amp; After
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {service.beforeAfterPairs!.map((pair, index) => (
                    <motion.div
                      key={pair.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                      <BeforeAfterSlider
                        before={pair.before}
                        after={pair.after}
                        label={pair.label}
                      />
                    </motion.div>
                  ))}
                </div>

                {hasImages && (
                  <div className="flex items-center gap-3 mt-10 mb-8">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400 tracking-widest uppercase px-2" style={{ letterSpacing: "0.18em" }}>
                      More Samples
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                )}
              </div>
            )}

            {/* Regular image grid — clickable lightbox */}
            {hasImages && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {service.images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => openLightbox(image.url, index)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.5 }}
                        src={image.url}
                        alt={image.caption || service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <ImageIcon className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                    {image.caption && (
                      <div className="px-4 py-3 border-t border-gray-50">
                        <p className="text-gray-500 text-sm">{image.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Empty state */}
        {!hasImages && !hasVideos && !hasBeforeAfter && (
          <div className="text-center py-24">
            <ImageIcon className="w-20 h-20 mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400">No samples yet</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors z-10"
              onClick={closeLightbox}
            >
              ×
            </button>

            {/* Prev */}
            {service.images.length > 1 && (
              <button
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl transition-colors z-10"
                onClick={goPrev}
              >
                ‹
              </button>
            )}

            <motion.img
              key={selectedImage}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{ maxHeight: "85vh", maxWidth: "90vw" }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {service.images.length > 1 && (
              <button
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl transition-colors z-10"
                onClick={goNext}
              >
                ›
              </button>
            )}

            {/* Caption */}
            {service.images[selectedIdx]?.caption && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white/80 text-sm">
                {service.images[selectedIdx].caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SHARED FOOTER ── */}
      <SharedFooter />
    </div>
  );
}
