// components/PortfolioList.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { ExternalLink, Layers, ImageIcon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";

export default function PortfolioList({ initialProjects }: { initialProjects: any[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Fallback for visual properties if not in DB
  const projects = initialProjects.map((p, i) => ({
    ...p,
    color: p.color || ["from-blue-500 to-cyan-400", "from-amber-500 to-orange-400", "from-rose-500 to-pink-400"][i % 3],
    imageDark: p.image ? "" : "bg-primary-900/40",
    imageLight: p.image ? "" : "bg-primary-100",
  }));

  if (projects.length === 0) return null;

  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    if (info.offset.x > threshold) setCurrentIndex((prev) => prev - 1);
    else if (info.offset.x < -threshold) setCurrentIndex((prev) => prev + 1);
  };

  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <>
      <div 
        className="w-full relative py-12 lg:py-20 overflow-hidden flex justify-center items-center min-h-[500px] md:min-h-[600px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {visibleOffsets.map((offset) => {
          const absoluteIndex = currentIndex + offset;
          const projectIndex = ((absoluteIndex % projects.length) + projects.length) % projects.length;
          const project = projects[projectIndex];
          const isActive = offset === 0;

          return (
            <motion.div
              key={absoluteIndex}
              className={`absolute left-0 right-0 mx-auto w-[85%] sm:w-[70%] lg:w-[50%] max-w-5xl rounded-3xl overflow-hidden border ${
                isActive ? "cursor-grab active:cursor-grabbing hover:shadow-2xl" : "cursor-pointer"
              } ${
                isDark ? "bg-dark-900 border-white/[0.08]" : "bg-white border-gray-200 shadow-sm"
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
                <div className={`w-full md:w-1/2 h-64 md:h-auto md:min-h-[450px] relative overflow-hidden flex-shrink-0 ${isDark ? project.imageDark : project.imageLight}`}>
                    {project.image ? (
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-primary-500/20" />
                        </div>
                    )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 mix-blend-overlay`} />
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] ${
                      isDark ? "bg-white/10 text-primary-400" : "bg-primary-50 text-primary-600"
                    }`}>
                      {project.category || "Development"}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl lg:text-3xl font-black mb-4 tracking-tight leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                    {project.title}
                  </h3>
                  
                  <p className={`text-base lg:text-lg mb-10 leading-relaxed font-medium ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className={`inline-flex items-center gap-2.5 font-black text-sm uppercase tracking-widest transition-all group/link ${
                        isDark ? "text-white hover:text-primary-400" : "text-gray-900 hover:text-primary-600"
                      }`}
                    >
                      Project Details
                      <ExternalLink className="w-4.5 h-4.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-3 mt-4 pb-8 z-20 relative">
        {projects.map((_, idx) => {
          const normalizedCurrent = ((currentIndex % projects.length) + projects.length) % projects.length;
          return (
            <button
              key={idx}
              onClick={() => {
                let diff = idx - normalizedCurrent;
                if (diff > projects.length / 2) diff -= projects.length;
                if (diff < -projects.length / 2) diff += projects.length;
                setCurrentIndex(prev => prev + diff);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer hover:scale-150 ${
                normalizedCurrent === idx 
                  ? "w-8 h-2.5 bg-primary-500 shadow-lg shadow-primary-500/20" 
                  : `w-2.5 h-2.5 ${isDark ? "bg-white/10 hover:bg-white/30" : "bg-gray-200 hover:bg-gray-400"}`
              }`}
            />
          );
        })}
      </div>
    </>
  );
}
