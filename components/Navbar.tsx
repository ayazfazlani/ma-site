// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const isDark = theme === "dark";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? isDark
          ? "bg-dark-950/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
          : "bg-white/50 backdrop-blur-2xl border-b border-gray-800/60 shadow-lg shadow-black/5"
        : "bg-transparent"
        }`}
    >
      <nav className="container-custom mx-auto">
        <div className="flex items-center justify-between h-20 lg:h-[88px]">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-4 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-400/20 backdrop-blur-md flex items-center justify-center shadow-lg shadow-primary-500/10 group-hover:shadow-primary-500/30 transition-all duration-500 group-hover:scale-110 border border-white/[0.08] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:opacity-100" />
              <Image
                src={isDark ? "/ma-sols-logo.png" : "/ma-sols-logo.png"}
                alt="Ayaz - MA Softs"
                width={70}
                height={70}
                className="object-contain relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight leading-none ${isDark ? "text-white" : "text-gray-900"}`}>
                MA<span className="text-primary-400"> Softs</span>
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${isDark ? "text-neutral-500" : "text-gray-400"}`}>
                Ayaz | Software Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group ${isDark
                  ? "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
                  }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary-500 to-accent-400 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* CTA + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+923001234567"
              className={`text-sm font-medium transition-colors duration-300 ${isDark ? "text-neutral-500 hover:text-white" : "text-gray-400 hover:text-gray-900"
                }`}
            >
              +92 300 1234567
            </a>
            <ThemeToggle />
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:scale-[1.03]"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className={`relative z-10 p-2.5 rounded-xl transition-colors ${isDark ? "text-white hover:bg-white/[0.06]" : "text-gray-900 hover:bg-gray-100"
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6
              " /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:hidden backdrop-blur-2xl border-t ${isDark
              ? "bg-dark-950/98 border-white/[0.06]"
              : "bg-white/98 border-gray-200/60"
              }`}
          >
            <div className="container-custom py-8 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-3.5 px-4 text-lg font-medium transition-all rounded-xl ${isDark
                      ? "text-neutral-300 hover:text-white hover:bg-white/[0.04]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  className="block w-full text-center bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-primary-500/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}