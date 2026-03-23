// app/services/page.tsx
"use client";

import { motion } from "framer-motion";
import ScrollTray from "../../../components/ScrollTray";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../../../components/ThemeProvider";
import JsonLd from "../../../components/JsonLd";
import {
  serviceSchemas,
  servicesItemListSchema,
  servicesFaqSchema,
  getBreadcrumbSchema,
} from "../../../lib/schemas";

const servicesBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://ma-softs.com" },
  { name: "Services", url: "https://ma-softs.com/services" },
]);

import type { ServiceData } from "../../lib/services";
import { servicesData } from "../../lib/services";

// use shared data
const services: ServiceData[] = servicesData;

export default function ServicesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="pt-20">
      {/* SEO Schemas */}
      <JsonLd data={servicesItemListSchema} />
      <JsonLd data={servicesFaqSchema} />
      <JsonLd data={servicesBreadcrumb} />
      {serviceSchemas.map((schema: unknown, index: number) => (
        <JsonLd key={index} data={schema as any} />
      ))}
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-900 to-primary-800 py-20 lg:py-32">
        <ScrollTray src="/tray.mp4" className="opacity-20" />
        <div className="container-custom mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive digital marketing solutions tailored to grow your business
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`section-padding ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service: ServiceData, index: number) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-3xl p-8 lg:p-10 transition-all duration-300 ${
                  isDark
                    ? "bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.05]"
                    : "bg-white shadow-lg hover:shadow-2xl"
                }`}
              >
                <div className={`w-16 h-16 bg-linear-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {service.icon && <service.icon className="w-8 h-8 text-white" />}
                </div>
                
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>{service.title}</h2>
                <p className={`mb-6 leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature: string) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <span className={isDark ? "text-neutral-300" : "text-gray-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className={`pt-6 border-t ${isDark ? "border-white/[0.06]" : "border-gray-100"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">{service.price}</span>
                    <Link
                      href={`/services/${service.slug}`}
                      className={`text-sm font-semibold transition-colors ${
                        isDark
                          ? "text-neutral-300 hover:text-primary-400"
                          : "text-gray-900 hover:text-primary-600"
                      }`}
                    >
                      Learn More →
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center space-x-2 font-semibold transition-colors ${
                        isDark
                          ? "text-neutral-300 hover:text-primary-400"
                          : "text-gray-900 hover:text-primary-600"
                      }`}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`section-padding ${isDark ? "bg-dark-900" : "bg-white"}`}>
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
              Every business is unique. Contact us to discuss a tailored digital marketing 
              strategy that fits your specific needs and budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all transform hover:scale-105"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}