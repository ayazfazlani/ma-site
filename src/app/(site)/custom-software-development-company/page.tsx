import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Database, Globe, Layers3, Workflow } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schemas";

const pageUrl = "https://masofts.com/custom-software-development-company";
const pageTitle = "Custom Software Development Company | MA Softs";
const pageDescription =
  "MA Softs is a custom software development company building ERP software, manufacturing systems, web apps, and business software for growing businesses.";

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

const services = [
  {
    title: "Custom ERP software",
    description: "Business systems for inventory, production, purchasing, stock, and reporting without the restrictions of off-the-shelf software.",
    icon: Database,
  },
  {
    title: "Manufacturing software",
    description: "Production tracking, material planning, quality control, and operations dashboards for real factory workflows.",
    icon: Workflow,
  },
  {
    title: "Web app development",
    description: "Custom client portals, dashboards, CRM tools, and web applications built to match the way your team works.",
    icon: Globe,
  },
  {
    title: "Business automation",
    description: "Automated approval flows, reporting, data handling, and internal tools that remove manual errors and delays.",
    icon: Layers3,
  },
];

const faq = [
  {
    question: "What is a custom software development company?",
    answer:
      "A custom software development company builds software around your workflows, rules, data, and growth goals instead of forcing you to change your process to fit a generic system.",
  },
  {
    question: "Do you build ERP software for businesses?",
    answer:
      "Yes. We build ERP software and business management systems for growing teams, manufacturing businesses, and operations-heavy companies that need more control than typical software provides.",
  },
  {
    question: "Do you also build websites and web apps?",
    answer:
      "Yes. We build custom websites, marketing platforms, client portals, dashboards, and full-stack web applications with business logic and reporting built in.",
  },
];

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
  { name: "Custom Software Development Company", url: pageUrl },
]);

export default function CustomSoftwareDevelopmentCompanyPage() {
  return (
    <main className="pt-20 bg-white text-gray-900 dark:bg-dark-950 dark:text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: pageTitle,
          serviceType: "Custom software development company",
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

      <section className="border-b border-gray-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-primary-900 px-4 py-16 text-white dark:border-white/10 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
              <BriefcaseBusiness className="h-4 w-4" />
              Custom software development company
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Custom software development company for businesses that need more than templates
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100">
              MA Softs builds ERP software, manufacturing software, web applications, and custom business systems around your workflows, your reporting needs, and your growth plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition hover:bg-primary-400"
              >
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">Why businesses hire us</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built to solve real operational problems
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map(({ title, description, icon: Icon }) => (
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
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">What we do</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              We help teams replace disconnected tools with software that fits the way they work
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 dark:text-neutral-300">
              <p>
                Many businesses rely on spreadsheets, scattered records, and manual follow-ups. That makes it harder to track production, approve work, manage inventory, and report accurately.
              </p>
              <p>
                We design software around operational rules, people, and data so your team gets a clearer view of what is happening and fewer bottlenecks in daily work.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-dark-950">
            <ul className="space-y-4">
              {[
                "Custom ERP software for operations, inventory, and reporting",
                "Web app development for dashboards, portals, and internal systems",
                "Manufacturing software for production, quality, and traceability",
                "Business automation to reduce manual work and delays",
              ].map((point) => (
                <li key={point} className="flex gap-3 text-sm font-medium text-gray-700 dark:text-neutral-200">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Common questions before a custom software project
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          {faq.map((item) => (
            <div key={item.question} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-dark-900/60">
              <h3 className="text-lg font-bold">{item.question}</h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-600 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Ready to build</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Need custom ERP, website, or business software that actually fits your operations?
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-primary-700 transition hover:bg-gray-100"
            >
              Start your project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
