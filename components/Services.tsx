// components/Services.tsx
"use client";

import { motion } from "framer-motion";
import {
  Search,
  Share2,
  FileText,
  Globe,
  Target,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

import { servicesData } from "../src/lib/services";

const services = servicesData; // homepage uses full list (including analytics) for display


export default function Services() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-950" : "bg-white"
      }`}
      id="services"
    >
      {/* Background accent */}
      <div
        className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-primary-500/[0.03]" : "bg-primary-200/20"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none ${
          isDark ? "bg-accent-400/[0.02]" : "bg-accent-300/10"
        }`}
      />

      <div className="container-custom mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
              isDark
                ? "glass text-primary-400"
                : "bg-primary-50 border border-primary-200/60 text-primary-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Our Services
          </span>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Our Core{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className={`text-lg leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            Comprehensive software development solutions tailored to grow your
            business and establish your online presence in the competitive
            digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative rounded-2xl lg:rounded-3xl p-8 lg:p-10 border transition-all duration-500 hover:shadow-2xl ${service.glow} ${
                isDark
                  ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04]"
                  : "bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Number */}
              <span
                className={`absolute top-8 right-8 text-6xl font-bold transition-colors duration-500 ${
                  isDark
                    ? "text-white/[0.03] group-hover:text-white/[0.06]"
                    : "text-gray-100 group-hover:text-gray-200"
                }`}
              >
                {service.number}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
              >
                {service.icon && <service.icon className="w-7 h-7 text-white" />}
              </div>

              {/* Content */}
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

              {/* Link */}
              <Link
                href={`/services/${service.slug}`}
                className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                  isDark
                    ? "text-neutral-400 group-hover:text-primary-400"
                    : "text-gray-400 group-hover:text-primary-600"
                }`}
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
