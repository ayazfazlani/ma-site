"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import type { FaqItem } from "@/lib/faq-data";

type FaqSectionProps = {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
  className?: string;
};

export default function FaqSection({
  title = "Frequently asked questions",
  subtitle,
  items,
  className = "",
}: FaqSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section className={`section-padding ${className}`}>
      <div className="container-custom mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {title}
          </h2>
          {subtitle ? (
            <p className={`text-base sm:text-lg ${isDark ? "text-neutral-400" : "text-gray-600"}`}>{subtitle}</p>
          ) : null}
        </div>

        <ul className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  aria-label={item.question}
                  className={`w-full text-left rounded-2xl border transition-colors px-5 py-4 flex items-start justify-between gap-4 ${
                    isDark
                      ? "bg-white/[0.03] border-white/[0.08] hover:border-white/[0.12] hover:bg-white/[0.05]"
                      : "bg-white border-gray-200 hover:border-primary-200 shadow-sm"
                  }`}
                >
                  <span
                    className={`font-semibold pr-2 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 mt-0.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    } ${isDark ? "text-primary-400" : "text-primary-600"}`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p
                        className={`px-5 pt-2 pb-4 text-[15px] leading-relaxed ${
                          isDark ? "text-neutral-400" : "text-gray-600"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
