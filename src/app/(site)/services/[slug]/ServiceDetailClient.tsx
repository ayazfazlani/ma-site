// src/app/services/[slug]/ServiceDetailClient.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  Settings, 
  Layout, 
  Zap,
  Search,
  BarChart,
  Target,
  Users,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  Rocket,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import TestimonialsList from "@/components/TestimonialsList";
import { type ServiceData, servicesData } from "@/lib/services";

interface ServiceDetailClientProps {
  service: ServiceData;
  breadcrumb: any;
  serviceItemListSchema: any;
  servicesFaqSchema: any;
  serviceSchema: any;
  testimonials: any[];
}

const ICON_MAP: Record<string, any> = {
  Code2,
  Database,
  Cpu,
  Globe,
  Settings,
  Layout,
  Zap,
  Layers,
  Search,
  BarChart,
  Target,
  Users,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  Rocket
};

export default function ServiceDetailClient({
  service,
  breadcrumb,
  serviceItemListSchema,
  servicesFaqSchema,
  serviceSchema,
  testimonials,
}: ServiceDetailClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Find the actual service data with the non-serializable icon from our static data
  const fullService = servicesData.find(s => s.slug === service.slug) || service;
  const HeroIcon = fullService.icon ? ICON_MAP[fullService.icon] || Layers : Layers;

  return (
    <main className="pt-20 overflow-hidden">
      {/* SEO Schemas */}
      <JsonLd data={serviceItemListSchema} />
      <JsonLd data={servicesFaqSchema} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={serviceSchema} />

      {/* Hero Section */}
      <section className={`py-20 lg:py-32 relative ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] ${isDark ? "bg-primary-500/10" : "bg-primary-500/5"}`} />
          <div className={`absolute top-1/2 -left-24 w-72 h-72 rounded-full blur-[80px] ${isDark ? "bg-purple-500/10" : "bg-purple-500/5"}`} />
        </div>

        <div className="container-custom mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${isDark ? "glass text-primary-400" : "bg-primary-50 text-primary-600 border border-primary-100"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                Premium Service
              </div>
              <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] ${isDark ? "text-white" : "text-gray-900"}`}>
                {fullService.title.split(' ').map((word, i, arr) => (
                  i === arr.length - 1 ? <span key={i} className="gradient-text">{word}</span> : word + ' '
                ))}
              </h1>
              <p className={`text-xl mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                {fullService.longDescription || fullService.description}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href="#plans"
                  className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
                >
                  View Pricing Plans
                </Link>
                <Link
                  href="/contact"
                  className={`px-8 py-4 rounded-full font-bold text-lg border transition-all ${
                    isDark ? "border-white/10 text-white hover:bg-white/5" : "border-gray-200 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Book a Consultation
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 relative"
            >
              <div className={`relative w-64 h-64 lg:w-80 lg:h-80 mx-auto rounded-[3rem] p-12 flex items-center justify-center transition-all duration-500 ${isDark ? "bg-gradient-to-br from-primary-500/20 to-purple-500/20 glass border-primary-500/20 shadow-2xl shadow-primary-500/10" : "bg-white border-gray-100 shadow-xl"}`}>
                <HeroIcon className="w-full h-full text-primary-500" />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Zap className="w-6 h-6 text-white" fill="currentColor" />
                </div>
              </div>
              {/* Floating elements */}
              <div className={`absolute -bottom-6 -right-6 lg:right-0 p-4 rounded-2xl glass border shadow-xl ${isDark ? "text-white" : "text-gray-900"}`}>
                <div className="text-2xl font-bold">{fullService.price}</div>
                <div className="text-xs opacity-60">Starting Point</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className={`py-24 ${isDark ? "bg-dark-900" : "bg-white"}`}>
        <div className="container-custom mx-auto px-4 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-16 ${isDark ? "text-white" : "text-gray-900"}`}>
            What's Included in this <span className="gradient-text">Service</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullService.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-3xl border text-left transition-all hover:scale-[1.02] ${isDark ? "bg-white/5 border-white/10 hover:bg-white/[0.08]" : "bg-gray-50 border-gray-200 hover:bg-white hover:shadow-xl"}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-600/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {feature}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {fullService.whyChooseUs && (
        <section className={`py-24 ${isDark ? "bg-dark-950" : "bg-slate-50"}`}>
          <div className="container-custom mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                Why Partner With <span className="gradient-text">MA Softs?</span>
              </h2>
              <p className={isDark ? "text-neutral-400" : "text-gray-600"}>
                I bring together industry expertise and innovative technology to deliver results that matter.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fullService.whyChooseUs.map((point, i) => (
                <div key={i} className={`p-6 rounded-2xl border transition-all ${isDark ? "bg-dark-900/50 border-white/10" : "bg-white border-gray-100 shadow-sm"}`}>
                  <div className="w-10 h-10 rounded-xl bg-primary-600/10 flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-primary-500" />
                  </div>
                  <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{point.title}</h4>
                  <p className={`text-sm ${isDark ? "text-neutral-400" : "text-gray-600"}`}>{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Process Section */}
      {fullService.process && (
        <section className={`py-24 ${isDark ? "bg-dark-900" : "bg-white"}`}>
          <div className="container-custom mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                My <span className="gradient-text">Working Process</span>
              </h2>
              <p className={isDark ? "text-neutral-400" : "text-gray-600"}>From initial discovery to successful deployment and beyond.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {fullService.process.map((step, i) => (
                <div key={i} className="relative group">
                  <div className={`p-8 rounded-3xl border h-full transition-all ${isDark ? "bg-white/[0.02] border-white/10 group-hover:bg-white/[0.04]" : "bg-gray-50 border-gray-100 group-hover:bg-white group-hover:shadow-lg"}`}>
                    <div className="text-5xl font-black text-primary-600/10 mb-6 font-outline-2">{i + 1}</div>
                    <h4 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>{step.title}</h4>
                    <p className={isDark ? "text-neutral-400" : "text-gray-600"}>{step.description}</p>
                  </div>
                  {i < (fullService.process?.length || 0) - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] z-10">
                      <ArrowRight className="text-primary-600/20 w-8 h-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing / Plans Section */}
      {fullService.plans && (
        <section id="plans" className={`py-24 ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
          <div className="container-custom mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                Flexible <span className="gradient-text">Pricing Plans</span>
              </h2>
              <p className={isDark ? "text-neutral-400" : "text-gray-600"}>Choose the perfect plan for your business needs</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {fullService.plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className={`rounded-[2.5rem] p-8 relative transition-all border ${
                    plan.highlighted 
                      ? "bg-linear-to-br from-primary-600 to-primary-800 text-white lg:scale-105 shadow-2xl z-10 border-transparent" 
                      : isDark ? "bg-dark-900 border-white/10" : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : isDark ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <p className={`mb-8 text-sm opacity-80 ${plan.highlighted ? "text-white" : isDark ? "text-neutral-400" : "text-gray-600"}`}>{plan.description}</p>
                  <div className="mb-8 font-bold">
                    <span className="text-4xl">{plan.price}</span>
                    <span className="text-sm ml-1 opacity-70">{plan.billingCycle}</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className={`w-5 h-5 shrink-0 ${plan.highlighted ? "text-white" : "text-primary-500"}`} />
                        <span className="opacity-90">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`block w-full py-4 rounded-2xl text-center font-bold transition-all ${
                      plan.highlighted 
                        ? "bg-white text-gray-500 hover:bg-gray-100" 
                        : "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Section */}
      {fullService.techStack && (
        <section className={`py-24 ${isDark ? "bg-dark-900" : "bg-white"}`}>
          <div className="container-custom mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                Technologies <span className="gradient-text">I Use</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {fullService.techStack.map((tech, i) => {
                const TechIcon = ICON_MAP[tech.icon] || Code2;
                return (
                  <div key={i} className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all hover:scale-105 ${isDark ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]" : "bg-white border-gray-100 shadow-sm"}`}>
                    <TechIcon className={`w-6 h-6 ${tech.color || "text-primary-500"}`} />
                    <span className={`font-bold ${isDark ? "text-white" : "text-gray-700"}`}>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className={`py-24 ${isDark ? "bg-dark-950" : "bg-slate-50"}`}>
        <div className="container-custom mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              What My <span className="gradient-text">Clients Say</span>
            </h2>
          </div>
          <TestimonialsList testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ Section */}
      {fullService.faqs && (
        <section className={`py-24 ${isDark ? "bg-dark-900" : "bg-white"}`}>
          <div className="container-custom mx-auto px-4 max-w-3xl">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-12 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
              Service <span className="gradient-text">FAQ</span>
            </h2>
            <div className="space-y-4">
              {fullService.faqs.map((faq, i) => (
                <div key={i} className={`rounded-3xl border overflow-hidden transition-all ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-gray-100 shadow-sm"}`}>
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between gap-4 font-bold"
                  >
                    <span className={isDark ? "text-white" : "text-gray-900"}>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaqIndex === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`px-8 overflow-hidden transition-all duration-300 ${openFaqIndex === i ? "pb-6 max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className={isDark ? "text-neutral-400" : "text-gray-600"}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className={`py-24 relative overflow-hidden ${isDark ? "bg-primary-950" : "bg-primary-50"}`}>
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
        </div>
        <div className="container-custom mx-auto px-4 text-center relative z-10">
          <h2 className={`text-4xl sm:text-5xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>
            Ready to Accelerate Your <span className="gradient-text">Startup?</span>
          </h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${isDark ? "text-neutral-300" : "text-gray-600"}`}>
            Let's discuss how my {fullService.title} can help your business grow and succeed in the digital landscape.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-primary-600 text-white px-10 py-[1.25rem] rounded-full font-bold text-lg hover:bg-primary-700 transition-all hover:scale-105 shadow-2xl shadow-primary-500/40"
          >
            Start Your Journey Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
