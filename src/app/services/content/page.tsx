// src/app/services/content/page.tsx
"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../../../../components/ThemeProvider";
import JsonLd from "../../../../components/JsonLd";
import { getBreadcrumbSchema } from "../../../../lib/schemas";
import { servicesData } from "@/lib/services";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Content Marketing Services | Media Linkers",
//   description:
//     "Create valuable content that attracts and retains your audience starting from $599/month. Blog, video, infographics & more.",
//   openGraph: {
//     title: "Content Marketing Services - Media Linkers",
//     description:
//       "Comprehensive content marketing including blog writing, video production, and content strategy.",
//     url: "https://medialinkers.pk/services/content",
//   },
// };

export default function ContentPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const service = servicesData.find((s) => s.slug === "content");

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://medialinkers.pk" },
    { name: "Services", url: "https://medialinkers.pk/services" },
    { name: "Content Marketing", url: "https://medialinkers.pk/services/content" },
  ]);

  return (
    <main className="pt-20">
      <JsonLd data={breadcrumb} />

      {/* Hero Section */}
      <section className={`py-20 lg:py-32 ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Content <span className="gradient-text">Marketing</span>
            </h1>
            <p className={`text-xl mb-8 ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
              {service?.longDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#plans"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-all"
              >
                View Plans <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all border ${
                  isDark
                    ? "border-white/20 text-white hover:bg-white/5"
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className={`py-16 lg:py-24 ${isDark ? "bg-dark-900" : "bg-white"}`}>
        <div className="container-custom mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-4xl font-bold mb-12 text-center ${isDark ? "text-white" : "text-gray-900"}`}
          >
            What's Included
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service?.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <span className={isDark ? "text-neutral-300" : "text-gray-700"}>{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className={`py-16 lg:py-24 ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Flexible Pricing Plans
            </h2>
            <p className={isDark ? "text-neutral-400" : "text-gray-600"}>
              Choose the perfect content package for your brand
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {service?.plans?.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-3xl p-8 relative transition-all ${
                  plan.highlighted
                    ? `bg-linear-to-br from-amber-600 to-orange-700 text-white transform lg:scale-105 shadow-2xl`
                    : isDark
                      ? "bg-white/5 border border-white/10 hover:border-white/20"
                      : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : isDark ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.highlighted ? "text-white/90" : isDark ? "text-neutral-400" : "text-gray-600"}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : isDark ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? "text-white/90" : isDark ? "text-neutral-400" : "text-gray-600"}>
                    {plan.billingCycle}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 ${plan.highlighted ? "text-white" : isDark ? "text-neutral-300" : "text-gray-700"}`}
                    >
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-white text-amber-600 hover:bg-gray-100"
                      : isDark
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 lg:py-24 ${isDark ? "bg-dark-900" : "bg-white"}`}>
        <div className="container-custom mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Can you write in our brand voice?",
                a: "Yes! We'll work closely with you to understand your brand voice and create content that authentically represents your company.",
              },
              {
                q: "How long are blog articles?",
                a: "Our blog articles typically range from 1,500-2,500 words, optimized for SEO while remaining engaging and valuable for readers.",
              },
              {
                q: "Do you include graphics in content packages?",
                a: "Graphics and visual content design are included in our Premium and Elite plans. Essential plans use stock imagery and simple formatting.",
              },
              {
                q: "Can we request revisions?",
                a: "Absolutely! We include revision rounds in all plans to ensure you're completely satisfied with the content before publication.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${isDark ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"}`}
              >
                <h3 className={`font-bold text-lg mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {faq.q}
                </h3>
                <p className={isDark ? "text-neutral-400" : "text-gray-600"}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 lg:py-24 ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4 text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Start Creating Impact Through Content
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
            Let's build a content strategy that engages your audience and drives business results.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all"
          >
            Schedule Content Strategy Session <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
