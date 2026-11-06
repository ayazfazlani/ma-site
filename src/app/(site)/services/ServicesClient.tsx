"use client";

import { motion } from "framer-motion";
import ScrollTray from "@/components/ScrollTray";
import { ArrowRight, ArrowUpRight, CheckCircle, Code2, Cpu, Database, Globe, Layout, Layers, Settings, Factory, Briefcase, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import {
  serviceSchemas,
  servicesItemListSchema,
  servicesFaqSchema,
  getBreadcrumbSchema,
} from "@/lib/schemas";

const servicesBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
  { name: "Services", url: "https://masofts.com/services" },
]);

import type { ServiceData } from "@/lib/services";
import { servicesData } from "@/lib/services";
import FaqSection from "@/components/FaqSection";
import { servicesHubFaqs } from "@/lib/faq-data";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Database,
  Cpu,
  Globe,
  Settings,
  Layout,
  Factory,
  Briefcase,
};

export default function ServicesClient({ services = servicesData }: { services?: ServiceData[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="pt-20">
      {/* SEO Schemas */}
      <JsonLd data={servicesItemListSchema} />
      <JsonLd data={servicesFaqSchema} />
      <JsonLd data={servicesBreadcrumb} />
      {serviceSchemas.map((schema: unknown, index: number) => (
        <JsonLd key={index} data={schema as Record<string, unknown>} />
      ))}
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-950 via-primary-900 to-indigo-900 py-16 text-white lg:py-24">
        <ScrollTray src="/tray.mp4" className="opacity-20" />
        <div className="container-custom relative z-10 mx-auto grid items-center gap-10 px-4 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-200">
              Custom software services
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              The right software for the way your business works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg"
            >
              Choose a focused service or combine capabilities. We start with the process,
              then plan the ERP, manufacturing system, website, or web app that solves the
              work in front of your team.
            </motion.p>
            <div className="mt-7 flex flex-wrap gap-2 text-sm font-medium text-white/90">
              {["Workflow-first planning", "Clear milestones", "Practical handover"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-200">
              Not sure where to start?
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              Bring us the bottleneck, not a technical spec.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-100">
              Tell us what is being repeated, delayed, or hard to track. We&apos;ll help
              identify the smallest useful first release and what can wait.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-primary-800 transition hover:bg-blue-50"
            >
              Discuss your workflow
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className={`px-4 py-10 ${isDark ? "bg-dark-950" : "bg-white"}`}>
        <div className="container-custom mx-auto flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary-500/20 bg-primary-500/5 p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            <h2 className={`text-xl font-bold sm:text-2xl ${isDark ? "text-white" : "text-gray-900"}`}>
              Manufacturing ERP for plastic injection molding
            </h2>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed sm:text-base ${isDark ? "text-neutral-300" : "text-gray-600"}`}>
              See how raw material tracking, production activity, traceability, and scrap
              reporting can be planned for plastic manufacturing.
            </p>
          </div>
          <Link
            href="/erp-for-plastic-injection-molding"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            ERP for Plastic Injection Molding
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section id="service-options" className={`section-padding ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4">
          <div className="mb-9 max-w-3xl">
            <p className={`text-xs font-bold uppercase tracking-[0.16em] ${isDark ? "text-primary-300" : "text-primary-700"}`}>
              Services
            </p>
            <h2 className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? "text-white" : "text-gray-950"}`}>
              Start with the problem you want to solve
            </h2>
            <p className={`mt-3 leading-relaxed ${isDark ? "text-neutral-300" : "text-gray-600"}`}>
              Every engagement is scoped around your workflows, existing tools, users, and
              constraints. Explore a service to see the capabilities and delivery options.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service: ServiceData, index: number) => {
              const IconComponent = (service.icon && ICON_MAP[String(service.icon)]) || Layers;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 lg:p-9 ${isDark
                      ? "bg-white/[0.03] border-white/[0.08] hover:border-primary-400/30 hover:bg-white/[0.05]"
                      : "bg-white border-gray-200 shadow-sm hover:border-primary-200 hover:shadow-xl"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${service.color || "from-primary-600 to-indigo-600"} shadow-lg`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-[0.16em] ${isDark ? "text-neutral-500" : "text-gray-400"}`}>
                      {service.number || String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className={`mt-5 mb-3 text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>{service.title}</h2>
                  <p className={`mb-6 leading-relaxed ${isDark ? "text-neutral-300" : "text-gray-600"}`}>{service.description}</p>

                  <ul className="mb-7 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span className={`text-sm leading-relaxed ${isDark ? "text-neutral-300" : "text-gray-700"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`pt-6 border-t ${isDark ? "border-white/[0.06]" : "border-gray-100"}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary-700 dark:text-primary-300">{service.price}</span>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-500 dark:text-primary-300"
                      >
                        Explore this service
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection
        className={isDark ? "bg-dark-900" : "bg-gray-100"}
        title="Services FAQs"
        subtitle="Straight answers about how I build, price, and support custom software."
        items={servicesHubFaqs}
      />

      {/* CTA Section */}
      <section className={`section-padding ${isDark ? "bg-dark-950" : "bg-white"}`}>
        <div className="container-custom mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Need a Custom Solution?
            </h2>
            <p className={`text-lg mb-8 ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
              Every business is unique. Contact me to discuss a tailored software development
              strategy that fits your specific needs and budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all transform hover:scale-105"
            >
              <span>Contact Me</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
