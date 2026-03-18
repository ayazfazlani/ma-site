// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";

const ParticleNetwork = dynamic(() => import("./ParticleNetwork"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
  ),
});

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? "bg-dark-950" : "bg-gradient-to-br from-slate-50 via-white to-primary-50/30"
      }`}
    >
      {/* Three.js Background — only in dark mode */}
      {isDark && (
        <div className="absolute inset-0 z-0">
          <ParticleNetwork />
        </div>
      )}

      {/* Light mode subtle pattern */}
      {!isDark && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-300/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/20 rounded-full blur-[200px]" />
        </div>
      )}

      {/* Ambient gradient orbs (dark only) */}
      {isDark && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/[0.07] rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-400/[0.05] rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
        </div>
      )}

      {/* Gradient Overlay */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-transparent to-dark-950 z-[2] pointer-events-none" />
      )}

      {/* Content */}
      <div className="container-custom relative z-10 mx-auto pt-32 pb-20 w-full">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide mb-8 ${
                isDark
                  ? "glass text-primary-300"
                  : "bg-primary-50 border border-primary-200/60 text-primary-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse-glow" />
              Trusted by 500+ Businesses Worldwide
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Best Digital
            <br />
            <span className="gradient-text animate-gradient">
              Marketing Agency
            </span>
            <br />
            <span
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold ${
                isDark ? "text-neutral-400" : "text-gray-400"
              }`}
            >
              Pakistan
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className={`text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed ${
              isDark ? "text-neutral-400" : "text-gray-500"
            }`}
          >
            Media Linkers has{" "}
            <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>17+ years</span> of
            experience in SEO, Content Marketing, Social Media Marketing, PPC
            Advertising, Website Design &amp; Development. Since 2008, we&apos;ve
            helped businesses grow sales, generate leads, and build brand
            awareness.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-20"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-[1.03]"
            >
              <span className="relative z-10">Get Free Consultation</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <button
              className={`group inline-flex items-center gap-3 px-6 py-4 rounded-full font-medium text-lg transition-all duration-300 ${
                isDark
                  ? "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "glass group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-primary-500/10"
                    : "bg-primary-50 border border-primary-200/40 group-hover:bg-primary-100"
                }`}
              >
                <Play className="w-5 h-5 ml-0.5 text-primary-400" />
              </div>
              <span>Watch Our Story</span>
            </button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className={`grid grid-cols-3 gap-6 sm:gap-10 max-w-3xl mx-auto pt-10 border-t ${
              isDark ? "border-white/[0.06]" : "border-gray-200"
            }`}
          >
            {[
              { value: "400%", label: "Traffic Growth" },
              { value: "500+", label: "Happy Clients" },
              { value: "17+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-tight ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-xs sm:text-sm font-medium uppercase tracking-widest ${
                    isDark ? "text-neutral-500" : "text-gray-400"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`flex flex-col items-center gap-2 ${isDark ? "text-neutral-500" : "text-gray-400"}`}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}