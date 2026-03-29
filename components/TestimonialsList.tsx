// components/TestimonialsList.tsx
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function TestimonialsList({ testimonials }: { testimonials: any[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative flex overflow-hidden w-full group py-4">
      <div className={`absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-20 bg-gradient-to-r pointer-events-none ${isDark ? 'from-dark-950 to-transparent' : 'from-white to-transparent'}`} />
      <div className={`absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-20 bg-gradient-to-l pointer-events-none ${isDark ? 'from-dark-950 to-transparent' : 'from-white to-transparent'}`} />

      <div className="flex w-max animate-marquee hover-pause gap-5 lg:gap-6 pr-5 lg:pr-6 whitespace-nowrap">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className={`w-[320px] sm:w-[380px] lg:w-[420px] flex-shrink-0 group relative rounded-2xl lg:rounded-3xl p-8 border transition-all duration-500 whitespace-normal ${
              isDark
                ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04]"
                : "bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg"
            }`}
          >
            <Quote
              className={`absolute top-7 right-7 w-12 h-12 transition-colors duration-500 ${
                isDark ? "text-white/[0.04] group-hover:text-primary-500/10" : "text-gray-100 group-hover:text-primary-100"
              }`}
            />

            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className={`mb-10 leading-relaxed relative z-10 text-[15px] font-medium italic ${isDark ? "text-neutral-300" : "text-gray-600"}`}>
              &quot;{testimonial.content}&quot;
            </p>

            <div className="flex items-center gap-4 mt-auto">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient || "from-primary-600 to-primary-500"} flex items-center justify-center shadow-lg shrink-0`}>
                {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full rounded-2xl object-cover" />
                ) : (
                    <span className="text-white font-black text-xl">{testimonial.name[0]}</span>
                )}
              </div>
              <div>
                <div className={`font-black text-sm uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  {testimonial.name}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-neutral-500" : "text-gray-400"}`}>
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
