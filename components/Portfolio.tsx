// components/Portfolio.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const projects = [
  {
    id: 1,
    title: "E-Commerce Re-platforming",
    category: "Web Development & SEO",
    description: "Increased online sales by 150% and organic traffic by 200% within 6 months.",
    color: "from-blue-500 to-cyan-400",
    imageDark: "bg-blue-900/40",
    imageLight: "bg-blue-100",
  },
  {
    id: 2,
    title: "Real Estate Lead Generation",
    category: "PPC & Social Media",
    description: "Generated 500+ qualified leads with a 40% reduction in cost-per-acquisition.",
    color: "from-amber-500 to-orange-400",
    imageDark: "bg-amber-900/40",
    imageLight: "bg-amber-100",
  },
  {
    id: 3,
    title: "Healthcare Brand Awareness",
    category: "Content & Social Media",
    description: "Grew social following to 50k+ and established industry thought leadership.",
    color: "from-rose-500 to-pink-400",
    imageDark: "bg-rose-900/40",
    imageLight: "bg-rose-100",
  },
  {
    id: 4,
    title: "SaaS Launch Campaign",
    category: "Full Service Marketing",
    description: "Successful product launch acquiring 10,000+ active users in the first quarter.",
    color: "from-purple-500 to-indigo-400",
    imageDark: "bg-purple-900/40",
    imageLight: "bg-purple-100",
  },
  {
    id: 5,
    title: "Education Portal Redesign",
    category: "Web Design & Development",
    description: "Modernized user interface leading to a 60% increase in student course enrollments.",
    color: "from-emerald-500 to-teal-400",
    imageDark: "bg-emerald-900/40",
    imageLight: "bg-emerald-100",
  },
];

export default function Portfolio() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 50;
    if (info.offset.x > threshold) {
      setCurrentIndex((prev) => prev - 1);
    } else if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // The active window of items relative to the current index
  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-950" : "bg-white"
      }`}
      id="portfolio"
    >
      {/* Background accents */}
      <div
        className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-primary-500/[0.03]" : "bg-primary-200/20"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none ${
          isDark ? "bg-accent-400/[0.02]" : "bg-accent-300/10"
        }`}
      />

      <div className="container-custom mx-auto relative z-10 mb-12 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
              isDark
                ? "glass text-primary-400"
                : "bg-primary-50 border border-primary-200/60 text-primary-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Our Portfolio
          </span>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className={`text-lg ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            Explore our recent success stories and see how we've helped businesses achieve their digital goals.
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div 
        className="w-full relative py-12 lg:py-20 overflow-hidden flex justify-center items-center min-h-[500px] md:min-h-[600px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {visibleOffsets.map((offset) => {
          const absoluteIndex = currentIndex + offset;
          // Calculate positive modulo even for negative indices
          const projectIndex = ((absoluteIndex % projects.length) + projects.length) % projects.length;
          const project = projects[projectIndex];
          const isActive = offset === 0;

          return (
            <motion.div
              key={absoluteIndex}
              className={`absolute left-0 right-0 mx-auto w-[85%] sm:w-[70%] lg:w-[50%] max-w-5xl rounded-3xl overflow-hidden border ${
                isActive ? "cursor-grab active:cursor-grabbing hover:shadow-2xl" : "cursor-pointer"
              } ${
                isDark
                  ? "bg-dark-900 border-white/[0.08]"
                  : "bg-white border-gray-200"
              }`}
              animate={{
                x: `${offset * 105}%`,
                scale: isActive ? 1 : 0.85,
                opacity: Math.abs(offset) >= 2 ? 0 : isActive ? 1 : 0.4,
                zIndex: 10 - Math.abs(offset),
                pointerEvents: Math.abs(offset) >= 2 ? "none" : "auto",
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (!isActive && Math.abs(offset) < 2) {
                  setCurrentIndex((prev) => prev + offset);
                }
              }}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Area */}
                <div className={`w-full md:w-1/2 h-64 md:h-auto md:min-h-[450px] relative overflow-hidden flex-shrink-0 ${isDark ? project.imageDark : project.imageLight}`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 mix-blend-overlay`} />
                  
                  {/* Placeholder Mockup Graphic */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                    <div className={`w-full h-full rounded-xl border-4 border-white/10 shadow-2xl overflow-hidden ${isDark ? "bg-dark-950" : "bg-white"} flex flex-col`}>
                       {/* Browser header */}
                       <div className={`h-6 w-full flex items-center px-3 gap-1.5 border-b ${isDark ? "bg-dark-900 border-white/5" : "bg-gray-100 border-gray-200"}`}>
                          <div className="w-2 h-2 rounded-full bg-red-400" />
                          <div className="w-2 h-2 rounded-full bg-amber-400" />
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                       </div>
                       {/* Body skeleton */}
                       <div className="flex-1 p-4 flex flex-col gap-3">
                          <div className={`w-3/4 h-8 rounded shrink-0 ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
                          <div className={`w-full h-full rounded ${isDark ? "bg-white/5" : "bg-gray-100"}`} />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      isDark 
                        ? "bg-white/10 text-primary-300" 
                        : "bg-primary-50 text-primary-600"
                    }`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {project.title}
                  </h3>
                  
                  <p className={`text-base lg:text-lg mb-8 leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Link
                      href="#"
                      className={`inline-flex items-center gap-2 font-semibold transition-colors group/link ${
                        isDark
                          ? "text-white hover:text-primary-400"
                          : "text-gray-900 hover:text-primary-600"
                      }`}
                    >
                      View Case Study
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center items-center gap-3 mt-4 pb-8 z-20 relative">
        {projects.map((_, idx) => {
          // Normalize currentIndex to match exactly one of the projects dots
          const normalizedCurrent = ((currentIndex % projects.length) + projects.length) % projects.length;
          return (
            <button
              key={idx}
              onClick={() => {
                // Find shortest path to target dot
                let diff = idx - normalizedCurrent;
                if (diff > projects.length / 2) diff -= projects.length;
                if (diff < -projects.length / 2) diff += projects.length;
                setCurrentIndex(prev => prev + diff);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${
                normalizedCurrent === idx 
                  ? "w-8 h-2.5 bg-primary-500" 
                  : `w-2.5 h-2.5 ${isDark ? "bg-white/20 hover:bg-white/40" : "bg-gray-300 hover:bg-gray-400"}`
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
