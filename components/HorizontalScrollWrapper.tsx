// components/HorizontalScrollWrapper.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function HorizontalScrollWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-12 relative overflow-hidden border-y ${isDark ? "bg-dark-900 border-white/[0.04]" : "bg-gray-50/50 border-gray-100"}`}>
      <div className="container-custom mx-auto relative z-10 mb-8 px-4">
        <motion.p initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`text-center text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? "text-neutral-600" : "text-gray-400"}`}>
          Powering the next generation of global <span className="text-primary-600/60 dark:text-primary-400/40">startups</span>
        </motion.p>
      </div>
      <div className="relative z-10">
        <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r ${isDark ? "from-dark-900 via-dark-900/40 to-transparent" : "from-gray-50/50 via-gray-100/20 to-transparent"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l ${isDark ? "from-dark-900 via-dark-900/40 to-transparent" : "from-gray-50/50 via-gray-100/20 to-transparent"}`} />
        {children}
      </div>
    </section>
  );
}
