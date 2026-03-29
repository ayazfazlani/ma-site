// components/PortfolioWrapper.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function PortfolioWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-950" : "bg-white"
      }`}
      id="portfolio"
    >
      <div
        className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-primary-500/[0.03]" : "bg-primary-200/20"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none ${
          isDark ? "bg-accent-400/[0.02]" : "bg-accent-300/10"
        }`}
      />

      <div className="container-custom mx-auto relative z-10 mb-12 lg:mb-16">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
              isDark
                ? "glass text-primary-400"
                : "bg-primary-50 border border-primary-200/60 text-primary-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Proof of Excellence
          </span>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            My Featured <span className="gradient-text">Works</span>
          </h2>
          <p className={`text-lg leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            A selection of complex software solutions and high-performance web applications 
            crafted for startups and established businesses.
          </p>
        </motion.div>
      </div>

      {children}
    </section>
  );
}
