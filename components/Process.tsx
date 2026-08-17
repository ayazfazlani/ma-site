// components/Process.tsx
"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const steps = [
  {
    icon: Search,
    title: "Understand",
    description:
      "We map your current workflow, problems, users and business requirements.",
    gradient: "from-primary-500 to-primary-400",
    number: "01",
  },
  {
    icon: Lightbulb,
    title: "Plan",
    description:
      "We define the modules, features, technology and development roadmap.",
    gradient: "from-purple-500 to-pink-400",
    number: "02",
  },
  {
    icon: Rocket,
    title: "Build",
    description:
      "We develop the system in milestones so you can review progress throughout development.",
    gradient: "from-amber-500 to-orange-400",
    number: "03",
  },
  {
    icon: TrendingUp,
    title: "Launch",
    description:
      "We deploy the software, train your team and provide post-launch support.",
    gradient: "from-success-500 to-emerald-400",
    number: "04",
  },
];

export default function Process() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-950" : "bg-white"
      }`}
      id="process"
    >
      {/* Background */}
      <div
        className={`absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-primary-500/[0.02]" : "bg-primary-100/30"
        }`}
      />

      <div className="container-custom mx-auto relative z-10">
        {/* Header */}
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
                ? "glass text-primary-400"
                : "bg-primary-50 border border-primary-200/60 text-primary-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            How we build your software
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            From workflow to{" "}
            <span className="gradient-text">live system</span>
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            A clear path from the first conversation to software your team can actually use.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line – Desktop */}
          <div
            className={`hidden lg:block absolute top-[88px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px z-0 ${
              isDark
                ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
                : "bg-gradient-to-r from-transparent via-gray-200 to-transparent"
            }`}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group"
              >
                <div
                  className={`relative rounded-2xl lg:rounded-3xl p-8 border transition-all duration-500 h-full ${
                    isDark
                      ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04]"
                      : "bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {/* Step Number */}
                  <div
                    className={`absolute -top-3 -right-3 w-10 h-10 border rounded-full flex items-center justify-center font-bold text-sm shadow-xl ${
                      isDark
                        ? "bg-gradient-to-br from-dark-700 to-dark-800 text-primary-400 border-white/[0.1]"
                        : "bg-white text-primary-600 border-primary-200 shadow-primary-100/50"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3
                    className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isDark
                        ? "text-white group-hover:text-primary-300"
                        : "text-gray-900 group-hover:text-primary-600"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className={`leading-relaxed text-[15px] ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
