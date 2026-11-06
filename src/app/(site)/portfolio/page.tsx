import { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers, LayoutGrid } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import { portfolioListingFaqs, toFaqPageSchema } from "@/lib/faq-data";
import { applyPortfolioSeo } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio – Our Work & Case Studies",
  description: "Explore MA Softs portfolio of custom web applications, ERP systems, e-commerce platforms & SaaS solutions built for clients worldwide.",
  alternates: {
    canonical: "https://masofts.com/portfolio",
  },
  openGraph: {
    title: "MA Softs Portfolio – Our Work & Case Studies",
    description: "See our latest custom software projects, web applications, and digital transformations.",
    url: "https://masofts.com/portfolio",
    type: "website",
  },
};

type PortfolioCard = {
  slug?: string;
  title: string;
  description?: string;
  image?: string;
  images?: string[];
  category?: string;
  link?: string;
  _id?: string;
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  await dbConnect();

  // Fetch active projects and sort them
  const rawProjects = await ProjectModel.find({ active: true }).sort({ order: 1 }).lean();
  const projects = JSON.parse(JSON.stringify(rawProjects)).map((project: PortfolioCard) =>
    applyPortfolioSeo(project)
  ) as PortfolioCard[];

  return (
    <div className="min-h-screen bg-white pb-12 pt-24 font-sans dark:bg-dark-950 sm:pt-28">
      <JsonLd data={toFaqPageSchema(portfolioListingFaqs)} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="mx-auto mb-10 max-w-3xl text-center animate-in fade-in slide-in-from-bottom-5 duration-700 sm:mb-12">
          <h1 className="mb-4 text-3xl font-black leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Work</span>
          </h1>
          <p className="text-base leading-relaxed text-gray-600 dark:text-neutral-300">
            Explore real software projects and case studies. Each one explains the business context and the work shared publicly.
          </p>
        </div>

        {/* Portfolio Grid */}
        {projects.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const cover = project.image || project.images?.[0];
            return (
            <div
              key={project.slug || project._id || String(index)}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/[0.06] dark:bg-dark-900"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
            >
              {/* Image Showcase */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 dark:bg-white/[0.02]">
                {cover ? (
                  <Image
                    src={cover}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layers className="w-16 h-16 text-primary-500/20" />
                  </div>
                )}

                {/* Overlay Category Tag */}
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 backdrop-blur-md dark:border-white/[0.05] dark:bg-black/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                    <LayoutGrid className="w-3.5 h-3.5 text-primary-500" />
                    {project.category ?? "Portfolio"}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {project.title}
                </h3>
                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-neutral-300">
                  {project.description}
                </p>

                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white dark:bg-white/[0.03] dark:text-white"
                >
                  View Case Study
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
            </div>
            );
          })}
        </div>
        ) : (
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-gray-50 p-7 text-center dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">A focused look at our manufacturing work</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-neutral-300">
              We only publish client work when it is appropriate to share. In the meantime, explore how a custom system can support plastic manufacturing, or tell us what your operation needs.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/erp-for-plastic-injection-molding" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
                Explore plastic manufacturing ERP
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-white dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/[0.04]">
                Discuss your project
              </Link>
            </div>
          </div>
        )}
      </div>

      <FaqSection
        className="bg-gray-50 dark:bg-dark-900"
        title="Portfolio FAQs"
        subtitle="Common questions about our case studies and how we present client work."
        items={portfolioListingFaqs}
      />
    </div>
  );
}
