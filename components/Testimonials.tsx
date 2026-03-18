// components/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "CEO, TechSolutions PK",
    content:
      "Media Linkers transformed our online presence completely. Our organic traffic increased by 300% in just 4 months. Highly recommended!",
    rating: 5,
    initial: "A",
    gradient: "from-primary-500 to-primary-400",
  },
  {
    name: "Sarah Ali",
    role: "Marketing Director, StyleMart",
    content:
      "The team is professional, responsive, and delivers results. Our social media engagement has never been better. Great ROI on our marketing spend.",
    rating: 5,
    initial: "S",
    gradient: "from-accent-500 to-accent-400",
  },
  {
    name: "Muhammad Rizwan",
    role: "Founder, EduLearn Academy",
    content:
      "Working with Media Linkers was a game-changer for our ed-tech startup. They understood our vision and helped us reach our target audience effectively.",
    rating: 5,
    initial: "M",
    gradient: "from-amber-500 to-amber-400",
  },
  {
    name: "Fatima Noor",
    role: "Operations Manager, HomeDecor Pk",
    content:
      "Since we partnered with them for our PPC campaigns, our cost per acquisition dropped by 45%. Exceptional service and very transparent reporting.",
    rating: 5,
    initial: "F",
    gradient: "from-pink-500 to-pink-400",
  },
  {
    name: "Omar Tariq",
    role: "Director, BuildRight Construction",
    content:
      "The web development team delivered a blazing fast, SEO-optimized site that has completely revamped our brand image. Fantastic work!",
    rating: 5,
    initial: "O",
    gradient: "from-teal-500 to-teal-400",
  },
];

export default function Testimonials() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-950" : "bg-white"
      }`}
    >
      {/* Background */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-primary-500/[0.03]" : "bg-primary-100/20"
        }`}
      />

      <div className="container-custom mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
              isDark
                ? "glass text-success-400"
                : "bg-success-500/10 border border-success-400/20 text-success-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success-400" />
            Testimonials
          </span>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Trusted By Our{" "}
            <span className="gradient-text">Clients</span>
          </h2>
          <p className={`text-lg ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            Hear from businesses that have transformed their digital presence
            with our expertise.
          </p>
        </motion.div>

        {/* Infinite Marquee Scroll */}
        <div className="relative flex overflow-hidden w-full group py-4">
          
          {/* Fading Edges */}
          <div className={`absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-20 bg-gradient-to-r pointer-events-none ${isDark ? 'from-dark-950 to-transparent' : 'from-white to-transparent'}`} />
          <div className={`absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-20 bg-gradient-to-l pointer-events-none ${isDark ? 'from-dark-950 to-transparent' : 'from-white to-transparent'}`} />

          <div className="flex w-max animate-marquee hover-pause gap-5 lg:gap-6 pr-5 lg:pr-6 whitespace-nowrap">
            {/* Double the array for seamless infinite looping */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className={`w-[320px] sm:w-[380px] lg:w-[420px] flex-shrink-0 group relative rounded-2xl lg:rounded-3xl p-8 border transition-all duration-500 whitespace-normal ${
                  isDark
                    ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04]"
                    : "bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg"
                }`}
              >
                {/* Quote Icon */}
                <Quote
                  className={`absolute top-7 right-7 w-10 h-10 transition-colors duration-500 ${
                    isDark
                      ? "text-white/[0.04] group-hover:text-primary-500/10"
                      : "text-gray-100 group-hover:text-primary-100"
                  }`}
                />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4.5 h-4.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p
                  className={`mb-8 leading-relaxed relative z-10 text-[15px] max-w-full ${
                    isDark ? "text-neutral-300" : "text-gray-600"
                  }`}
                >
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg shrink-0`}
                  >
                    <span className="text-white font-bold text-lg">
                      {testimonial.initial}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`font-semibold text-sm ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className={`text-xs ${
                        isDark ? "text-neutral-500" : "text-gray-400"
                      }`}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}