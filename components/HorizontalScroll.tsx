// components/HorizontalScroll.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

// Marquee-style scrolling logos section for brand trust
const brands = [
  "TechSolutions",
  "StyleMart",
  "EduLearn",
  "HealthFirst",
  "FoodieHub",
  "TravelPK",
  "PropEstate",
  "FinanceGo",
  "CloudNine",
  "GreenEnergy",
];

export default function HorizontalScroll() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`py-16 relative overflow-hidden border-y ${
        isDark
          ? "bg-dark-900 border-white/[0.03]"
          : "bg-gray-50/50 border-gray-100"
      }`}
    >
      {/* Background */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950" />
      )}

      <div className="container-custom mx-auto relative z-10 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center text-sm uppercase tracking-[0.2em] font-medium ${
            isDark ? "text-neutral-500" : "text-gray-400"
          }`}
        >
          Trusted by industry leaders
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative z-10">
        {/* Fade edges */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
            isDark
              ? "bg-gradient-to-r from-dark-900 to-transparent"
              : "bg-gradient-to-r from-gray-50/50 to-transparent"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
            isDark
              ? "bg-gradient-to-l from-dark-900 to-transparent"
              : "bg-gradient-to-l from-gray-50/50 to-transparent"
          }`}
        />

        <div className="flex gap-16 animate-[marquee_30s_linear_infinite]">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 flex items-center px-6 py-3"
            >
              <span
                className={`text-2xl font-bold transition-colors duration-500 whitespace-nowrap select-none tracking-tight ${
                  isDark
                    ? "text-white/[0.08] hover:text-white/20"
                    : "text-gray-200 hover:text-gray-300"
                }`}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
