import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import ProjectModel from '@/models/Project';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Monitor, LayoutGrid, Calendar, ExternalLink, Target, Zap, CheckCircle2 } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import ImageLightbox from '@/components/ImageLightbox';
import { portfolioDetailFaqs, toFaqPageSchema } from '@/lib/faq-data';
import { applyPortfolioSeo } from '@/lib/seo';

/** Fields used on this page; DB documents may include more than the Mongoose schema declares. */
type PortfolioDetail = {
  title: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  category?: string;
  image?: string;
  images?: string[];
  link?: string;
  challenges?: string;
  solution?: string;
  results?: string;
  content?: string;
  technologies?: string;
  active?: boolean;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const project = (await ProjectModel.findOne({ slug }).lean()) as PortfolioDetail | null;

  if (!project) return { title: 'Not Found' };

  const seoProject = applyPortfolioSeo({ ...project, slug });
  const title = seoProject.metaTitle || seoProject.title;
  const description =
    seoProject.metaDescription || seoProject.description ||
    `Case study: how MA Softs delivered ${project.title} with custom software development.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://masofts.com/portfolio/${slug}`,
    },
    openGraph: {
      title: `${title} | MA Softs`,
      description,
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

  const seoProject = applyPortfolioSeo({ ...project, slug });
  const displayTitle = seoProject.title;
  const displayDescription = seoProject.description;

  const galleryImages = Array.from(
    new Set(
      [
        ...(Array.isArray(project.images) ? project.images : []),
        project.image,
      ].filter((url): url is string => Boolean(url))
    )
  );

  // Fetch related projects for SEO internal linking
  const relatedProjects = await ProjectModel.find({ 
    slug: { $ne: slug }, 
    active: true 
  }).sort({ createdAt: -1 }).limit(3).lean() as any[];

  return (
    <article className="min-h-screen bg-white dark:bg-dark-950 font-sans overflow-x-hidden">
      <JsonLd data={toFaqPageSchema(portfolioDetailFaqs)} />
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-gradient-to-b from-primary-50/50 dark:from-primary-950/20 to-transparent overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
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
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight break-words">
              {displayTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 font-medium leading-relaxed max-w-3xl">
              {displayDescription}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Featured Image / Gallery */}
        {galleryImages.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">Project Overview</h2>
            {galleryImages.length === 1 ? (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10 border border-gray-100 dark:border-white/[0.05] group">
                <Image
                  src={galleryImages[0]}
                  alt={displayTitle}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-contain bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-800 dark:to-dark-900 p-4 group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            ) : (
              <ImageLightbox images={galleryImages} />
            )}
          </div>
        )}

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-50/50 dark:from-primary-950/40 dark:to-primary-950/20 border border-primary-200 dark:border-primary-500/20 shadow-sm">
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

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/40 dark:to-blue-950/20 border border-blue-200 dark:border-blue-500/20 shadow-sm">
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

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-50/50 dark:from-emerald-950/40 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">About This Project</h2>
            <div className={[
              "ql-content prose prose-base sm:prose-lg dark:prose-invert max-w-none",
              "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white",
              "prose-p:text-gray-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:font-medium",
              "prose-strong:text-primary-600 dark:prose-strong:text-primary-400",
              "prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-bold",
              "prose-blockquote:border-primary-500 prose-blockquote:text-gray-500 dark:prose-blockquote:text-neutral-400",
              "prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-primary-50 dark:prose-code:bg-primary-500/10",
              "prose-img:rounded-2xl prose-img:shadow-lg",
              "prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-600 dark:prose-li:text-neutral-400",
            ].join(" ")}>
              {project.content ? (
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
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

        {/* Related Projects (Internal Links for SEO) */}
        {relatedProjects.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">More Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {relatedProjects.map((rp) => {
                const related = applyPortfolioSeo(rp);
                return (
                <Link key={rp._id.toString()} href={`/portfolio/${related.slug}`} className="group block">
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-gray-100 dark:border-white/[0.05] shadow-sm group-hover:shadow-xl transition-all duration-500 mb-5 bg-gray-50 dark:bg-dark-900">
                    {(related.image || related.images?.[0]) ? (
                      <Image 
                        src={related.image || related.images[0]} 
                        alt={related.title} 
                        fill 
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Monitor className="w-10 h-10 text-gray-300 dark:text-white/10" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors mb-2 leading-tight">
                    {related.title}
                  </h3>
                  {related.category && (
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                      {related.category}
                    </p>
                  )}
                </Link>
              );
              })}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-[2rem] sm:rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Interested in Your Project?</h2>
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
