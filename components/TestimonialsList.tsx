// components/TestimonialsList.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function TestimonialsList({ testimonials }: { testimonials: any[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [index, setIndex] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  if (!current) return null;

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <Quote className={`w-full h-full ${isDark ? "text-white" : "text-primary-900"}`} strokeWidth={0.5} />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-8">
              {[...Array(current.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote Content */}
            <blockquote className="mb-8 max-w-2xl mx-auto px-4">
              <p className={`text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                &ldquo;{current.content}&rdquo;
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-5 mt-4">
              <div className={`w-16 h-16 rounded-2xl p-0.5 border ${
                isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
              } overflow-hidden shadow-sm`}>
                {current.image ? (
                  <img src={current.image} alt={current.name} className="w-full h-full rounded-[0.9rem] object-cover" />
                ) : (
                  <div className="w-full h-full rounded-[0.9rem] bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-2xl font-black uppercase">
                    {current.name[0]}
                  </div>
                )}
              </div>
              
              <div className="text-left">
                <h4 className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  {current.name}
                </h4>
                <p className={`text-[11px] font-medium uppercase tracking-widest ${isDark ? "text-neutral-500" : "text-gray-400"}`}>
                  {current.role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-16 sm:mt-24">
          <button
            onClick={prev}
            className={`p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 group ${
              isDark 
                ? "bg-white/[0.02] border-white/[0.05] hover:border-white/20 text-neutral-500 hover:text-white" 
                : "bg-white border-gray-100 hover:border-gray-300 text-gray-400 hover:text-gray-900 shadow-sm"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  i === index 
                    ? `w-10 bg-primary-500` 
                    : `w-1.5 ${isDark ? "bg-white/10 hover:bg-white/30" : "bg-gray-200 hover:bg-gray-400"}`
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className={`p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 group ${
              isDark 
                ? "bg-white/[0.02] border-white/[0.05] hover:border-white/20 text-neutral-500 hover:text-white" 
                : "bg-white border-gray-100 hover:border-gray-300 text-gray-400 hover:text-gray-900 shadow-sm"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
