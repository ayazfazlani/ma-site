// components/ServicesList.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Code2, Database, Cpu, Globe, Settings, Layout, Factory, Briefcase } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const ICON_MAP: Record<string, any> = {
  Code2,
  Database,
  Cpu,
  Globe,
  Settings,
  Layout,
  Factory,
  Briefcase,
  Figma: Layout
};

export default function ServicesList({ services }: { services: any[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {services.map((service, index) => {
        const IconComponent = ICON_MAP[service.icon] || Layers;
        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`group relative rounded-2xl lg:rounded-3xl p-8 lg:p-10 border transition-all duration-500 hover:shadow-2xl ${service.glow || "hover:shadow-primary-500/10"} ${
              isDark
                ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04]"
                : "bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl"
            }`}
          >
            {/* Number or Order */}
            <span
              className={`absolute top-8 right-8 text-6xl font-bold transition-colors duration-500 ${
                isDark
                  ? "text-white/[0.03] group-hover:text-white/[0.06]"
                  : "text-gray-100 group-hover:text-gray-200"
              }`}
            >
              {service.number || (index + 1).toString().padStart(2, '0')}
            </span>

            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient || "from-primary-500 to-primary-600"} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
            >
              <IconComponent className="w-7 h-7 text-white" />
            </div>

          <h3
            className={`text-xl lg:text-2xl font-bold mb-4 group-hover:text-primary-300 transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900 group-hover:!text-primary-600"
            }`}
          >
            {service.title}
          </h3>

          <p className={`mb-8 leading-relaxed text-[15px] ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            {service.description}
          </p>

          <Link
            href={`/services/${service.slug}`}
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
              isDark
                ? "text-neutral-400 group-hover:text-primary-400"
                : "text-gray-400 group-hover:text-primary-600"
            }`}
            aria-label={`Learn more about ${service.title}`}
          >
            Learn More
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
