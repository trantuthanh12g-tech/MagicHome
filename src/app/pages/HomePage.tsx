import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  ArrowRight,
  ChevronRight,
  Check,
  X,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useServices } from "../hooks/useServices";
import {
  heroImages,
  stepByStepImages,
  portfolioImages,
} from "../data/initialServices";
import { SharedHeader } from "../components/SharedHeader";
import { SharedFooter } from "../components/SharedFooter";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { CtaBanner } from "../components/CtaBanner";
import { ServiceRow } from "../components/ServiceRow";
import { HeroSlider } from "../components/HeroSlider";
import { WhoWeAre } from "../components/WhoWeAre";

const PORTFOLIO_PREVIEW_COUNT = 12;

const features = [
  {
    num: "01",
    title: "Superior Quality",
    desc: "Every image hand-edited by professionals with 5+ years in real estate photography.",
  },
  {
    num: "02",
    title: "Fast Turnaround",
    desc: "Receive your finished images within 12–24 hours. Rush delivery available on request.",
  },
  {
    num: "03",
    title: "Unlimited Revisions",
    desc: "Not satisfied? We revise until you love it — completely free of charge.",
  },
  {
    num: "04",
    title: "Competitive Pricing",
    desc: "Professional quality at rates designed for busy real estate photographers.",
  },
];

const steps = [
  {
    step: "01",
    title: "Send Your Photos",
    desc: "Upload your raw real estate photos to us via email, Google Drive, or WeTransfer, Dropbox.",
  },
  {
    step: "02",
    title: "We Edit & Enhance",
    desc: "Our expert team applies color correction, sky replacement, HDR blending, and more.",
  },
  {
    step: "03",
    title: "Receive & Approve",
    desc: "Get your polished images back in 12–24 hours. Request revisions until you're 100% happy.",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Real Estate Photographer, Sydney",
    text: "MagicHome has completely transformed my workflow. The quality is outstanding and delivery is always on time. My clients love the results!",
    rating: 5,
  },
  {
    name: "James Kowalski",
    role: "Property Listing Agent, Melbourne",
    text: "The virtual staging service is incredible — empty rooms become beautifully furnished in under 24 hours. Definitely recommend!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Real Estate Photographer, Auckland",
    text: "I've tried many editing services but MagicHome stands out for their attention to detail. The day-to-dusk transformations look truly professional.",
    rating: 5,
  },
  {
    name: "Michael Torres",
    role: "Property Developer, Brisbane",
    text: "Exceptional service! The photo editing team really understands what sells properties. My listing turnaround time has improved significantly.",
    rating: 5,
  },
  {
    name: "Lisa Anderson",
    role: "Real Estate Photographer, Perth",
    text: "The floorplan renderings are absolutely perfect. My buyers appreciate the clarity and it helps them make decisions faster. Highly satisfied!",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Real Estate Agency Manager, Adelaide",
    text: "We've been working with MagicHome for over a year now. Their consistency, professionalism, and support team are unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Rebecca Wilson",
    role: "Property Photographer, Gold Coast",
    text: "The grass replacement service is game-changing. My portfolio now looks amazing and I can focus more on taking photos and less on editing.",
    rating: 5,
  },
  {
    name: "Christopher Hayes",
    role: "Commercial Real Estate Agent, Sydney",
    text: "Rapid turnaround without compromising quality. MagicHome has become essential to our business operations. Couldn't ask for better service!",
    rating: 5,
  },
  {
    name: "Jessica Martinez",
    role: "Real Estate Photographer, Melbourne",
    text: "Their attention to color correction and lighting adjustments is remarkable. Every photo looks natural yet professionally enhanced. Love working with them!",
    rating: 5,
  },
];

const statsData = [
  {
    target: 6,
    min: 1,
    suffix: "+ years",
    label: "Of Experience",
    duration: 2000,
  },
  {
    target: 99,
    min: 0,
    suffix: "%",
    label: "On Time Delivery",
    duration: 2200,
  },
  {
    target: 2500,
    min: 0,
    suffix: "+",
    label: "Photos Edited Daily",
    duration: 2500,
    separator: true,
  },
];

export function HomePage() {
  const { services } = useServices();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(
    null,
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const previewImages = portfolioImages.slice(
      0,
      PORTFOLIO_PREVIEW_COUNT,
    );
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight")
        setLightboxIdx((i) =>
          i === null ? 0 : (i + 1) % previewImages.length,
        );
      if (e.key === "ArrowLeft")
        setLightboxIdx((i) =>
          i === null
            ? 0
            : (i - 1 + previewImages.length) %
              previewImages.length,
        );
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIdx]);

  // Auto-slide testimonials
  useEffect(() => {
    const totalPages = Math.ceil(testimonials.length / 3);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % totalPages);
    }, 5000); // Change page every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const coverPhotos = heroImages[0];
  const coverDaytoDusk = heroImages[1];
  const coverStaging = heroImages[3];
  const coverVideo = heroImages[5];
  const stepByStepImg = stepByStepImages[0] ?? coverDaytoDusk;

  // "Excellence in Every Edit" images: Photos, DayToDusk, Retouch, VHS — index [1] of each service's images
  const photos1 =
    services[0]?.images?.[0]?.url ?? heroImages[0];
  const dte1 = services[1]?.images?.[0]?.url ?? heroImages[1];
  const retouch1 =
    services[2]?.images?.[0]?.url ?? heroImages[2];
  const vhs1 = services[3]?.images?.[0]?.url ?? heroImages[3];

  // Portfolio preview: first 12 images from portfolioImages array
  const previewImages = portfolioImages.slice(
    0,
    PORTFOLIO_PREVIEW_COUNT,
  );

  return (
    <div className="min-h-screen bg-white">
      <SharedHeader />

      {/* ── HERO ── */}
      <section
        id="home"
        className="pt-[68px] min-h-screen flex items-center bg-gray-50 relative overflow-hidden"
      >
        {/* Background slideshow with HeroSlider */}
        <div className="absolute inset-0 z-0">
          <HeroSlider images={heroImages} />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-gray-50/20 to-gray-50/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Highlighted background for text */}
              <div className="bg-white/60 rounded-2xl shadow-xl p-8 md:p-12 mb-6">
                <h1
                  className="text-gray-900 mb-6"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.4rem)",
                    fontFamily: "Georgia, serif",
                    lineHeight: 1.15,
                  }}
                >
                  The Best Real <span className="text-orange-500">Estate Photo</span> <span className="text-gray-900">&</span> <span className="text-orange-500">Video Editing</span> Services
                </h1>
                <p
                  className="text-black mb-8 leading-relaxed max-w-lg"
                  style={{
                    fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                  }}
                >
                  Transform your property images into stunning visuals and captivating videos that sell.
                  <br />
                  Fast turnaround, professional quality, and affordable pricing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#services"
                    className="px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded transition-all duration-300 hover:shadow-lg hover:shadow-orange-200 text-sm"
                  >
                    OUR SERVICES
                  </a>
                  <Link
                    to="/portfolio"
                    className="px-7 py-3 border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-500 rounded transition-all duration-300 text-sm"
                  >
                    View Portfolio
                  </Link>
                </div>
              </div>
            </motion.div>
            {/* Right: image collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3 relative">
                <div
                  className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-xl"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={coverPhotos}
                    alt="Real estate photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="rounded-2xl overflow-hidden shadow-xl"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={coverDaytoDusk}
                    alt="Day to dusk"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="rounded-2xl overflow-hidden shadow-xl"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={coverStaging}
                    alt="Virtual staging"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p
                      className="text-gray-900 text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      6-8 Hours Delivery
                    </p>
                    <p className="text-gray-400 text-xs">
                      Rush available
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="border border-gray-200 rounded-2xl px-8 py-10 text-center hover:border-orange-200 hover:shadow-md transition-all duration-300"
              >
                <p
                  className="text-gray-900 mb-2"
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                    fontFamily: "Georgia, serif",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter
                    target={stat.target}
                    min={stat.min}
                    suffix={stat.suffix}
                    duration={stat.duration}
                    separator={!!stat.separator}
                  />
                </p>
                <p
                  className="text-gray-500 text-sm mt-2"
                  style={{ fontWeight: 600 }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER (top) ── */}
              
      {/* removed */}

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p
              className="text-orange-500 text-xs tracking-widest uppercase mb-3"
              style={{ letterSpacing: "0.2em" }}
            >
              OUR SERVICES
            </p>
            <h2
              className="text-gray-900"
              style={{
                fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
                fontFamily: "Georgia, serif",
              }}
            >
              OUR RESULTS ARE NEXT LEVEL
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="h-0.5 w-16 bg-orange-500 rounded" />
            </div>
          </motion.div>

          <div className="divide-y divide-black">
            {services.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO GALLERY (preview: first 12) ── */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p
              className="text-orange-500 text-xs tracking-widest uppercase mb-3"
              style={{ letterSpacing: "0.2em" }}
            >
              Our Work
            </p>
            <h2
              className="text-gray-900"
              style={{
                fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
                fontFamily: "Georgia, serif",
              }}
            >
              Portfolio
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="h-0.5 w-15 bg-orange-500 rounded" />
            </div>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
              A selection of our best real estate photo editing
              work — every image transformed to captivate
              buyers.
            </p>
          </motion.div>

          {previewImages.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              No portfolio images yet. Add images to the
              portfolioImages array in services.ts
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {previewImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 8) * 0.06 }}
                  className="break-inside-avoid rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group mb-3 cursor-pointer relative"
                  onClick={() => setLightboxIdx(i)}
                >
                  <img
                    src={img}
                    alt={`Portfolio ${i + 1}`}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded transition-all duration-300 text-sm hover:shadow-lg hover:shadow-orange-200"
            >
              View All Portfolio{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <WhoWeAre />

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p
              className="text-orange-500 text-xs tracking-widest uppercase mb-3"
              style={{ letterSpacing: "0.2em" }}
            >
              Testimonials
            </p>
            <h2
              className="text-gray-900"
              style={{
                fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
                fontFamily: "Georgia, serif",
              }}
            >
              What Our Clients Say
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="h-0.5 w-16 bg-orange-500 rounded" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(activeTestimonial * 3, (activeTestimonial + 1) * 3).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, si) => (
                    <Star
                      key={si}
                      className="w-4 h-4 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-sm"
                    style={{ fontWeight: 700 }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="text-gray-900 text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {[...Array(Math.ceil(testimonials.length / 3))].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-6 h-2 bg-orange-500" : "w-2 h-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US: EXCELLENCE & STEP BY STEP ── */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={`/Why Choose Us/Why Choose Us.jpg`}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Common Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-gray-900"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontFamily: "Georgia, serif",
                textShadow: "0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.7)",
              }}
            >
              Why Choose Us
            </h2>
          </motion.div>

          {/* Two Columns Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-stretch mb-16">
            {/* LEFT COLUMN: Excellence in Every Edit */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h3
                className="text-gray-900 mb-8 text-center"
                style={{
                  fontSize: "clamp(1.6rem, 2.7vw, 2.2rem)",
                  fontFamily: "Georgia, serif",
                  textShadow: "0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7)",
                }}
              >
                Excellence in Every Edit
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-4 items-center text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all h-full"
                  >
                    <div
                      className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      {f.num}
                    </div>
                    <div>
                      <h4
                        className="text-gray-900 mb-2"
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 600,
                        }}
                      >
                        {f.title}
                      </h4>
                      <p className="text-black text-base leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Step by Step */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h3
                className="text-gray-900 mb-8 text-center"
                style={{
                  fontSize: "clamp(1.6rem, 2.7vw, 2.2rem)",
                  fontFamily: "Georgia, serif",
                  textShadow: "0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7)",
                }}
              >
                Step by Step
              </h3>

              <div className="space-y-8 flex-1 flex flex-col justify-between">
                {steps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-5 bg-[#f9fafb] p-6 rounded-xl border border-transparent shadow-sm hover:shadow-lg hover:border-orange-200 transition-all flex-1"
                  >
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center text-orange-500 leading-none"
                      style={{
                        fontFamily: "Times New Roman, serif",
                        fontSize: "2.1rem",
                        fontWeight: 700,
                        lineHeight: 1,
                        transform: "translateY(15px)",
                      }}
                    >
                      {s.step}
                    </div>
                    <div className="pt-1">
                      <h4
                        className="text-black mb-2"
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 600,
                        }}
                      >
                        {s.title}
                      </h4>
                      <p className="text-black text-base leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Start Today Button - Centered below both columns */}
          <div className="text-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Magichome.editing@gmail.com&su=Start%20Today%20Inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-14 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 hover:shadow-xl text-lg font-semibold"
            >
              Start Today <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER (top) ── */}
      <CtaBanner />
      {/* ── FOOTER ── */}
      <SharedFooter />

      {/* ── PORTFOLIO LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={previewImages[lightboxIdx]}
                  alt={`Portfolio ${lightboxIdx + 1}`}
                  className="w-full object-cover"
                />
                <div
                  className="absolute top-4 right-4 bg-white rounded-full shadow-md p-2 cursor-pointer"
                  onClick={() => setLightboxIdx(null)}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </div>
                <div
                  className="absolute bottom-4 left-4 bg-white rounded-full shadow-md p-2 cursor-pointer"
                  onClick={() =>
                    setLightboxIdx((i) =>
                      i === null
                        ? 0
                        : (i - 1 + previewImages.length) %
                          previewImages.length,
                    )
                  }
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </div>
                <div
                  className="absolute bottom-4 right-4 bg-white rounded-full shadow-md p-2 cursor-pointer"
                  onClick={() =>
                    setLightboxIdx((i) =>
                      i === null
                        ? 0
                        : (i + 1) % previewImages.length,
                    )
                  }
                >
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
