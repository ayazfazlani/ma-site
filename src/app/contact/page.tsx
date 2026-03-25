// app/contact/page.tsx
"use client";

import { motion } from "framer-motion";
import ScrollTray from "../../../components/ScrollTray";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../../components/ThemeProvider";
import JsonLd from "../../../components/JsonLd";
import { contactPageSchema, getBreadcrumbSchema } from "../../../lib/schemas";

const contactBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://ma-softs.com" },
  { name: "Contact", url: "https://ma-softs.com/contact" },
]);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <main className="pt-20">
      {/* SEO Schemas */}
      <JsonLd data={contactPageSchema} />
      <JsonLd data={contactBreadcrumb} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-900 to-primary-800 py-20 lg:py-32">
        <ScrollTray src="/tray.mp4" className="opacity-20" />
        <div className="container-custom mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ready to build your custom software? Let's discuss your project
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`section-padding ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Contact Information</h2>
                <p className={`mb-8 ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              {[
                { icon: Phone, title: "Phone", content: "+92 336 7057973", href: "tel:+923367057973" },
                { icon: Mail, title: "Email", content: "ayaz@ma-softs.com", href: "mailto:ayaz@ma-softs.com" },
                { icon: MapPin, title: "Address", content: "123 Business Avenue, Karachi, Pakistan", href: "#" },
                { icon: Clock, title: "Working Hours", content: "Mon - Sat: 9:00 AM - 6:00 PM", href: "#" },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex items-start space-x-4 group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isDark
                    ? "bg-primary-500/15 group-hover:bg-primary-500/25"
                    : "bg-primary-50 group-hover:bg-primary-600"
                    }`}>
                    <item.icon className={`w-6 h-6 transition-colors ${isDark
                      ? "text-primary-400"
                      : "text-primary-600 group-hover:text-white"
                      }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                    <p className={isDark ? "text-neutral-400" : "text-gray-600"}>{item.content}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className={`rounded-3xl p-8 lg:p-10 ${isDark
                ? "bg-white/[0.03] border border-white/[0.06]"
                : "bg-white shadow-xl"
                }`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-gray-700"}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark
                          ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-600 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                          }`}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-gray-700"}`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark
                          ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-600 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                          }`}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-gray-700"}`}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark
                          ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-600 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                          }`}
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-gray-700"}`}>
                        Service Interested In
                      </label>
                      <select
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark
                          ? "bg-white/[0.04] border-white/[0.08] text-white focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                          }`}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">Select a service</option>
                        <option value="web-apps">Custom Web Applications</option>
                        <option value="erp">Business Software & ERP</option>
                        <option value="startup-consulting">Startup Tech Strategy</option>
                        <option value="ecommerce">Advanced E-commerce</option>
                        <option value="technical-seo">Technical SEO & Speed</option>
                        <option value="ui-ux">UI/UX Design for SaaS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-gray-700"}`}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${isDark
                        ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-neutral-600 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                        }`}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
