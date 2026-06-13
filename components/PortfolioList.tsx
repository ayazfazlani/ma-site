// components/PortfolioList.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ExternalLink, ImageIcon, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export type PortfolioListProject = {
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  color?: string;
};

type DisplayProject = PortfolioListProject & {
  imageDark: string;
  imageLight: string;
};

export default function PortfolioList({ initialProjects }: { initialProjects: PortfolioListProject[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const projects: DisplayProject[] = useMemo(
    () =>
      initialProjects.map((p, i) => ({
        ...p,
        color: p.color || ["from-blue-500 to-cyan-400", "from-amber-500 to-orange-400", "from-rose-500 to-pink-400"][i % 3],
        imageDark: p.image ? "" : "bg-primary-900/40",
        imageLight: p.image ? "" : "bg-primary-100",
      })),
    [initialProjects]
  );

  const projectsWithImages = useMemo(
    () => projects.filter((p): p is DisplayProject & { image: string } => Boolean(p.image)),
    [projects]
  );

  useEffect(() => {
    if (projects.length === 0 || isHovered || isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length, isHovered, isDragging]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    if (info.offset.x > threshold) setCurrentIndex((prev) => prev - 1);
    else if (info.offset.x < -threshold) setCurrentIndex((prev) => prev + 1);
  };

  if (projects.length === 0) return null;

  const normalizedSlideIndex =
    ((currentIndex % projects.length) + projects.length) % projects.length;

  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <>
      <div 
        className="w-full relative py-12 lg:py-20 overflow-hidden flex justify-center items-center min-h-[720px] md:min-h-[600px]"
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
              className={`absolute left-0 right-0 mx-auto w-[92%] sm:w-[70%] lg:w-[50%] max-w-5xl rounded-3xl overflow-hidden border ${
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
                <div className={`w-full md:w-1/2 h-56 sm:h-64 md:h-auto md:min-h-[450px] relative overflow-hidden flex-shrink-0 group/image ${isDark ? project.imageDark : project.imageLight}`}>
                    {project.image ? (
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          fill 
                          priority={isActive}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain object-center bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-800 dark:to-dark-900 p-4" 
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-primary-500/20" />
                        </div>
                    )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 mix-blend-overlay`} />
                  
                  {/* Zoom Button */}
                  {project.image && (
                    <motion.button
                      type="button"
                      aria-label="Open image full screen"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImageIndex(normalizedSlideIndex);
                        setLightboxOpen(true);
                      }}
                      className="absolute bottom-4 right-4 p-3 rounded-xl bg-white/90 dark:bg-dark-900/90 text-gray-900 dark:text-white shadow-lg opacity-0 group-hover/image:opacity-100 transition-opacity hover:scale-110"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </motion.button>
                  )}
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
                  
                  <p className={`text-base lg:text-lg mb-10 leading-relaxed font-medium ${isDark ? "text-neutral-400" : "text-gray-700"}`}>
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    {project.slug ? (
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className={`inline-flex items-center gap-2.5 font-black text-sm uppercase tracking-widest transition-all group/link ${
                          isDark ? "text-white hover:text-primary-400" : "text-gray-900 hover:text-primary-600"
                        }`}
                        aria-label={`View details for project: ${project.title}`}
                      >
                        Project Details
                        <ExternalLink className="w-4.5 h-4.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </Link>
                    ) : (
                      <div
                        className={`inline-flex items-center gap-2.5 font-black text-sm uppercase tracking-widest ${
                          isDark ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        Project Details
                        <ExternalLink className="w-4.5 h-4.5 opacity-50" />
                      </div>
                    )}
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
              type="button"
              key={idx}
              aria-label={`Go to project ${idx + 1}: ${projects[idx].title}`}
              onClick={() => {
                let diff = idx - normalizedCurrent;
                if (diff > projects.length / 2) diff -= projects.length;
                if (diff < -projects.length / 2) diff += projects.length;
                setCurrentIndex(prev => prev + diff);
              }}
              className="p-3 -m-3 flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer hover:scale-150 group"
            >
              <div className={`transition-all duration-300 rounded-full ${
                normalizedCurrent === idx 
                  ? "w-10 h-3 bg-primary-500 shadow-lg shadow-primary-500/20" 
                  : `w-3 h-3 ${isDark ? "bg-white/10 group-hover:bg-white/30" : "bg-gray-200 group-hover:bg-gray-400"}`
              }`} />
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && projectsWithImages.length > 0 && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl max-h-[90vh]"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close image preview"
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-dark-900/90 rounded-full p-2 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                {projectsWithImages.length > 1 && (
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() =>
                      setLightboxImageIndex(
                        (prev) => (prev - 1 + projectsWithImages.length) % projectsWithImages.length
                      )
                    }
                    className="rounded-full p-2 bg-white/90 dark:bg-dark-900/90 text-black dark:text-white shadow-lg shrink-0"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: "56.25%" }}>
                  <Image
                    src={projectsWithImages[lightboxImageIndex].image}
                    alt={projectsWithImages[lightboxImageIndex].title}
                    fill
                    className="object-contain"
                  />
                </div>

                {projectsWithImages.length > 1 && (
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() =>
                      setLightboxImageIndex((prev) => (prev + 1) % projectsWithImages.length)
                    }
                    className="rounded-full p-2 bg-white/90 dark:bg-dark-900/90 text-black dark:text-white shadow-lg shrink-0"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="mt-3 text-center text-white text-sm">
                {lightboxImageIndex + 1}/{projectsWithImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
