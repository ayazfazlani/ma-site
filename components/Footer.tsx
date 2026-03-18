// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

import { servicesData } from "../src/lib/services";

const footerLinks = {
  services: servicesData
    // exclude analytics page if not needed in footer
    .filter((s) => s.slug !== "analytics" && s.slug !== "analytics-reporting")
    .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Free Tools", href: "/tools" },
    { label: "Marketing Guides", href: "/guides" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`relative overflow-hidden border-t ${
        isDark
          ? "bg-dark-950 text-white border-white/[0.04]"
          : "bg-gray-900 text-white border-gray-800"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom mx-auto relative z-10">
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/30 transition-shadow">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold">
                Media<span className="text-primary-400">Linkers</span>
              </span>
            </Link>
            <p className="text-neutral-500 mb-8 max-w-sm leading-relaxed">
              Pakistan&apos;s leading digital marketing agency with 17+ years of
              experience helping businesses grow their online presence and
              revenue.
            </p>

            {/* Contact Info */}
            <div className="space-y-3.5">
              <a
                href="mailto:info@medialinkers.pk"
                className="flex items-center gap-3 text-neutral-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                <Mail className="w-4.5 h-4.5" />
                <span>info@medialinkers.pk</span>
              </a>
              <a
                href="tel:+923001234567"
                className="flex items-center gap-3 text-neutral-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                <Phone className="w-4.5 h-4.5" />
                <span>+92 300 1234567</span>
              </a>
              <div className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                <span>123 Business Avenue, Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-500 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-500 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-500 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Media Linkers. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white/[0.04] hover:bg-primary-500/20 rounded-xl flex items-center justify-center text-neutral-500 hover:text-primary-400 transition-all duration-300 border border-white/[0.04] hover:border-primary-500/20"
                aria-label={social.label}
              >
                <social.icon className="w-4.5 h-4.5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-xl shadow-xl shadow-primary-500/25 flex items-center justify-center hover:shadow-primary-500/40 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}