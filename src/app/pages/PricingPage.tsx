import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SharedHeader } from "../components/SharedHeader";
import { SharedFooter } from "../components/SharedFooter";

// ─── Pricing data ──────────────────────────────────────────────────────────────

interface PricingCard {
  id: string;
  icon: React.ReactNode;
  name: string;
  delivery: string;
  description: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlight?: boolean;
}

function IconStaging() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="44" height="30" rx="3" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <line x1="4" y1="18" x2="48" y2="18" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="16" y1="10" x2="16" y2="40" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M10 28 Q13 23 16 28 Q20 33 24 26 Q28 19 32 26 Q36 33 40 22" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="40" cy="13.5" r="2" fill="#1a1a1a"/>
      <line x1="20" y1="44" x2="32" y2="44" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="40" x2="26" y2="44" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  );
}

function IconEditing() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="22" r="10" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M26 12 V9" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 35 V38" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M33.07 14.93 L35.19 12.81" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.81 31.19 L18.93 29.07" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 22 H39" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M13 22 H16" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="26" cy="22" r="4" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
      <line x1="20" y1="40" x2="32" y2="40" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 40 L20 46 H32 L30 40" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IconDeclutter() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 8 L32 20 H44 L34 28 L38 40 L26 32 L14 40 L18 28 L8 20 H20 Z" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

function IconDayDusk() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32 Q16 16 26 20 Q36 24 44 12" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="38" cy="14" r="4" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
      <path d="M38 8V6M38 22V24M32 14H30M46 14H44" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="36" x2="44" y2="36" stroke="#1a1a1a" strokeWidth="1.5"/>
      <rect x="12" y="36" width="28" height="8" rx="1" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IconRetouch() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 38 L36 16 L44 24 L22 46 Z" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <path d="M32 12 L40 20" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 38 L8 44 L8 44 L14 44 L14 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IconFloorplan() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="36" height="36" rx="2" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <line x1="8" y1="26" x2="30" y2="26" stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1="30" y1="8" x2="30" y2="44" stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1="8" y1="36" x2="30" y2="36" stroke="#1a1a1a" strokeWidth="1.5"/>
    </svg>
  );
}

const pricingCards: PricingCard[] = [
  {
    id: "virtual-staging",
    icon: <IconStaging />,
    name: "Virtual Staging",
    delivery: "Up to 12–24hrs Image Delivery",
    description: "Hyper-Realistic staging utilizing designer brands, curated by world-class interior designers.",
    price: "From $15",
    priceNote: "per image",
    features: [
      "01. Declutter",
      "02. Declutter + Virtual Staging",
      "03. Vacant home virtual staging",
    ],
  },
  {
    id: "photos",
    icon: <IconEditing />,
    name: "Photo Editing",
    delivery: "Up to 12–24hrs Image Delivery",
    description: "We use a 16-step process to make sure every photo you receive looks amazing.",
    price: "From $0.5",
    priceNote: "per image",
    highlight: true,
    features: [
      "01. White Balancing",
      "02. Image Sharpening",
      "03. Vertical & Horizontal Straightening",
      "04. Remove minor blemishes",
      "05. Lens Distortion Removal",
      "06. Brightness & Contrast Adjustment",
      "07. Outdoor Sky Replacement",
      "08. HD Enfusing",
      "09. Remove Pool Cleaners from Water",
      "10. Tone Adjustment",
      "11. TV Screen Replacement",
    ],
  },
  {
    id: "retouch",
    icon: <IconRetouch />,
    name: "Retouch",
    delivery: "Up to 12–24hrs Image Delivery",
    description: "Advanced retouching to bring every property photo to its full potential.",
    price: "From$1.0",
    priceNote: "per image",
    features: [
      "01. Change grass",
      "02. Fix lens distortion",
      "03. Window pull / twilight swap",
      "04. Object removal",
      "05. Remove unwanted objects",
    ],
  },
  {
    id: "day-to-dusk",
    icon: <IconDayDusk />,
    name: "Day to Dusk",
    delivery: "Up to 12–24hrs Image Delivery",
    description: "Transform daytime exterior shots into stunning dusk/twilight images that impress.",
    price: "From $5.0",
    priceNote: "per image",
    features: [
      "01. Sky replacement to dusk/sunset",
      "02. Interior light warmup",
      "03. Garden / landscape lighting",
      "04. Pool & water effects",
      "05. Exterior ambient glow",
    ],
  },
  {
    id: "declutter",
    icon: <IconDeclutter />,
    name: "Video",
    delivery: "Up to 12–24hrs Image Delivery",
    description: "Big or small we can remove anything from your photos.",
    price: "From $20",
    priceNote: "per object",
    features: [
      "01. Listing Video",
      "02. Virtual Tour",
      "03. Lifestyle Video",
      "04. Drone Footage",
      "05. Highlight Reel",
    ],
  },
  {
    id: "floorplan",
    icon: <IconFloorplan />,
    name: "Floor Plan",
    delivery: "Up to 12–24hrs Delivery",
    description: "Clean, accurate and beautifully presented floor plans from your sketches or photos.",
    price: "From $10",
    priceNote: "per floor plan",
    features: [
      "01. 2D Floor Plan",
      "02. 3D Floor Plan",
      "03. Coloured Floor Plan",
      "04. Furniture included",
      "05. Measurements labelled",
    ],
  },
];

// ─── Card component ────────────────────────────────────────────────────────────

function PriceCard({ card, index }: { card: PricingCard; index: number }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300"
      style={card.highlight ? { boxShadow: "0 4px 30px rgba(249,115,22,0.12)", borderColor: "#f97316" } : {}}
    >
      {card.highlight && (
        <div className="bg-orange-500 text-white text-lg text-center py-1.5 tracking-widest" style={{ letterSpacing: "0.12em", fontWeight: 600 }}>
          MOST POPULAR
        </div>
      )}

      <div className="flex flex-col flex-1 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          {card.icon}
        </div>

        {/* Name */}
        <h3 className="text-center text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif", fontSize: "2rem" }}>
          {card.name}
        </h3>

        {/* Delivery */}
        <p className="text-center text-orange-500 text-xl mb-4" style={{ fontWeight: 500 }}>
          {card.delivery}
        </p>

        {/* Description */}
        <p className="text-center text-gray-500 text-xl leading-relaxed mb-6">
          {card.description}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-6" />

        {/* Price */}
        <div className="text-center mb-6">
          <span className="text-gray-900" style={{ fontFamily: "Times New Roman", fontSize: "2.8rem", fontWeight: 700, lineHeight: 1 }}>
            {card.price}
          </span>
          {card.priceNote && (
            <p className="text-gray-400 text-lg mt-1">{card.priceNote}</p>
          )}
        </div>

        {/* Features */}
        <ul className="flex-1 space-y-2 mb-8">
          {card.features.map((f, i) => (
            <li key={i} className="text-gray-500 text-xl text-center" style={{ lineHeight: 1.6 }}>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={"https://mail.google.com/mail/?view=cm&fs=1&to=Magichome.editing@gmail.com&su=" + encodeURIComponent(`Inquiry: ${card.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block text-center py-3 rounded-full text-xl transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: card.highlight ? "#f97316" : "#111",
            color: "white",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textDecoration: "none",
          }}
        >
          START NOW
        </a>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function PricingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SharedHeader />

      <main className="pt-[68px]">
        {/* Header section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Top rule */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200" />
                <p className="text-gray-900 tracking-widest text-xl" style={{ fontWeight: 700, letterSpacing: "0.2em" }}>
                  PHOTO EDITING PRICING
                </p>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <p className="text-gray-500 text-xl max-w-xl mx-auto leading-relaxed">
                Transparent, competitive rates for every real estate editing need. No hidden fees — just beautiful results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cards grid */}
        <section className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingCards.map((card, i) => (
                <PriceCard key={card.id} card={card} index={i} />
              ))}
            </div>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-gray-400 text-lg mt-12 leading-relaxed"
            >
              All prices are in USD per image. Volume discounts available — contact us for custom packages.
              <br />
              Turnaround times start from receipt of confirmed payment.
            </motion.p>

            {/* Custom quote CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 border border-gray-200 rounded-2xl p-10 text-center"
            >
              <h2 className="text-gray-900 mb-3" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 3.2vw, 2.6rem)" }}>
                Need a custom quote?
              </h2>
              <p className="text-gray-500 text-xl mb-6 max-w-lg mx-auto">
                Have a large volume of images, a recurring project, or a unique editing requirement? Reach out — we'll tailor a package that works for you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=Magichome.editing@gmail.com&su=Custom%20Quote%20Request"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded text-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-200"
                  style={{ fontWeight: 600 }}
                >
                  Get in Touch
                </a>
                <Link
                  to="/"
                  className="px-8 py-3 border-2 border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500 rounded text-xl transition-all duration-300"
                >
                  View Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}
