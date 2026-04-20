import { Link } from "react-router-dom";
import { Service } from "../types/service";
import { motion } from "motion/react";
import { ArrowRight, Play, Image as ImageIcon } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const hasVideos = (service.videos?.length ?? 0) > 0;

  return (
    <Link to={`/service/${service.id}`} className="block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-shadow"
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <motion.img
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            src={service.coverImage}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3
              className="text-gray-900 group-hover:text-amber-600 transition-colors"
              style={{ fontSize: "1.15rem", fontFamily: "Georgia, serif" }}
            >
              {service.name}
            </h3>
            <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
          </div>
          <p className="text-gray-500 text-lg mb-4 leading-relaxed line-clamp-2">{service.description}</p>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              {service.images.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  {service.images.length} {service.images.length === 1 ? "sample" : "samples"}
                </span>
              )}
              {hasVideos && (
                <span className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-amber-400" />
                  {service.videos!.length} {service.videos!.length === 1 ? "video" : "videos"}
                </span>
              )}
            </div>
            {service.price && (
              <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                {service.price}
              </span>
            )}
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </motion.div>
    </Link>
  );
}