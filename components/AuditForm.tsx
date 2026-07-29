// components/AuditForm.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function AuditForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
  });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      className={`section-padding relative overflow-hidden ${
        isDark ? "bg-dark-900" : "bg-slate-50"
      }`}
    >
      {/* Background */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-500/[0.04] to-dark-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/[0.05] rounded-full blur-[200px] pointer-events-none" />
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-200/15 rounded-full blur-[200px] pointer-events-none" />
      )}

      <div className="container-custom mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
                isDark
                  ? "glass text-primary-400"
                  : "bg-primary-50 border border-primary-200/60 text-primary-600"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Free SEO Audit
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Get Free SEO Audit{" "}
              <span className="gradient-text">Today</span>
            </h2>
            <p
              className={`text-base sm:text-lg mb-8 leading-relaxed ${
                isDark ? "text-neutral-400" : "text-gray-500"
              }`}
            >
              Discover how MA Softs can grow your website traffic, leads,
              and sales. My comprehensive SEO audit identifies opportunities
              and provides actionable recommendations.
            </p>

            <div className="space-y-4">
              {[
                "Complete website analysis",
                "Competitor benchmarking",
                "Keyword opportunity report",
                "Technical SEO checklist",
                "Actionable recommendations",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-success-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-success-400" />
                  </div>
                  <span
                    className={`text-[15px] ${
                      isDark ? "text-neutral-300" : "text-gray-600"
                    }`}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className={`backdrop-blur-xl rounded-3xl p-8 lg:p-10 border shadow-2xl ${
                isDark
                  ? "bg-white/[0.03] border-white/[0.06]"
                  : "bg-white border-gray-100"
              }`}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-success-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-success-400" />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Thank You!
                  </h3>
                  <p className={isDark ? "text-neutral-400" : "text-gray-500"}>
                    I've received your request. I will analyze your
                    website and send the audit report within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Request Your Free Audit
                  </h3>
                  <p
                    className={`text-sm mb-8 ${
                      isDark ? "text-neutral-400" : "text-gray-400"
                    }`}
                  >
                    Fill in the details below and I will get back to you.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-neutral-300" : "text-gray-700"
                        }`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-300 ${
                          isDark
                            ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-600 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                        }`}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-neutral-300" : "text-gray-700"
                          }`}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-300 ${
                            isDark
                              ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-600 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                              : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                          }`}
                          placeholder="yourname@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-neutral-300" : "text-gray-700"
                          }`}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-300 ${
                            isDark
                              ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-600 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                              : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                          }`}
                          placeholder="+92 336 7057973"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-neutral-300" : "text-gray-700"
                        }`}
                      >
                        Website URL
                      </label>
                      <input
                        type="url"
                        required
                        className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-300 ${
                          isDark
                            ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-600 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                        }`}
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2.5 mt-2"
                    >
                      <span>Get My Free Audit</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    <p
                      className={`text-xs text-center mt-4 ${
                        isDark ? "text-neutral-400" : "text-gray-400"
                      }`}
                    >
                      I respect your privacy. Your information is safe with me.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
