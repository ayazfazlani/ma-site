"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ParticleNetwork = dynamic(() => import("./ParticleNetwork"), {
  ssr: false,
});

export default function HeroBackground() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldLoadCanvas, setShouldLoadCanvas] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handler);

    const loadCanvas = () => {
      const timer = setTimeout(() => {
        setShouldLoadCanvas(true);
      }, 3500);
      return () => clearTimeout(timer);
    };

    let cleanup: () => void;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => {
        cleanup = loadCanvas();
      });
      return () => {
        window.removeEventListener("resize", handler);
        window.cancelIdleCallback(idleId);
        if (cleanup) cleanup();
      };
    } else {
      cleanup = loadCanvas();
      return () => {
        window.removeEventListener("resize", handler);
        if (cleanup) cleanup();
      };
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {isDesktop && shouldLoadCanvas ? (
        <ParticleNetwork />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-white dark:from-dark-950 dark:via-dark-900 dark:to-dark-950" />
      )}

      <div className="absolute inset-0 z-[1] pointer-events-none bg-radial-gradient from-white/20 via-white/40 to-white/90 dark:hidden" />

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden hero-blur-decoration">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-float bg-primary-500/[0.15] dark:bg-primary-500/[0.07]" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-float bg-accent-400/[0.1] dark:bg-accent-400/[0.05]"
          style={{ animationDelay: "3s" }}
        />
      </div>
    </div>
  );
}
