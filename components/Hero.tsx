// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

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

export default function Hero({ partners = [] }: { partners?: any[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const displayPartners = partners.length > 0 ? partners : [
    { logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
    { logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
    { logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
    { logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=4" },
    { logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=5" },
  ];

  // Skip heavy Three.js canvas on mobile to save CPU/GPU
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-dark-950" : "bg-white"
      }`}
    >
      {/* Background: Three.js on desktop, CSS gradient on mobile */}
      <div className="absolute inset-0 z-0">
        {isDesktop ? (
          <ParticleNetwork />
        ) : (
          <div className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950"
              : "bg-gradient-to-br from-white via-primary-50/30 to-white"
          }`} />
        )}
      </div>

      {/* Subtle overlays for better contrast in light mode */}
      {!isDark && (
        <div className="absolute inset-0 z-[1] pointer-events-none bg-radial-gradient from-white/20 via-white/40 to-white/90" />
      )}

      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-float ${
          isDark ? "bg-primary-500/[0.07]" : "bg-primary-500/[0.15]"
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-float ${
          isDark ? "bg-accent-400/[0.05]" : "bg-accent-400/[0.1]"
        }`} style={{ animationDelay: "3s" }} />
      </div>

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
                  : "bg-primary-50 border border-primary-200/60 text-primary-600 shadow-sm"
              }`}
            >
              <span className={`w-2 h-2 rounded-full animate-pulse-glow ${isDark ? "bg-accent-400" : "bg-primary-500"}`} />
              Software Solutions Redefined
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
            Building the Future of
            <br />
            <span className="gradient-text animate-gradient">
              Startup Software
            </span>
            <br />
            <span
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold opacity-80 ${
                isDark ? "text-neutral-400" : "text-gray-400"
              }`}
            >
              by Ayaz
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
            I am a full-stack freelancer specializing in crafting 
            <span className={`px-2 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>custom ERPs</span>, 
            scalable web platforms, and MVPs for startups. With expert-level 
            execution, I transform complex business needs into seamless digital experiences.
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
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/services"
              className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 border ${
                isDark
                  ? "border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  : "border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span>Explore My Services</span>
            </Link>
          </motion.div>

          {/* Social Proof Avatars */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="flex flex-col items-center gap-4 mb-20"
          >
            <div className="flex -space-x-3">
              {displayPartners.map((p, i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 rounded-full border-2 ${isDark ? "border-dark-950" : "border-white"} overflow-hidden bg-primary-100 shadow-xl`}
                >
                  <img 
                    src={p.logo} 
                    alt="client" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className={`w-10 h-10 rounded-full border-2 ${isDark ? "border-dark-950 bg-primary-600" : "border-white bg-primary-500"} flex items-center justify-center text-[10px] font-black text-white shadow-xl`}>
                100+
              </div>
            </div>
            <p className={`text-sm font-semibold tracking-wide ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
              Trusted by <span className="text-primary-500 underline decoration-primary-500/30 underline-offset-4">100+ Global Businesses</span> & Startups
            </p>
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
              { value: "40+", label: "Projects Completed" },
              { value: "25+", label: "Happy Startups" },
              { value: "99%", label: "Client Satisfaction" },
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
