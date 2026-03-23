// components/TechStack.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { 
  Code2, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Layout, 
  Smartphone, 
  Terminal, 
  Zap, 
  Workflow, 
  Cloud,
  ShieldCheck,
  Search,
  Users,
  BarChart,
  Figma
} from "lucide-react";

const techStacks = [
  // Row 1 (Top)
  [
    { name: "React", icon: Layers, color: "text-sky-400" },
    { name: "Next.js", icon: Zap, color: "dark:text-white text-gray-900" },
    { name: "TypeScript", icon: Code2, color: "text-blue-500" },
    { name: "Tailwind CSS", icon: Layout, color: "text-cyan-400" },
    { name: "Framer Motion", icon: Workflow, color: "text-purple-500" },
    { name: "Node.js", icon: Terminal, color: "text-green-500" },
    { name: "Vercel", icon: Globe, color: "dark:text-white text-gray-900" },
    { name: "Shopify", icon: Smartphone, color: "text-emerald-400" },
  ],
  // Row 2 (Middle)
  [
    { name: "WordPress", icon: Globe, color: "text-blue-400" },
    { name: "WooCommerce", icon: Zap, color: "text-purple-600" },
    { name: "PostgreSQL", icon: Database, color: "text-indigo-400" },
    { name: "MongoDB", icon: Database, color: "text-green-600" },
    { name: "AWS", icon: Cloud, color: "text-orange-400" },
    { name: "Azure", icon: Cloud, color: "text-blue-600" },
    { name: "FastAPI", icon: Zap, color: "text-emerald-500" },
    { name: "GraphQL", icon: Layers, color: "text-pink-500" },
  ],
  // Row 3 (Bottom)
  [
    { name: "SEO Expert", icon: Search, color: "text-yellow-500" },
    { name: "Google Ads", icon: BarChart, color: "text-blue-500" },
    { name: "Meta Ads", icon: Users, color: "text-blue-600" },
    { name: "CyberSecurity", icon: ShieldCheck, color: "text-red-500" },
    { name: "Artificial Intelligence", icon: Cpu, color: "text-indigo-500" },
    { name: "UI/UX Design", icon: Figma, color: "text-rose-500" },
    { name: "Machine Learning", icon: Cpu, color: "text-cyan-400" },
    { name: "Mobile Development", icon: Smartphone, color: "text-primary-500" },
  ]
];

const Row = ({ stacks, direction = 1, speed = 25, isDark }: { stacks: any[], direction?: number, speed?: number, isDark: boolean }) => {
  return (
    <div className="flex overflow-hidden group select-none">
      <motion.div
        animate={{
          x: direction > 0 ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ willChange: "transform" }}
        className="flex gap-8 py-4 whitespace-nowrap min-w-max"
      >
        {[...stacks, ...stacks].map((tech, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all duration-300
              ${isDark 
                ? "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.1] hover:border-white/[0.2] backdrop-blur-sm" 
                : "bg-white border-gray-100 hover:border-primary-200 hover:shadow-lg shadow-sm"}
              flex-shrink-0 group/tech`}
          >
            <tech.icon className={`w-6 h-6 transition-transform duration-300 group-hover/tech:scale-110 ${tech.color}`} />
            <span className={`text-lg font-semibold transition-colors duration-300 ${
              isDark ? "text-white/90 group-hover/tech:text-white" : "text-gray-700 group-hover/tech:text-gray-900"
            }`}>
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function TechStack() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-24 relative overflow-hidden ${isDark ? "bg-dark-950" : "bg-slate-50"}`}>
      {/* Background Decorative Gradient Orbs */}
      <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none ${
        isDark ? "bg-primary-600/[0.05]" : "bg-primary-500/[0.08]"
      }`} />
      <div className={`absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
        isDark ? "bg-accent-400/[0.04]" : "bg-accent-400/[0.1]"
      }`} />

      <div className="container-custom mx-auto relative z-10 mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
            isDark ? "glass text-primary-400" : "bg-primary-50 text-primary-600 border border-primary-100"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? "bg-primary-400" : "bg-primary-600"}`} />
            Cutting Edge Technologies
          </span>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Built with the Best <br />
            <span className="gradient-text">Tech Stacks</span>
          </h2>
          <p className={`text-lg leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
            We leverage the most advanced framework and tools to create robust, 
            high-performance digital solutions that scale with your business.
          </p>
        </motion.div>
      </div>

      <div className="space-y-6 md:space-y-8 relative">
        {/* Gradient Mask for Fade Effect on Sides */}
        <div className={`absolute inset-y-0 left-0 w-32 z-20 pointer-events-none ${
          isDark ? "bg-gradient-to-r from-dark-950 to-transparent" : "bg-gradient-to-r from-slate-50 to-transparent text-gray-950"
        }`} />
        <div className={`absolute inset-y-0 right-0 w-32 z-20 pointer-events-none ${
          isDark ? "bg-gradient-to-l from-dark-950 to-transparent" : "bg-gradient-to-l from-slate-50 to-transparent"
        }`} />
        
        <Row stacks={techStacks[0]} direction={1} speed={30} isDark={isDark} />
        <Row stacks={techStacks[1]} direction={-1} speed={35} isDark={isDark} />
        <Row stacks={techStacks[2]} direction={1} speed={40} isDark={isDark} />
      </div>
    </section>
  );
}
