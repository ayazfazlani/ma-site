// components/ServicesWrapper.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
            Custom software solutions
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Software built around{" "}
            <span className="gradient-text">your business</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            ERP, manufacturing software, web applications, and SaaS — designed around how you already work.{" "}
            <Link href="/services/custom-erp" className="font-semibold text-primary-500 hover:underline">
              See ERP systems
            </Link>
            {", "}
            <Link href="/services/manufacturing" className="font-semibold text-primary-500 hover:underline">
              manufacturing software
            </Link>
            {", or "}
            <Link href="/services/web-development" className="font-semibold text-primary-500 hover:underline">
              web applications
            </Link>
            .
          </p>
        </motion.div>

        {children}
      </div>
    </section>
  );
}
