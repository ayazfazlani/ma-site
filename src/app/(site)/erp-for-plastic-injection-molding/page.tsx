import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Check,
  Factory,
  Gauge,
  PackageCheck,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schemas";
import FaqSection from "@/components/FaqSection";
import { toFaqPageSchema, type FaqItem } from "@/lib/faq-data";

const pageUrl = "https://masofts.com/erp-for-plastic-injection-molding";
const pageTitle = "ERP for Plastic Injection Molding | Custom Factory Software | Masofts";
const pageDescription =
  "Custom ERP for plastic injection molding and manufacturing. Connect raw material tracking, machine activity, batch traceability, scrap management, and reporting.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: "website",
    images: ["/portfolio/plastic-factory-erp.png"],
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
    images: ["/portfolio/plastic-factory-erp.png"],
  },
};

const capabilities = [
  {
    icon: Warehouse,
    title: "Raw material tracking",
    description:
      "Keep resin and other material receipts, issues, and stock movements visible across production and stores.",
    value:
      "See what is on hand, what has been issued to production, and which stock movements need attention.",
  },
  {
    icon: Factory,
    title: "Production and machine activity",
    description:
      "Record production against machines and orders, and make downtime and output easier to review.",
    value:
      "Give supervisors a shared record of planned work, reported output, and machine interruptions.",
  },
  {
    icon: Boxes,
    title: "Batch traceability",
    description:
      "Connect production batches with the materials, machines, operators, and checks relevant to your process.",
    value:
      "Make it easier to follow a production lot from its inputs through inspection and finished stock.",
  },
  {
    icon: Gauge,
    title: "Scrap and yield visibility",
    description:
      "Log scrap and regrind according to your workflow, then use production data to understand material use.",
    value:
      "Record rejects and regrind consistently so teams can review yield and investigate recurring issues.",
  },
  {
    icon: ShieldCheck,
    title: "Quality checkpoints",
    description:
      "Capture inspection results and production checks alongside the work they relate to.",
    value:
      "Keep the inspection points that matter to your products visible with the related production record.",
  },
  {
    icon: PackageCheck,
    title: "Orders and reporting",
    description:
      "Bring customer orders, production progress, inventory, and operational reports into one view.",
    value:
      "Help sales and operations check commitments against stock and current production progress.",
  },
];

const workflowSteps = [
  {
    title: "Receive and identify materials",
    description:
      "Record incoming resin or other inputs, supplier details, quantities, and the storage location your team uses.",
  },
  {
    title: "Plan the production run",
    description:
      "Connect an order to a product, machine or line, planned quantity, and the material needed to start the work.",
  },
  {
    title: "Capture output and exceptions",
    description:
      "Log completed quantities, quality checks, downtime, rejects, and regrind as part of the production record.",
  },
  {
    title: "Reconcile stock and review",
    description:
      "Update finished goods and use the recorded activity to review order progress, material use, and open issues.",
  },
];

const deliveryItems = [
  "A walkthrough of material, production, quality, and dispatch workflows",
  "A prioritized first-release scope with roles, records, and reports",
  "Screen prototypes for review before the full build",
  "A staged implementation, testing, and team handover plan",
];

const faqs: FaqItem[] = [
  {
    question: "Is this an off-the-shelf injection molding ERP?",
    answer:
      "No. The page describes a custom software approach. We map your actual workflows and agree on the records and modules to build instead of asking you to adopt a fixed package.",
  },
  {
    question: "Can it track material lots through production?",
    answer:
      "Material and batch traceability can be included in the scope. The exact links—such as supplier lot, production run, machine, checks, and finished stock—depend on the records your operation needs to retain.",
  },
  {
    question: "Can it work with our existing spreadsheets or tools?",
    answer:
      "Existing tools and data are reviewed during discovery. Where it is practical and access is available, migration or integration can be scoped as part of the project rather than assumed.",
  },
  {
    question: "How do you decide what to build first?",
    answer:
      "We start with the biggest operational friction and map the users, handoffs, and information involved. Then we prioritize a focused first release and identify what can be added later.",
  },
  {
    question: "What does pricing depend on?",
    answer:
      "Cost depends on the workflows, roles, reporting, integrations, data migration, and deployment requirements. Share those details and we can discuss a scoped plan before work begins.",
  },
];

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
  { name: "ERP for Plastic Injection Molding", url: pageUrl },
]);

export default function PlasticInjectionMoldingErpPage() {
  return (
    <article className="overflow-hidden bg-white pt-20 text-gray-900 dark:bg-dark-950 dark:text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "ERP for Plastic Injection Molding",
          serviceType: "Custom manufacturing ERP software",
          description: pageDescription,
          url: pageUrl,
          provider: {
            "@type": "Organization",
            name: "MA Softs",
            url: "https://masofts.com",
          },
        }}
      />
      <JsonLd data={breadcrumb} />
      <JsonLd data={toFaqPageSchema(faqs)} />

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-primary-900 px-4 py-16 text-white sm:px-6 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-20 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
              <Factory className="h-4 w-4" />
              Custom manufacturing software · Real plastic factory experience
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              ERP for Plastic Injection Molding
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">
              Connect material inventory, production runs, machine activity, quality checks,
              scrap, and finished goods in one ERP shaped around how your molding operation
              actually works.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              MA Softs has delivered ERP for plastic manufacturing. We bring that context to
              discovery, then shape the scope around your products, machines, shifts, and team.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-black/20 transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Discuss your factory workflow
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/portfolio/plastic-factory-erp"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/50 bg-slate-950/30 px-6 py-3.5 text-base font-bold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View the real project
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-blue-100">
              Start with a conversation. Scope and pricing follow after we understand the process.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/25 bg-white/10 p-2 shadow-2xl shadow-black/30">
            <Image
              src="/portfolio/plastic-factory-erp.png"
              alt="Interface from a custom plastic manufacturing ERP project"
              width={1375}
              height={768}
              priority
              className="h-auto w-full rounded-2xl object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
            <p className="px-4 py-3 text-sm leading-relaxed text-white">
              Real plastic manufacturing ERP project — explore the case study for the details
              available to share.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white px-4 py-7 dark:border-white/10 dark:bg-dark-950 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
          {[
            ["Know what is on hand", "Material movements and stock connected to production."],
            ["Follow each run", "Production and quality records tied to the work."],
            ["See what needs action", "Exceptions and order progress easier to review."],
          ].map(([title, detail]) => (
            <div key={title} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-neutral-300">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
              What the system can connect
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From resin receipt to finished order
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600 dark:text-neutral-300">
              A useful factory system links the records teams already need to keep: what came in,
              where it went, what each run produced, what passed inspection, and what is ready to
              dispatch. Select the modules that fit your process rather than forcing every team
              into the same screen.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description, value }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:border-primary-300 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-primary-400/30 dark:hover:bg-white/[0.06]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600/10 text-primary-600 dark:text-primary-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-neutral-300">
                  {description}
                </p>
                <div className="mt-4 border-t border-gray-200 pt-3 dark:border-white/10">
                  <p className="flex items-start gap-2 text-sm font-medium leading-relaxed text-gray-800 dark:text-neutral-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50 px-4 py-16 dark:border-white/10 dark:bg-dark-900 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
              A practical production flow
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Information follows the work
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600 dark:text-neutral-300">
              Instead of entering the same facts in separate logs, map how a job moves through
              your factory and connect each handoff to the next record.
            </p>
          </div>
          <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-dark-950">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-neutral-300">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
              What working together looks like
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Know the plan before the build
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600 dark:text-neutral-300">
              First clarify the production realities and decisions the software should support.
              Then prioritize a useful first release and agree what is outside its scope.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {deliveryItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm leading-relaxed text-gray-700 dark:text-neutral-200">{item}</span>
              </li>
            ))}
            <li className="sm:col-span-2">
              <Link
                href="/portfolio/plastic-factory-erp"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-300 px-4 py-2.5 text-sm font-bold text-primary-800 transition hover:bg-primary-50 dark:border-primary-400/40 dark:text-primary-200 dark:hover:bg-primary-400/10"
              >
                See the plastic manufacturing ERP case study
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <FaqSection
        className="bg-gray-50 dark:bg-dark-900"
        title="Plastic injection molding ERP questions"
        subtitle="Understand the scope, process, and what to prepare before we talk."
        items={faqs}
      />

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-primary-900 p-7 text-center text-white shadow-xl sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
            Next step
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s map your production workflow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-blue-100">
            Share how you track materials, production, quality, and dispatch today. We&apos;ll
            discuss where a connected system can help and what a realistic first phase includes.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Share your workflow
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/services/manufacturing"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/50 bg-slate-950/30 px-6 py-3.5 text-base font-bold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore manufacturing software
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
