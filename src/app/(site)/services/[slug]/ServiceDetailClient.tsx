// src/app/services/[slug]/ServiceDetailClient.tsx
"use client";

import { useTheme } from "../../../../components/ThemeProvider";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import JsonLd from "../../../../components/JsonLd";
import { type ServiceData, servicesData } from "../../../lib/services";

interface ServiceDetailClientProps {
  service: ServiceData;
  breadcrumb: any;
  serviceItemListSchema: any;
  servicesFaqSchema: any;
  serviceSchema: any;
}

export default function ServiceDetailClient({
  service,
  breadcrumb,
  serviceItemListSchema,
  servicesFaqSchema,
  serviceSchema,
}: ServiceDetailClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Find the actual service data with the non-serializable icon from our static data
  const fullService = servicesData.find(s => s.slug === service.slug);
  const Icon = fullService?.icon;

  return (
    <main className="pt-20">
      {/* SEO Schemas */}
      <JsonLd data={serviceItemListSchema} />
      <JsonLd data={servicesFaqSchema} />
      <JsonLd data={breadcrumb} />
      {/* individual service schema for SEO */}
      <JsonLd data={serviceSchema} />

      <section className="section-padding">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="flex-shrink-0">
              <div
                className={`w-20 h-20 bg-linear-to-br ${service.color} rounded-3xl flex items-center justify-center mb-4`}
              >
                {Icon && <Icon className="w-10 h-10 text-white" />}
              </div>
            </div>
            <div>
              <h1 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                {service.title}
              </h1>
              <p className={`text-lg mb-6 leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                {service.description}
              </p>
              <ul className="space-y-4 mb-8">
                {service.features.map((f: string) => (
                  <li key={f} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className={isDark ? "text-neutral-300" : "text-gray-700"}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-8 p-6 rounded-2xl bg-primary-600/5 border border-primary-600/10 inline-block">
                <span className="text-sm font-medium text-primary-500 uppercase tracking-wider block mb-1">Price Starting From</span>
                <span className="text-3xl font-bold text-primary-600">{service.price}</span>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all hover:scale-[1.03] shadow-lg shadow-primary-500/20"
                >
                  <span>Get Started with {service.title}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section for custom solutions */}
      <section className={`section-padding ${isDark ? "bg-dark-900" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Have questions about our {service.title}?
            </h2>
            <p className={`text-xl mb-8 ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
              Reach out and we’ll craft a personalized plan to match your unique business goals and budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all hover:scale-[1.03] shadow-lg shadow-primary-500/20"
            >
              <span>Speak to an Agent</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
