import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import ProjectModel from '@/models/Project';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Monitor, LayoutGrid, Calendar, ExternalLink, Target, Zap, CheckCircle2 } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import { portfolioDetailFaqs, toFaqPageSchema } from '@/lib/faq-data';

/** Fields used on this page; DB documents may include more than the Mongoose schema declares. */
type PortfolioDetail = {
  title: string;
  description?: string;
  category?: string;
  image?: string;
  link?: string;
  challenges?: string;
  solution?: string;
  results?: string;
  longDescription?: string;
  technologies?: string;
  active?: boolean;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const project = (await ProjectModel.findOne({ slug }).lean()) as PortfolioDetail | null;

  if (!project) return { title: 'Not Found' };

  return {
    title: `${project.title} – Case Study`,
    description: project.description ?? `See how we built ${project.title}. View the full case study on MA Softs portfolio.`,
    alternates: {
      canonical: `https://masofts.com/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} – MA Softs Portfolio`,
      description: project.description ?? undefined,
      url: `https://masofts.com/portfolio/${slug}`,
      type: "article",
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function SinglePortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();

  const project = (await ProjectModel.findOne({ slug, active: true }).lean()) as PortfolioDetail | null;

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white dark:bg-dark-950 font-sans">
      <JsonLd data={toFaqPageSchema(portfolioDetailFaqs)} />
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-gradient-to-b from-primary-50/50 dark:from-primary-950/20 to-transparent overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
          {/* Navigation */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-primary-500/10">
                <LayoutGrid className="w-3.5 h-3.5" />
                {project.category || "Case Study"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 font-medium leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* CTA Button */}
          {project.link && (
            <div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold tracking-wide shadow-lg shadow-primary-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                Visit Live Project
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">

        {/* Featured Image with Lightbox */}
        {project.image && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Project Overview</h2>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10 border border-gray-100 dark:border-white/[0.05] group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-800 dark:to-dark-900 p-4 group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        )}

        {/* Key Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-50/50 dark:from-primary-950/40 dark:to-primary-950/20 border border-primary-200 dark:border-primary-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary-600 text-white">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Challenge</h3>
            </div>
            <p className="text-gray-600 dark:text-neutral-400 font-medium">
              {project.challenges || "Building scalable, efficient solutions for modern business needs."}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/40 dark:to-blue-950/20 border border-blue-200 dark:border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-600 text-white">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Solution</h3>
            </div>
            <p className="text-gray-600 dark:text-neutral-400 font-medium">
              {project.solution || "Custom-built solutions with modern tech stack and best practices."}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-50/50 dark:from-emerald-950/40 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-emerald-600 text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Results</h3>
            </div>
            <p className="text-gray-600 dark:text-neutral-400 font-medium">
              {project.results || "Increased efficiency and improved business outcomes."}
            </p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About This Project</h2>
            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-p:font-medium prose-p:leading-relaxed prose-a:text-primary-600 dark:prose-a:text-primary-400 max-w-none">
              {project.longDescription ? (
                <div dangerouslySetInnerHTML={{ __html: project.longDescription }} />
              ) : (
                <p className="text-gray-600 dark:text-neutral-400">
                  This project showcases our expertise in delivering high-quality solutions. We focused on creating a seamless user experience while ensuring robust backend infrastructure and scalability for future growth.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar - Tech Stack & Info */}
          <div>
            <div className="sticky top-32 space-y-6">
              {/* Technologies */}
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08]">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary-600" />
                  Tech Stack
                </h3>
                <div className="space-y-2">
                  {project.technologies ? (
                    project.technologies.split(',').map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1.5 rounded-lg bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 text-sm font-semibold mr-2 mb-2"
                      >
                        {tech.trim()}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-neutral-400">Custom Technology Stack</p>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08]">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  Project Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-neutral-500 text-xs uppercase font-bold mb-1">Category</p>
                    <p className="text-gray-900 dark:text-white font-semibold">{project.category || "Custom Development"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-neutral-500 text-xs uppercase font-bold mb-1">Status</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Your Project?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s work together to bring your vision to life with the same quality and attention to detail.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
          >
            Start Your Project
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <FaqSection
        className="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-white/[0.06]"
        title="Questions about this type of work?"
        subtitle="How we share case studies, links, and next steps when you want something similar."
        items={portfolioDetailFaqs}
      />
    </article>
  );
}
