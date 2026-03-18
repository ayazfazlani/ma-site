"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FullScreenTray() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scale from small to full screen
  const scale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  // Rotate from tilted to straight
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 0]);
  // Position adjustments
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <section ref={ref} className="sticky top-0 h-screen overflow-hidden bg-slate-950 flex items-center justify-center">
      <motion.video
        src="/Buzz%20Interactive%20Showreel%20(1).mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 w-auto h-auto max-w-none pointer-events-none"
        style={{
          scale,
          rotate,
          x,
          y,
          transformOrigin: "center center",
        }}
      />
      {/* Optional overlay or content */}
    </section>
  );
}
