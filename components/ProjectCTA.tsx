// components/ProjectCTA.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function ProjectCTA() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="discuss-your-project"
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-900" : "bg-slate-50"
      }`}
    >
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-500/[0.04] to-dark-950" />
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-200/15 rounded-full blur-[200px] pointer-events-none" />
      )}

      <div className="container-custom mx-auto relative z-10 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Discuss your{" "}
            <span className="gradient-text">project</span>
          </h2>
          <p
            className={`text-base sm:text-lg mb-4 leading-relaxed ${
              isDark ? "text-neutral-400" : "text-gray-600"
            }`}
          >
            Have a business process that software could improve?
          </p>
          <p
            className={`text-base sm:text-lg mb-10 leading-relaxed ${
              isDark ? "text-neutral-400" : "text-gray-500"
            }`}
          >
            Tell us how your business currently works. We&apos;ll help you identify what should be automated, built, or improved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-lg shadow-xl shadow-primary-500/25 hover:scale-[1.03] transition-all"
            >
              Discuss Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg border transition-all ${
                isDark
                  ? "border-white/10 text-neutral-300 hover:bg-white/[0.04]"
                  : "border-gray-200 text-gray-600 hover:bg-white"
              }`}
            >
              View Case Studies
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
