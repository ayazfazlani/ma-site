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
    title: "Raw Material & Feedstock Ingestion",
    description: "Track plastic pellets, masterbatch colors, resin, pipe joints, and scrap regrind with automatic reorder triggers."
  },
  {
    icon: Factory,
    title: "Machinery Cycle & Output Analytics",
    description: "Monitor injection molding parameters, pipe extruder throughput, machinery logs, and factory downtime."
  },
  {
    icon: Boxes,
    title: "Production Batch Tracking",
    description: "Associate active batches with raw materials, machine logs, shift operators, and quality inspection audits."
  },
  {
    icon: LineChart,
    title: "Supplier Ledger & Accounting",
    description: "Keep transparent ledger tracking with supplier balances, credit periods, and clear payment triggers."
  },
  {
    icon: ShieldCheck,
    title: "Government Contract Management",
    description: "Monitor local development bids, progress invoicing, security deposits, and final clearances."
  },
  {
    icon: Gauge,
    title: "Live Yield & Margin Reports",
    description: "Calculate your exact price per kilogram or per pipe in real-time as feedstock costs fluctuate."
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
              <span>MANUFACTURING ERP SOLUTIONS</span>
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
              Custom ERP for <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-indigo-400">
                Plastic & Pipe
              </span> Industries
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
              I build custom Enterprise Resource Planning software tailored to operations like plastic moulding extrusion, industrial manufacturing, and raw inventory management. Track waste margins, supplier accounts, machine parameters, and government contracting ledgers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold shadow-lg shadow-primary-600/20 hover:shadow-primary-600/35 transition-all duration-300 group"
              >
                <span>Request Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services/custom-erp"
                className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold border transition-all duration-300 ${
                  isDark 
                    ? "border-white/[0.08] hover:border-white/20 bg-white/[0.02] text-white" 
                    : "border-gray-205 hover:border-gray-300 bg-slate-50 text-gray-800"
                }`}
              >
                Explore Modules
              </Link>
            </motion.div>

            {/* Quick Metrics */}
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
                <p className="text-3xl font-extrabold text-primary-400">100%</p>
                <p className={`text-xs mt-1 ${isDark ? "text-neutral-400" : "text-gray-500"}`}>Bespoke Codebase (No License Fees)</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-indigo-400">Local</p>
                <p className={`text-xs mt-1 ${isDark ? "text-neutral-400" : "text-gray-500"}`}>Supplier Ledgers & Tax Ready</p>
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
