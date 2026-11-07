import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Database,
  Factory,
  PackageCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schemas";

const pageUrl = "https://masofts.com/custom-erp-software-for-manufacturing";
const pageTitle = "Custom ERP Software for Manufacturing | MA Softs";
const pageDescription =
  "Custom ERP software for manufacturing helps teams manage production, inventory, raw materials, quality control, and reports in one connected system.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: "website",
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

const highlights = [
  {
    icon: Database,
    title: "Material and stock control",
    description: "Track raw materials, stock movements, warehouse balances, and order commitments with visibility across production and stores.",
  },
  {
    icon: Workflow,
    title: "Production planning",
    description: "Connect work order demand to machine schedules, production progress, and team responsibilities without spreadsheet dependence.",
  },
  {
    icon: BarChart3,
    title: "Operational reporting",
    description: "See output, yield, scrap, downtime, and productivity across departments and time periods in one shared view.",
  },
  {
    icon: ShieldCheck,
    title: "Quality and traceability",
    description: "Capture inspections, batch references, rejection reasons, and product traceability so teams can investigate issues quickly.",
  },
];

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
  { name: "Custom ERP Software for Manufacturing", url: pageUrl },
]);

export default function CustomErpForManufacturingPage() {
  return (
    <main className="pt-20 bg-white text-gray-900 dark:bg-dark-950 dark:text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: pageTitle,
          serviceType: "Custom ERP software for manufacturing",
          description: pageDescription,
          provider: {
            "@type": "Organization",
            name: "MA Softs",
            url: "https://masofts.com",
          },
          areaServed: "Worldwide",
        }}
      />
      <JsonLd data={breadcrumb} />

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-primary-900 px-4 py-16 text-white sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-100">
              <Factory className="h-4 w-4" />
              Manufacturing software for growing operations
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Custom ERP software for manufacturing teams that need better control
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100">
              MA Softs designs custom ERP software for manufacturing businesses that need one connected view of production, inventory, quality, and reporting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition hover:bg-primary-400"
              >
                Discuss your ERP needs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">What it solves</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for production, inventory, quality, and day-to-day decision-making
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-white/10 dark:bg-dark-900/60">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-neutral-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 dark:bg-dark-900/70 sm:px-6">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">Built around your process</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Replace disconnected spreadsheets with a single operating system
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 dark:text-neutral-300">
              <p>
                Many manufacturing teams still depend on spreadsheets, manual updates, and phone call follow-ups. That often creates delays, inventory inaccuracies, and weak reporting.
              </p>
              <p>
                A custom ERP gives team leads, production staff, and management a clearer view of the process, from materials and orders to output and quality checks.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-dark-950">
            <ul className="space-y-4">
              {[
                "Production planning and machine tracking",
                "Material issue, stock, and warehouse visibility",
                "Quality checkpoints and defect capture",
                "Live reports for managers and executive teams",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-medium text-gray-700 dark:text-neutral-200">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">Why custom ERP</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Off-the-shelf tools can force your process to fit their system
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Align with your workflow",
                description: "Map the actual steps your team follows, not a generic manufacturing template.",
              },
              {
                title: "Connect the right data",
                description: "Bring your production, stock, quality, and operational reporting into one place.",
              },
              {
                title: "Scale with growth",
                description: "Add modules and processes as your business gains more products, locations, or complexity.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-dark-900/60">
                <PackageCheck className="mb-4 h-8 w-8 text-primary-600" />
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-neutral-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-600 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Let’s build it</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Need a custom ERP system for your manufacturing business?
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-primary-700 transition hover:bg-gray-100"
            >
              Start a consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
