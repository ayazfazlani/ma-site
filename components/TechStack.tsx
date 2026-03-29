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
  BarChart
} from "lucide-react";

// Custom Figma SVG for stable build
const Figma = (props: any) => (
  <svg {...props} viewBox="0 0 38 57" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 28.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z" fill="#0ACF83"/>
    <path d="M0 47.5a9.5 9.5 0 0 1 9.5-9.5H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#1ABCFE"/>
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
    <path d="M0 9.5a9.5 9.5 0 0 1 9.5-9.5H19v19h-9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E"/>
    <path d="M0 28.5a9.5 9.5 0 0 1 9.5-9.5H19v19h-9.5A9.5 9.5 0 0 1 0 28.5z" fill="#A259FF"/>
  </svg>
);

const techStacks = [
  // Row 1
  [
    { name: "React", icon: Layers, color: "text-sky-400" },
    { name: "Next.js", icon: Zap, color: "dark:text-white text-gray-900" },
    { name: "TypeScript", icon: Code2, color: "text-blue-500" },
    { name: "Tailwind", icon: Layout, color: "text-cyan-400" },
    { name: "Node.js", icon: Terminal, color: "text-green-500" },
    { name: "Vercel", icon: Globe, color: "dark:text-white text-gray-900" },
  ],
  // Row 2
  [
    { name: "PostgreSQL", icon: Database, color: "text-indigo-400" },
    { name: "MongoDB", icon: Database, color: "text-green-600" },
    { name: "AWS", icon: Cloud, color: "text-orange-400" },
    { name: "FastAPI", icon: Zap, color: "text-emerald-500" },
    { name: "GraphQL", icon: Layers, color: "text-pink-500" },
  ],
  // Row 3
  [
    { name: "SEO Expert", icon: Search, color: "text-yellow-500" },
    { name: "Analytics", icon: BarChart, color: "text-blue-500" },
    { name: "CyberSecurity", icon: ShieldCheck, color: "text-red-500" },
    { name: "AI Strategy", icon: Cpu, color: "text-indigo-500" },
    { name: "UI/UX Design", icon: Figma, color: "text-rose-500" },
  ]
];

const Row = ({ stacks, direction = 1, speed = 25, isDark }: { stacks: any[], direction?: number, speed?: number, isDark: boolean }) => (
  <div className="flex overflow-hidden group select-none">
    <motion.div
      animate={{ x: direction > 0 ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="flex gap-8 py-4 whitespace-nowrap min-w-max"
    >
      {[...stacks, ...stacks].map((tech, i) => (
        <div key={i} className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all duration-300 ${isDark ? "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.1] shadow-xl" : "bg-white border-gray-100 hover:border-primary-200 shadow-sm"}`}>
          <tech.icon className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${tech.color}`} />
          <span className={`text-lg font-bold ${isDark ? "text-white/90" : "text-gray-700"}`}>{tech.name}</span>
        </div>
      ))}
    </motion.div>
  </div>
);

export default function TechStack() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-24 relative overflow-hidden ${isDark ? "bg-dark-950" : "bg-slate-50"}`}>
      <div className="container-custom mx-auto relative z-10 mb-16 px-4 text-center">
        <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
          Building with <span className="gradient-text">Excellence</span>
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
          We use industry-leading tools to deliver high-performance solutions.
        </p>
      </div>

      <div className="space-y-8 relative">
        <Row stacks={techStacks[0]} direction={1} speed={30} isDark={isDark} />
        <Row stacks={techStacks[1]} direction={-1} speed={35} isDark={isDark} />
        <Row stacks={techStacks[2]} direction={1} speed={40} isDark={isDark} />
      </div>
    </section>
  );
}
