import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import ProjectModel from '@/models/Project';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Monitor, LayoutGrid, Calendar, ExternalLink } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const project = await ProjectModel.findOne({ slug }).lean();

  if (!project) return { title: 'Not Found' };

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function SinglePortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();

  // Find the single project dynamically
  const project: any = await ProjectModel.findOne({ slug, active: true }).lean();

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-32 pb-20 bg-white dark:bg-dark-950 font-sans">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/portfolio" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        
        {/* Header Block */}
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-primary-500/10 hover:bg-primary-100 transition-colors">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    {project.category || "Case Study"}
                </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                {project.title}
            </h1>
            <p className="text-xl text-gray-500 dark:text-neutral-400 font-medium leading-relaxed max-w-3xl">
                {project.description}
            </p>
        </div>
        
        {/* Action Button */}
        {project.link && (
            <div className="mb-14">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold tracking-wide shadow-lg shadow-primary-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Visit Live Project
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        )}

        {/* Hero Image */}
        {project.image && (
          <div className="w-full h-80 md:h-[500px] relative rounded-[2.5rem] overflow-hidden mb-16 border border-gray-100 dark:border-white/[0.05] shadow-2xl shadow-primary-500/5 group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              priority
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-lg dark:prose-invert prose-headings:font-black prose-p:font-medium text-gray-600 dark:text-neutral-300 max-w-none prose-a:text-primary-600 prose-img:rounded-3xl">
            {project.longDescription ? (
               <div dangerouslySetInnerHTML={{ __html: project.longDescription }} /> 
            ) : (
                <p>Detailed project timeline and technical implementation case study arriving shortly.</p>
            )}
        </div>

      </div>
    </article>
  );
}
