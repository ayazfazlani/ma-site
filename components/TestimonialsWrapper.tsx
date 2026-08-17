// components/TestimonialsWrapper.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function TestimonialsWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-950" : "bg-white"
      }`}
    >
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-primary-500/[0.03]" : "bg-primary-100/20"
        }`}
      />

      <div className="container-custom mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
              isDark
                ? "glass text-success-400"
                : "bg-success-500/10 border border-success-400/20 text-success-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success-400" />
            Social Proof
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            What clients <span className="gradient-text">say</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            Feedback from teams we&apos;ve built software with.
          </p>
        </motion.div>

        {children}
      </div>
    </section>
  );
}
