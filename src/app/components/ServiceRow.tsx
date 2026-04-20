import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Service } from "../types/service";

interface ServiceRowProps {
  service: Service;
  index: number;
}

/** Returns true if the text block should appear on the LEFT side */
const textOnLeft = (index: number) => index % 2 === 0;

function getYouTubeEmbedUrl(youtubeUrl: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = youtubeUrl.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  }
  return null;
}

function PriceBlock({ service }: { service: Service }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-4 py-6 min-w-[140px]">
      {/* Vertical divider – visible only on desktop */}
      <div className="hidden lg:flex flex-col items-center gap-5 w-full">
        <div className="flex-1 w-px bg-gray-200" style={{ minHeight: 20 }} />

        <div className="text-center">
          <p className="text-gray-900" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontFamily: "Georgia, serif", lineHeight: 1 }}>
            {service.price}
          </p>
          {service.priceUnit && (
            <p className="text-gray-500 text-sm mt-1">{service.priceUnit}</p>
          )}
        </div>

        <div className="w-px bg-gray-200" style={{ height: 24 }} />

        <div className="text-center">
          <p className="text-gray-900" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontFamily: "Georgia, serif", lineHeight: 1 }}>
            {service.deliveryTime ?? ""}
          </p>
          {service.deliveryTime && (
            <p className="text-gray-500 text-sm mt-1">turnaround</p>
          )}
        </div>

        <div className="flex-1 w-px bg-gray-200" style={{ minHeight: 20 }} />
      </div>

      {/* Mobile: horizontal price strip */}
      <div className="flex lg:hidden flex-row items-center justify-center gap-6 w-full py-2">
        <div className="text-center">
          <p className="text-gray-900" style={{ fontSize: "1.3rem", fontFamily: "Georgia, serif" }}>
            {service.price}
          </p>
          {service.priceUnit && <p className="text-gray-400 text-xs mt-0.5">{service.priceUnit}</p>}
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div className="text-center">
          <p className="text-gray-900" style={{ fontSize: "1.1rem", fontFamily: "Georgia, serif" }}>
            {service.deliveryTime}
          </p>
          <p className="text-gray-400 text-xs mt-0.5">turnaround</p>
        </div>
      </div>
    </div>
  );
}

function TextBlock({ service, filled }: { service: Service; filled?: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-4 py-6 px-2">
      <div>
        <h3
          className="text-gray-900 mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontFamily: "Georgia, serif" }}
        >
          {service.name}
        </h3>
        {service.subtitle && (
          <p className="text-orange-500 text-sm">{service.subtitle}</p>
        )}
      </div>
      <p className="text-black text-base leading-relaxed max-w-md">
        {service.description}
      </p>
      <div>
        <Link
          to={`/service/${service.id}`}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm transition-all duration-300 hover:-translate-y-0.5 ${
            filled
              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-orange-200 hover:shadow-lg"
              : "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          }`}
        >
          READ MORE{" "}
          <span className="text-xs tracking-widest">»</span>
        </Link>
      </div>
    </div>
  );
}

function MediaBlock({ service }: { service: Service }) {
  const pair = service.beforeAfterPairs?.[0];
  if (pair) {
    return (
      <BeforeAfterSlider before={pair.before} after={pair.after} />
    );
  }

  // If service has videos (e.g. Video service), show first YouTube embed
  if (service.videos && service.videos.length > 0) {
    const video = service.videos[0];
    const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
    if (embedUrl) {
      return (
        <div className="w-full overflow-hidden rounded-xl shadow-md" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={embedUrl}
            title={video.title || service.name}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    }
  }

  // Fallback: cover image
  return (
    <div className="w-full overflow-hidden rounded-xl shadow-md" style={{ aspectRatio: "4/3" }}>
      <img
        src={service.coverImage}
        alt={service.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function ServiceRow({ service, index }: ServiceRowProps) {
  const leftIsText = textOnLeft(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="py-12 lg:py-20"
    >
      {/* Desktop: 2-col layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 items-center">
        {leftIsText ? (
          <>
            <TextBlock service={service} filled={false} />
            <MediaBlock service={service} />
          </>
        ) : (
          <>
            <MediaBlock service={service} />
            <TextBlock service={service} filled={true} />
          </>
        )}
      </div>

      {/* Mobile: stack layout */}
      <div className="flex lg:hidden flex-col gap-6">
        <MediaBlock service={service} />
        <TextBlock service={service} filled={true} />
      </div>
    </motion.div>
  );
}