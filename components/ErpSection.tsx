// components/ErpSection.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Warehouse, 
  Boxes, 
  LineChart, 
  ShieldCheck, 
  ArrowRight,
  Gauge,
  Factory
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const erpFeatures = [
  {
    icon: Warehouse,
    title: "Inventory you can trust",
    description: "Track raw materials, finished goods and scrap in one place, with reorder signals based on real stock levels."
  },
  {
    icon: Factory,
    title: "Production visibility",
    description: "See machine output, downtime and production activity without relying on disconnected spreadsheets."
  },
  {
    icon: Boxes,
    title: "Traceable batches",
    description: "Connect each batch to its materials, machine activity, operators and quality checks."
  },
  {
    icon: LineChart,
    title: "Clear supplier records",
    description: "Keep supplier balances, credit terms and payment information together for faster decisions."
  },
  {
    icon: ShieldCheck,
    title: "Orders and contracts",
    description: "Track orders, invoices, deposits and delivery progress from one operational system."
  },
  {
    icon: Gauge,
    title: "Useful margin reports",
    description: "Turn production and material data into practical yield, cost and margin reports."
  }
];

export default function ErpSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section 
      id="custom-manufacturing-erp"
      className={`section-padding relative overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-dark-950 border-y border-white/[0.04]" : "bg-white border-y border-slate-100"
      }`}
    >
      {/* Background lights */}
      <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 ${
        isDark ? "bg-primary-500/[0.03]" : "bg-primary-500/[0.04]"
      }`} />
      <div className={`absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none ${
        isDark ? "bg-indigo-500/[0.03]" : "bg-indigo-500/[0.04]"
      }`} />

      <div className="container-custom mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Copy Area */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-primary-500/20 bg-primary-500/10 text-primary-400"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Featured case study | Manufacturing software</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-3xl md:text-4.5xl font-bold tracking-tight leading-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              A real example of custom ERP for plastic manufacturing
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base leading-relaxed ${
                isDark ? "text-neutral-300" : "text-gray-600"
              }`}
            >
              This is why manufacturing businesses choose custom software: one system connects inventory, production, suppliers and reporting around the plant&apos;s actual workflow. It is an example of our work, not a requirement for every client.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link 
                href="/portfolio/plastic-factory-erp"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold shadow-lg shadow-primary-600/20 hover:shadow-primary-600/35 transition-all duration-300 group"
              >
                <span>Read the Case Study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services/custom-erp"
                className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold border transition-all duration-300 ${
                  isDark 
                    ? "border-white/[0.08] hover:border-white/20 bg-white/[0.02] text-white" 
                    : "border-gray-200 hover:border-gray-300 bg-slate-50 text-gray-800"
                }`}
              >
                ERP Development
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`grid grid-cols-2 gap-6 pt-8 border-t ${
                isDark ? "border-white/[0.06]" : "border-gray-100"
              }`}
            >
              <div>
                <p className="text-lg font-extrabold text-primary-400">You own the code</p>
                <p className={`text-xs mt-1 ${isDark ? "text-neutral-400" : "text-gray-500"}`}>No per-user ERP license fees</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-indigo-400">Built for the floor</p>
                <p className={`text-xs mt-1 ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
                  <Link href="/services/manufacturing" className="hover:underline">
                    Manufacturing software
                  </Link>
                  {" "}shaped around real operations
                </p>
              </div>
            </motion.div>
          </div>

          {/* Grid Layout of Modules */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            {erpFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                  isDark 
                    ? "bg-dark-900/60 border-white/[0.04] hover:bg-dark-800 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5" 
                    : "bg-slate-50/50 border-gray-100 hover:bg-white hover:border-primary-500/20 hover:shadow-xl hover:shadow-primary-500/5"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isDark ? "bg-white/[0.03] group-hover:bg-primary-500/10 text-primary-400" : "bg-white group-hover:bg-primary-50 text-primary-600 shadow-sm"
                }`}>
                  <feat.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className={`text-base font-bold mb-2 transition-colors ${
                  isDark ? "text-white group-hover:text-primary-400" : "text-gray-900 group-hover:text-primary-600"
                }`}>
                  {feat.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-gray-500"
                }`}>
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
