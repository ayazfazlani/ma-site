// components/ServicesWrapper.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ServicesWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-950" : "bg-white"
      }`}
      id="services"
    >
      <div
        className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-primary-500/[0.03]" : "bg-primary-200/20"
        }`}
      />
      
      <div className="container-custom mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
              isDark
                ? "glass text-primary-400"
                : "bg-primary-50 border border-primary-200/60 text-primary-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Our Services
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Our Core <span className="gradient-text">Services</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            Comprehensive software development solutions tailored to grow your
            business and establish your online presence in the competitive digital landscape.
          </p>
        </motion.div>

        {children}
      </div>
    </section>
  );
}
