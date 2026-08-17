// components/Industries.tsx
"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Building2,
  Cpu,
  Factory,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const industries = [
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Production, inventory, raw materials and factory reporting.",
    href: "/services/manufacturing",
    gradient: "from-slate-600 to-blue-500",
  },
  {
    icon: Building2,
    name: "Small & Growing Businesses",
    description: "Replace spreadsheets and disconnected tools with custom business software.",
    href: "/services/small-business",
    gradient: "from-teal-500 to-emerald-400",
  },
  {
    icon: ShoppingBag,
    name: "Retail & Commerce",
    description: "Inventory, sales, orders and business management.",
    href: "/services/web-development",
    gradient: "from-emerald-500 to-emerald-400",
  },
  {
    icon: Cpu,
    name: "Startups",
    description: "SaaS platforms, dashboards and custom web applications.",
    href: "/services/web-development",
    gradient: "from-primary-500 to-primary-400",
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
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      )}
      <div
        className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-accent-400/[0.02]" : "bg-accent-300/10"
        }`}
      />

      <div className="container-custom mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
              isDark
                ? "glass text-accent-400"
                : "bg-accent-300/10 border border-accent-400/20 text-accent-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
            Who we build for
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Industries & <span className="gradient-text">business problems</span>
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            We work with operators who need software that matches their process — especially manufacturing, growing businesses, and product teams.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
            <Link
              href={industry.href}
              className={`group rounded-2xl lg:rounded-3xl p-7 border transition-all duration-500 hover:shadow-xl block ${
                isDark
                  ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] hover:shadow-primary-500/5"
                  : "bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg"
              }`}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  <industry.icon className="w-6 h-6 text-white" />
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
                      isDark ? "text-neutral-400" : "text-gray-500"
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
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
