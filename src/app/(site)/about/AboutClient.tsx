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
    title: "Results-Driven",
    description: "I focus on delivering measurable results that impact your bottom line.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is my priority. I work as an extension of your team.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "I maintain the highest standards in every project I undertake.",
  },
  {
    icon: Globe,
    title: "Personalized Approach",
    description: "I work closely with you as a dedicated partner, not just a service provider.",
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
      <section className="relative overflow-hidden bg-linear-to-br from-primary-900 to-primary-800 py-20 lg:py-32">
        <ScrollTray src="/tray.mp4" className="opacity-20" />
        <div className="container-custom mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            About <span className="gradient-text">MA Softs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
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
                My <span className="gradient-text">Story</span>
              </h2>
              <div className={`space-y-4 leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                <p>
                  Founded in 2023, MA Softs started with a simple mission: to help
                  startups and businesses worldwide succeed with custom-built software solutions.
                  Based in Multan, Punjab, I leverage modern technology to serve a global clientele,
                  acting as a dedicated technical partner for companies from the US to Australia.
                </p>
                <p>
                  What began as a personal passion for coding has grown into a specialized
                  software development practice focused on ERPs, SaaS MVPs, and scalable web apps.
                  Over the past few years, I&apos;ve helped dozens of businesses automate their operations, 
                  build their first digital products, and scale their technical infrastructure.
                </p>
                <p>
                  I combine creative UI/UX with robust engineering to deliver products that matter. 
                  I believe in building long-term partnerships, delivering the high-touch reliability 
                  of a dedicated expert with the reach and expertise of a global partner.
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
                <div className="space-y-4 mt-8">
                  <div className={`rounded-2xl p-6 text-center ${isDark ? "bg-primary-500/10" : "bg-primary-50"}`}>
                    <div className="text-4xl font-bold text-primary-600 mb-2">5+</div>
                    <div className={isDark ? "text-neutral-400" : "text-gray-600"}>Years Experience</div>
                  </div>
                  <div className={`rounded-2xl p-6 text-center ${isDark ? "bg-accent-500/10" : "bg-accent-300/10"}`}>
                    <div className="text-4xl font-bold text-accent-500 mb-2">40+</div>
                    <div className={isDark ? "text-neutral-400" : "text-gray-600"}>Projects Done</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className={`rounded-2xl p-6 text-center ${isDark ? "bg-purple-500/10" : "bg-purple-50"}`}>
                    <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
                    <div className={isDark ? "text-neutral-400" : "text-gray-600"}>Happy Clients</div>
                  </div>
                  <div className={`rounded-2xl p-6 text-center ${isDark ? "bg-success-500/10" : "bg-green-50"}`}>
                    <div className="text-4xl font-bold text-green-600 mb-2">99%</div>
                    <div className={isDark ? "text-neutral-400" : "text-gray-600"}>Satisfaction</div>
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
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              My Core <span className="gradient-text">Values</span>
            </h2>
            <p className={`text-lg ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
              The principles that guide everything I do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 text-center ${isDark
                    ? "bg-white/[0.03] border border-white/[0.06]"
                    : "bg-white shadow-lg"
                  }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${isDark ? "bg-primary-500/15" : "bg-primary-50"
                  }`}>
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>{value.title}</h3>
                <p className={isDark ? "text-neutral-400" : "text-gray-600"}>{value.description}</p>
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
