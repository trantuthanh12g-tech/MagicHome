import { motion } from "motion/react";

interface CtaBannerProps {
  /** Optional background image for subtle texture */
  backgroundImage?: string;
}

export function CtaBanner({ backgroundImage }: CtaBannerProps) {
  const mailtoHref =
    "mailto:Magichome.editing@gmail.com?subject=Free%20Trial%20Request%20-%203%20Free%20Photos&body=Hello%2C%0A%0AI%20would%20like%20to%20try%20your%20free%20trial%20for%203%20photos.%20Please%20let%20me%20know%20the%20next%20steps.%0A%0AThank%20you!";

  return (
    <div>
      {/* ── Dark text block ── */}
      <div className="relative bg-white overflow-hidden py-14 sm:py-20">
        {backgroundImage && (
          <>
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/80 to-gray-950" />
          </>
        )}

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="border-2 border-black rounded-lg p-8 md:p-12 shadow-2xl bg-white/95">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-900 mb-5"
              style={{
                fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
                fontFamily: "Georgia, serif",
                lineHeight: 1.3,
              }}
            >
              Ready to Transform Your Property Photos?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-gray-700 leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}
            >
              Get 3 free quality check photos and join with many professional realestate photographers who trust us with their photo editing needs.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Orange CTA bar ── */}
      <div className="bg-white">
        <a
          href={mailtoHref}
          className="flex items-center justify-center gap-2 py-4 text-white hover:text-orange-100 transition-colors bg-orange-500 w-full"
          style={{
            letterSpacing: "0.15em",
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            fontWeight: 700,
          }}
        >
          TRY IT NOW!{" "}
          <span className="text-lg" aria-hidden>»</span>
        </a>
      </div>
    </div>
  );
}
