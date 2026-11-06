// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Factory,
  Globe2,
  Layout,
  Layers3,
  Settings,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { servicesData } from "@/lib/services";

const serviceIconMap: Record<string, LucideIcon> = {
  Database,
  Factory,
  Code2,
  Globe: Globe2,
  Settings,
  Cpu,
  Layout,
  Briefcase,
};

const featuredServiceSlugs = [
  "custom-erp",
  "manufacturing",
  "web-development",
  "small-business",
];
const featuredServices = servicesData.filter((service) => featuredServiceSlugs.includes(service.slug));
const additionalServices = servicesData.filter((service) => !featuredServiceSlugs.includes(service.slug));
const serviceMenuItems = [
  ...featuredServices.map((service) => ({
    href: `/services/${service.slug}`,
    label: service.title,
    description: service.description,
    icon: serviceIconMap[service.icon || ""] || Layers3,
  })),
  {
    href: "/erp-for-plastic-injection-molding",
    label: "ERP for plastic injection molding",
    description: "A focused system for plastic factory operations.",
    icon: Layers3,
  },
  ...additionalServices.map((service) => ({
    href: `/services/${service.slug}`,
    label: service.title,
    description: service.description,
    icon: serviceIconMap[service.icon || ""] || Layers3,
  })),
];

const workMenuItems = [
  {
    href: "/portfolio",
    label: "Portfolio & case studies",
    description: "See selected projects and the problems they address.",
    icon: BriefcaseBusiness,
  },
  {
    href: "/portfolio/plastic-factory-erp",
    label: "Plastic factory ERP case study",
    description: "Review a real manufacturing software project.",
    icon: Factory,
  },
];

const navItems = [
  { type: "link", href: "/", label: "Home" },
  { type: "link", href: "/about", label: "About" },
  {
    type: "menu",
    label: "Services",
  },
  {
    type: "menu",
    label: "Work",
  },
  { type: "link", href: "/blog", label: "Insights" },
] as const;

function DropdownPanel({
  label,
  isDark,
  onNavigate,
}: {
  label: "Services" | "Work";
  isDark: boolean;
  onNavigate: () => void;
}) {
  const isServicesMenu = label === "Services";
  const items = isServicesMenu ? serviceMenuItems : workMenuItems;

  return (
    <div
      className={`max-h-[calc(100dvh-110px)] overflow-y-auto rounded-2xl border shadow-2xl ${
        isDark
          ? "border-white/10 bg-dark-900 shadow-black/40"
          : "border-gray-200 bg-white shadow-gray-900/15"
      }`}
    >
      <div className="p-5 sm:p-6">
        <p className={`text-xs font-bold uppercase tracking-[0.16em] ${
          isDark ? "text-primary-300" : "text-primary-700"
        }`}>
          {isServicesMenu ? "What we build" : "Proof of work"}
        </p>
        <h2 className={`mt-1 text-lg font-bold ${
          isDark ? "text-white" : "text-gray-950"
        }`}>
          {isServicesMenu ? "Software shaped around your business" : "Selected projects & case studies"}
        </h2>
        <p className={`mt-1 text-sm ${
          isDark ? "text-neutral-400" : "text-gray-600"
        }`}>
          {isServicesMenu
            ? "Choose a service to explore scope, capabilities, and next steps."
            : "See how we approach real business and manufacturing needs."}
        </p>
        <div className={`mt-4 grid gap-2 ${
          isServicesMenu ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
        }`}>
          {items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`group flex min-h-24 items-start gap-3 rounded-xl border p-3 transition-colors ${
                isDark
                  ? "border-white/[0.06] hover:border-primary-400/30 hover:bg-white/[0.04]"
                  : "border-gray-100 hover:border-primary-200 hover:bg-primary-50/60"
              }`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                isDark
                  ? "bg-primary-500/15 text-primary-300"
                  : "bg-primary-50 text-primary-700"
              }`}>
                <link.icon className="h-4 w-4" />
              </span>
              <span>
                <span className={`block text-sm font-semibold leading-snug ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {link.label}
                </span>
                <span className={`mt-1 block text-xs leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-gray-600"
                }`}>
                  {link.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className={`flex items-center justify-between border-t px-5 py-3.5 sm:px-6 ${
        isDark ? "border-white/[0.08] bg-white/[0.02]" : "border-gray-100 bg-gray-50"
      }`}>
        <span className={`text-xs ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
          {isServicesMenu ? "Need help choosing?" : "Want to discuss similar work?"}
        </span>
        <Link
          href={isServicesMenu ? "/services" : "/contact"}
          onClick={onNavigate}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-500 dark:text-primary-300"
        >
          {isServicesMenu ? "View all services" : "Let’s talk"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function MobileMenuGroup({
  label,
  isDark,
  isOpen,
  onToggle,
  onNavigate,
}: {
  label: "Services" | "Work";
  isDark: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const isServicesMenu = label === "Services";
  const items = isServicesMenu ? serviceMenuItems : workMenuItems;

  return (
    <div className="border-b border-gray-200/70 py-1 dark:border-white/[0.06]">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold ${
          isDark ? "text-white hover:bg-white/[0.04]" : "text-gray-900 hover:bg-gray-100"
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="space-y-2 px-2 pb-3">
          {items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`flex items-start gap-3 rounded-xl border p-3 ${
                isDark
                  ? "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]"
                  : "border-gray-100 bg-white hover:bg-primary-50/60"
              }`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                isDark ? "bg-primary-500/15 text-primary-300" : "bg-primary-50 text-primary-700"
              }`}>
                <link.icon className="h-4 w-4" />
              </span>
              <span>
                <span className={`block text-sm font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {link.label}
                </span>
                <span className={`mt-0.5 block text-xs leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-gray-600"
                }`}>
                  {link.description}
                </span>
              </span>
            </Link>
          ))}
          <Link
            href={isServicesMenu ? "/services" : "/contact"}
            onClick={onNavigate}
            className="inline-flex items-center gap-1 px-2 py-1 text-sm font-bold text-primary-600 dark:text-primary-300"
          >
            {isServicesMenu ? "View all services" : "Discuss a project"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slide-up-subtle ${isScrolled
        ? isDark
          ? "bg-dark-950/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
          : "bg-white/90 backdrop-blur-2xl border-b border-gray-200/80 shadow-lg shadow-black/5"
        : "bg-transparent"
        }`}
    >
      <nav className="container-custom mx-auto">
        <div className="flex items-center justify-between h-[72px] lg:h-[76px]">
          {/* Logo */}
          <Link href="/" aria-label="MA Softs – Home" className="relative z-10 flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-400/20 backdrop-blur-md flex items-center justify-center shadow-lg shadow-primary-500/10 group-hover:shadow-primary-500/30 transition-all duration-300 border border-white/[0.08] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:opacity-100" />
              <Image
                src={isDark ? "/ma-sols-logo.png" : "/ma-sols-logo.png"}
                alt="MA Softs Logo"
                width={60}
                height={60}
                sizes="40px"
                className="object-contain relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-tight leading-none ${isDark ? "text-white" : "text-gray-900"}`}>
                MA<span className="text-primary-400"> Softs</span>
              </span>
              <span className={`mt-1 text-[9px] uppercase tracking-[0.16em] font-medium ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                ERP · Manufacturing · Web Apps
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => item.type === "menu" ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={(event) => {
                  if (!event.currentTarget.contains(document.activeElement)) setOpenDropdown(null);
                }}
                onFocus={() => setOpenDropdown(item.label)}
                onBlur={(event) => {
                  if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
                    setOpenDropdown(null);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setOpenDropdown(null);
                    event.currentTarget.querySelector("button")?.focus();
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={openDropdown === item.label}
                  aria-controls={`nav-${item.label.toLowerCase()}`}
                  onClick={() => setOpenDropdown((current) => current === item.label ? null : item.label)}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                    isDark
                      ? "text-neutral-300 hover:bg-white/[0.05] hover:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-950"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
                <div
                  id={`nav-${item.label.toLowerCase()}`}
                  className={`absolute left-1/2 top-full z-50 w-[min(94vw,68rem)] -translate-x-1/2 pt-3 transition-all duration-150 ${
                    openDropdown === item.label
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-1 opacity-0"
                  }`}
                >
                  <DropdownPanel
                    label={item.label}
                    isDark={isDark}
                    onNavigate={() => setOpenDropdown(null)}
                  />
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${isDark
                  ? "text-neutral-300 hover:bg-white/[0.05] hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-950"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+923367057973"
              className={`text-xs font-medium transition-colors duration-300 ${isDark ? "text-neutral-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              +92 336 7057973
            </a>
            <ThemeToggle />
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full text-[13px] font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25"
            >
              <span className="relative z-10">Discuss Project</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className={`relative z-10 p-3 rounded-xl transition-colors ${isDark ? "text-white hover:bg-white/[0.06]" : "text-gray-900 hover:bg-gray-100"
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out backdrop-blur-2xl border-t ${
          isMobileMenuOpen ? "max-h-[calc(100dvh-72px)] opacity-100" : "max-h-0 opacity-0 border-transparent"
        } ${isDark
          ? "bg-dark-950/98 border-white/[0.06]"
          : "bg-white/98 border-gray-200/60"
        }`}
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
      >
        <div className="container-custom max-h-[calc(100dvh-72px)] overflow-y-auto py-4">
          {navItems.map((item) => item.type === "menu" ? (
            <MobileMenuGroup
              key={item.label}
              label={item.label}
              isDark={isDark}
              isOpen={openDropdown === item.label}
              onToggle={() => setOpenDropdown((current) => current === item.label ? null : item.label)}
              onNavigate={() => {
                setIsMobileMenuOpen(false);
                setOpenDropdown(null);
              }}
            />
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 text-base font-semibold ${
                isDark ? "text-white hover:bg-white/[0.04]" : "text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/contact"
              className="block w-full text-center bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-xl font-semibold text-base shadow-lg shadow-primary-500/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
