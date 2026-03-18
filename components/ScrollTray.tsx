"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTrayProps {
  src: string;
  className?: string;
}

export default function ScrollTray({ src, className = "" }: ScrollTrayProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, -15]);
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <motion.video
      ref={ref}
      src="/Buzz%20Interactive%20Showreel%20(1).mp4"
      autoPlay
      muted
      loop
      playsInline
      className={`absolute top-1/2 left-1/2 w-auto h-auto max-w-none pointer-events-none ${className}`}
      style={{ scale, rotate, x, y, transformOrigin: "center center" }}
    />
  );
}
