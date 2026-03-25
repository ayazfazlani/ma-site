// components/Stats.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Rocket, Globe, Award } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const stats = [
  {
    icon: TrendingUp,
    value: 100,
    suffix: "%",
    label: "Project Success Rate",
    description: "Every solution delivered on time and within budget",
    gradient: "from-primary-500 to-primary-400",
  },
  {
    icon: Rocket,
    value: 25,
    suffix: "+",
    label: "Startups Scaled",
    description: "Helping new ventures find their technical footing",
    gradient: "from-accent-500 to-accent-400",
  },
  {
    icon: Globe,
    value: 12,
    suffix: "+",
    label: "Countries Served",
    description: "Global delivery expertise from Pakistan",
    gradient: "from-amber-500 to-amber-400",
  },
  {
    icon: Award,
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Focusing on quality and long-term value",
    gradient: "from-success-500 to-success-400",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums tracking-tighter">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-900" : "bg-slate-50"
      }`}
    >
      {/* Background accents */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      )}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none ${
          isDark ? "bg-primary-500/[0.03]" : "bg-primary-200/15"
        }`}
      />

      <div className="container-custom mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
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
            My Performance 
          </span>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Delivering <span className="gradient-text">Excellence</span>
          </h2>
          <p className={`text-lg ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            Numbers that highlight my commitment to providing specialized 
            software engineering value to entrepreneurs and enterprises.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className={`relative backdrop-blur-sm rounded-2xl lg:rounded-3xl p-8 border transition-all duration-500 hover:shadow-xl h-full ${
                  isDark
                    ? "bg-white/[0.03] border-white/[0.06] hover:border-primary-500/20 hover:bg-white/[0.05] hover:shadow-primary-500/5"
                    : "bg-white border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-lg"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>

                {/* Value */}
                <div
                  className={`text-4xl lg:text-5xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div
                  className={`text-base font-semibold mb-2 ${
                    isDark ? "text-white/90" : "text-gray-800"
                  }`}
                >
                  {stat.label}
                </div>

                {/* Description */}
                <div
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-neutral-500" : "text-gray-400"
                  }`}
                >
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
