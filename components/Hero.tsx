// components/Hero.tsx
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import HeroBackground from "./HeroBackground";

export default function Hero({
  avatarSlot,
}: {
  avatarSlot?: React.ReactNode;
}) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-950"
    >
      <HeroBackground />

      <div className="container-custom relative z-10 mx-auto pt-28 pb-16 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center">
            <span
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide mb-8 bg-primary-50 border border-primary-200/60 text-primary-600 shadow-sm dark:glass dark:text-primary-300 dark:bg-transparent dark:border-transparent"
            >
              <span className="w-2 h-2 rounded-full animate-pulse-glow bg-primary-500 dark:bg-accent-400" />
              ERP · Manufacturing · Web Apps · SaaS
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900 dark:text-white"
          >
            Custom Software
            <br />
            <span className="gradient-text animate-gradient">
              Development Services
            </span>
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-4 leading-relaxed text-gray-700 dark:text-neutral-400"
          >
            Build the software your business actually needs — from custom ERP systems and manufacturing software to web applications and SaaS platforms.
          </p>
          <p
            className="text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed text-gray-600 dark:text-neutral-500"
          >
            MA Softs helps businesses replace spreadsheets, disconnected tools, and off-the-shelf limitations with software built around their workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-16">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-[1.03]"
            >
              <span className="relative z-10">Discuss Your Software Project</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:border-white/10 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/[0.04]"
            >
              <span>View Our Work</span>
            </Link>
          </div>

          {avatarSlot ? <div className="mb-12">{avatarSlot}</div> : null}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-200 dark:border-white/[0.06]">
            {[
              { value: "Custom-built", label: "You own the software" },
              { value: "Manufacturing ERP", label: "Proven on the factory floor" },
              { value: "Remote delivery", label: "For teams worldwide" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-base sm:text-lg font-bold mb-1 tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-float text-gray-500 dark:text-neutral-400">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
