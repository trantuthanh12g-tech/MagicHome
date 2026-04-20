import { motion } from "motion/react";

export function WhoWeAre() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image with Better Blur */}
      <div className="absolute inset-0">
        <img
          src={`/Who We Are/Who We Are.jpg`}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white/70 rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h2
            className="mb-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontFamily: "Times New Roman, serif",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="text-orange-500">WHO</span>
            <span className="text-gray-900"> WE ARE?</span>
          </h2>

      <br />


          <div className="space-y-3 text-black leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.4rem)",
                }}
              >
                Magichome is a large team of editors from Vietnam.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.4rem)",
                }}
              >
                With the advantage of many years of experience and a professional post-production process.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.4rem)",
                }}
              >
                The photos we edit are always of excellent quality, consistently meeting market demands.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.4rem)",
                }}
              >
                We offer a wide variety of styles, which can be customized to your preferences
              </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
