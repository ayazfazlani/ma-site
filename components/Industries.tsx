// components/Industries.tsx
"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  GraduationCap,
  Building2,
  Cpu,
  Truck,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const industries = [
  {
    icon: Cpu,
    name: "SaaS Startups",
    description: "Cloud-native solutions and scalable MVP development",
    gradient: "from-primary-500 to-primary-400",
  },
  {
    icon: Truck,
    name: "Logistics & ERP",
    description: "Streamlined supply chain and resource planning systems",
    gradient: "from-purple-500 to-violet-400",
  },
  {
    icon: ShoppingBag,
    name: "E-commerce",
    description: "High-conversion headless stores and custom platforms",
    gradient: "from-emerald-500 to-emerald-400",
  },
  {
    icon: Heart,
    name: "Healthcare",
    description: "Secure patient portals and medical management software",
    gradient: "from-rose-500 to-pink-400",
  },
  {
    icon: GraduationCap,
    name: "EdTech",
    description: "Interactive learning platforms and management portals",
    gradient: "from-amber-500 to-amber-400",
  },
  {
    icon: Building2,
    name: "Fintech & PropTech",
    description: "Secure financial tools and real estate data platforms",
    gradient: "from-accent-500 to-accent-400",
  },
];

export default function Industries() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-900" : "bg-slate-50"
      }`}
    >
      {/* Background */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      )}
      <div
        className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-accent-400/[0.02]" : "bg-accent-300/10"
        }`}
      />

      <div className="container-custom mx-auto relative z-10">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
              isDark
                ? "glass text-accent-400"
                : "bg-accent-300/10 border border-accent-400/20 text-accent-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
            Specialized Expertise
          </span>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Sectors I <span className="gradient-text">Empower</span>
          </h2>
          <p className={`text-lg ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            I specialize in building complex, data-driven software solutions for industries 
            demanding high reliability and seamless user scaling.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group rounded-2xl lg:rounded-3xl p-7 border transition-all duration-500 cursor-pointer hover:shadow-xl ${
                isDark
                  ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] hover:shadow-primary-500/5"
                  : "bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg"
              }`}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  <industry.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-bold mb-1.5 transition-colors duration-300 ${
                      isDark
                        ? "text-white group-hover:text-primary-300"
                        : "text-gray-900 group-hover:text-primary-600"
                    }`}
                  >
                    {industry.name}
                  </h3>
                  <p
                    className={`text-sm mb-3 leading-relaxed ${
                      isDark ? "text-neutral-500" : "text-gray-400"
                    }`}
                  >
                    {industry.description}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1 ${
                      isDark ? "text-primary-400" : "text-primary-600"
                    }`}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
