// components/WhoThisIsFor.tsx
"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const fits = [
  "Your business relies heavily on Excel, notebooks, or WhatsApp to run operations.",
  "Your existing software doesn't match how your team actually works.",
  "You're manually moving data between different systems.",
  "You need an internal business application or custom dashboard.",
  "You need ERP customized around your operations — not a generic suite.",
  "You're building a SaaS product and need a technical partner.",
];

export default function WhoThisIsFor() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-900" : "bg-slate-50"
      }`}
    >
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      )}

      <div className="container-custom mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
                isDark
                  ? "glass text-accent-400"
                  : "bg-accent-300/10 border border-accent-400/20 text-accent-500"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
              Who this is for
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Is your business outgrowing{" "}
              <span className="gradient-text">spreadsheets?</span>
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
              MA Softs is a good fit if you need software that follows your workflow — not the other way around. Not sure what you need? That&apos;s okay.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/35 transition-all group"
            >
              Discuss Your Requirements
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="lg:col-span-7 space-y-3">
            {fits.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-start gap-4 p-4 sm:p-5 rounded-2xl border ${
                  isDark
                    ? "bg-white/[0.02] border-white/[0.05]"
                    : "bg-white border-gray-100 shadow-sm"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-success-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-success-500" />
                </div>
                <p className={`text-[15px] leading-relaxed ${isDark ? "text-neutral-300" : "text-gray-700"}`}>
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
