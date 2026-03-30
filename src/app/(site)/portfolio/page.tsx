import { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers, LayoutGrid } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import { portfolioListingFaqs, toFaqPageSchema } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Our Portfolio",
  description: "Explore our latest case studies, web applications, and custom software projects.",
};

type PortfolioCard = {
  slug?: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  link?: string;
  _id?: string;
};

const DUMMY_PROJECTS: PortfolioCard[] = [
  {
      title: "AI-Powered ERP Solution",
      slug: "ai-erp",
      category: "Business Software",
      description: "Custom enterprise resource planning system with AI-driven inventory forecasting and real-time analytics.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      link: "https://ma-softs.com"
  },
  {
      title: "Fintech SaaS Dashboard",
      slug: "fintech-saas",
      category: "Web Application",
      description: "High-performance financial monitoring dashboard for a European startup, built with Next.js and Chart.js.",
      image: "https://images.unsplash.com/photo-1551288049-bbda646261c6?w=800&q=80",
      link: "https://ma-softs.com"
  }
];

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  await dbConnect();
  
  // Fetch active projects and sort them
  const rawProjects = await ProjectModel.find({ active: true }).sort({ order: 1 }).lean();
  const raw = rawProjects.length > 0 ? rawProjects : DUMMY_PROJECTS;
  const projects = JSON.parse(JSON.stringify(raw)) as PortfolioCard[];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-dark-950 font-sans">
      <JsonLd data={toFaqPageSchema(portfolioListingFaqs)} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Work</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-neutral-400 leading-relaxed font-medium">
                Explore our recent digital products, custom web applications, and UI/UX design transformations built for scale.
            </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.slug || project._id || String(index)} 
              className="group relative bg-white dark:bg-dark-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/[0.05] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-10"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
            >
                {/* Image Showcase */}
                <div className="h-64 relative bg-gray-50 dark:bg-white/[0.02] overflow-hidden">
                    {project.image ? (
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Layers className="w-16 h-16 text-primary-500/20" />
                        </div>
                    )}
                    
                    {/* Overlay Category Tag */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full border border-white/20 dark:border-white/[0.05]">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                           <LayoutGrid className="w-3.5 h-3.5 text-primary-500" />
                           {project.category ?? "Portfolio"}
                        </span>
                    </div>
                </div>

                {/* Content Details */}
                <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-500 dark:text-neutral-400 line-clamp-3 mb-8 text-[15px] leading-relaxed">
                        {project.description}
                    </p>
                    
                    <Link 
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] text-sm font-bold text-gray-900 dark:text-white group-hover:bg-primary-500 group-hover:text-white transition-all duration-300"
                    >
                        View Case Study
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </Link>
                </div>
            </div>
          ))}
        </div>
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
