"use client";

import { motion } from "framer-motion";
import ScrollTray from "@/components/ScrollTray";
import { Award, Users, Globe, Target } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import { aboutFaqs, toFaqPageSchema } from "@/lib/faq-data";
import { aboutPageSchema, getBreadcrumbSchema } from "@/lib/schemas";

const aboutBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
  { name: "About", url: "https://masofts.com/about" },
]);

const values = [
  {
    icon: Target,
    title: "Practical scope",
    description: "Prioritize the workflows and reports your team needs most, then expand with purpose.",
  },
  {
    icon: Users,
    title: "Direct collaboration",
    description: "Work through requirements and decisions together, with clear checkpoints along the way.",
  },
  {
    icon: Award,
    title: "Maintainable software",
    description: "Favor understandable systems your business can continue to improve after launch.",
  },
  {
    icon: Globe,
    title: "A useful handover",
    description: "Plan for documentation, ownership, and the practical needs of the people using the software.",
  },
];

export default function AboutClient() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="pt-20">
      {/* SEO Schemas */}
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={aboutBreadcrumb} />
      <JsonLd data={toFaqPageSchema(aboutFaqs)} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-900 to-primary-800 py-14 lg:py-20">
        <ScrollTray src="/tray.mp4" className="opacity-20" />
        <div className="container-custom mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About <span className="gradient-text">MA Softs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Serving startups and businesses globally from Multan, Pakistan
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className={`section-padding ${isDark ? "bg-dark-950" : "bg-white"}`}>
        <div className="container-custom mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                How I approach <span className="gradient-text">software</span>
              </h2>
              <div className={`space-y-4 leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                <p>
                  MA Softs is an independent software practice based in Multan, Pakistan, working
                  with businesses locally and remotely. The focus is custom ERP, manufacturing
                  software, web applications, and SaaS products shaped around real operations.
                </p>
                <p>
                  Projects begin with the current process: where information is recorded, where
                  work gets delayed, and what the team needs to see. That discovery helps separate
                  the essential first release from features that can wait.
                </p>
                <p>
                  From there, I design and build a practical system with a clear handover in mind.
                  The goal is software that fits day-to-day work and can be maintained as the
                  business changes.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-6">
                  <div className={`rounded-2xl p-5 ${isDark ? "bg-primary-500/10" : "bg-primary-50"}`}>
                    <div className="text-sm font-bold text-primary-600 mb-1">Start with the workflow</div>
                    <div className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>Map how work moves before choosing what to build.</div>
                  </div>
                  <div className={`rounded-2xl p-5 ${isDark ? "bg-accent-500/10" : "bg-accent-300/10"}`}>
                    <div className="text-sm font-bold text-accent-600 mb-1">Build in useful stages</div>
                    <div className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>Make the first release focused, testable, and ready to extend.</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className={`rounded-2xl p-5 ${isDark ? "bg-purple-500/10" : "bg-purple-50"}`}>
                    <div className="text-sm font-bold text-purple-600 mb-1">Keep decisions clear</div>
                    <div className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>Review scope, trade-offs, and progress together.</div>
                  </div>
                  <div className={`rounded-2xl p-5 ${isDark ? "bg-success-500/10" : "bg-green-50"}`}>
                    <div className="text-sm font-bold text-green-600 mb-1">Plan for ownership</div>
                    <div className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>Consider documentation and future maintenance from the start.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`section-padding ${isDark ? "bg-dark-900" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              My Core <span className="gradient-text">Values</span>
            </h2>
            <p className={`${isDark ? "text-neutral-400" : "text-gray-600"}`}>
              The principles that guide everything I do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-6 text-left ${isDark
                    ? "bg-white/[0.03] border border-white/[0.06]"
                    : "bg-white shadow-lg"
                  }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? "bg-primary-500/15" : "bg-primary-50"
                  }`}>
                  <value.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{value.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        className={isDark ? "bg-dark-950" : "bg-white"}
        title="About MA Softs"
        subtitle="A few things teams often ask before we work together."
        items={aboutFaqs}
      />
    </main>
  );
}
