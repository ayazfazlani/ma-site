// components/WhoThisIsFor.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileSpreadsheet, GitBranch, ShieldCheck, Workflow } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const solutions = [
  {
    icon: FileSpreadsheet,
    problem: "Your team re-enters the same information in Excel, WhatsApp and email.",
    solution: "We create one shared database and automate the handoffs between teams.",
  },
  {
    icon: GitBranch,
    problem: "Sales, operations, finance and management work from different records.",
    solution: "We connect departments with one workflow, clear approvals and live reports.",
  },
  {
    icon: ShieldCheck,
    problem: "Everyone can see or change information they should not access.",
    solution: "We add role-based access, permissions and activity history for each team.",
  },
  {
    icon: Workflow,
    problem: "Manual reporting and repetitive tasks slow down decisions.",
    solution: "We turn the process into software that calculates, notifies and reports automatically.",
  },
];

export default function WhoThisIsFor() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-900" : "bg-slate-50"
      }`}
    >
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      )}

      <div className="container-custom mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
                isDark
                  ? "glass text-accent-400"
                  : "bg-accent-300/10 border border-accent-400/20 text-accent-500"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
              Who this is for
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              From disconnected work to{" "}
              <span className="gradient-text">one clear system</span>
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
              You do not need to know the technical answer. Tell us where work gets lost, repeated or delayed, and we will map the right website, web app, automation or internal business system.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/35 transition-all group"
            >
              Discuss Your Requirements
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {solutions.map((item, index) => (
              <motion.div
                key={item.problem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-5 rounded-2xl border ${
                  isDark
                    ? "bg-white/[0.02] border-white/[0.05]"
                    : "bg-white border-gray-100 shadow-sm"
                }`}
              >
                <item.icon className="w-6 h-6 mb-4 text-primary-500" />
                <p className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
                  <span className={`font-semibold ${isDark ? "text-neutral-200" : "text-gray-800"}`}>Problem: </span>
                  {item.problem}
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-neutral-300" : "text-gray-700"}`}>
                  <span className="font-semibold text-success-500">Solution: </span>
                  {item.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
