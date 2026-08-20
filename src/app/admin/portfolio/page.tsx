// src/app/admin/portfolio/page.tsx
import { Plus, FileEdit, LayoutGrid, ImageIcon, ExternalLink, MoreVertical } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import Image from "next/image";
import PortfolioDeleteButton from "./PortfolioDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  await dbConnect();
  const rawProjects = await ProjectModel.find({}).sort({ order: 1 }).lean();
  const projects = rawProjects.map((p: any) => ({ ...p, _id: undefined, id: p._id?.toString() }));

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            Portfolio Showcase <span className="text-primary-500">({projects.length})</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">
            Feature your best work for prospective clients and partners.
          </p>
        </div>
        
        <Link 
          href="/admin/portfolio/new" 
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add To Portfolio
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
            <div className="col-span-full py-24 text-center bg-white dark:bg-dark-900 rounded-3xl border border-dashed border-gray-200 dark:border-white/[0.08]">
                <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
                    <LayoutGrid className="w-10 h-10 text-gray-300 dark:text-neutral-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Empty Gallery</h3>
                <p className="text-gray-500 dark:text-neutral-500 font-medium mb-8">Start showcasing your success stories here.</p>
                <Link href="/admin/portfolio/new" className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-600/20">
                    Upload First Project
                </Link>
            </div>
        ) : projects.map((project: any) => (
            <div key={project.id} className="group relative rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                <div className="h-56 relative overflow-hidden bg-gray-100 dark:bg-white/[0.02]">
                    {project.image ? (
                        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageIcon className="w-12 h-12" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                             <span className="text-[10px] text-white font-black uppercase tracking-widest">{project.active ? "Active Display" : "Private Draft"}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="min-w-0">
                            <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1 block leading-none">{project.category || "Development"}</span>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white truncate leading-tight">{project.title}</h4>
                        </div>
                        <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors">
                            <MoreVertical className="w-4.5 h-4.5 text-gray-400" />
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-neutral-500 font-medium line-clamp-2 mb-6 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/[0.05] flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Link 
                                href={`/admin/portfolio/${project.id}`}
                                className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white transition-all shadow-sm group/btn"
                            >
                                <FileEdit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            </Link>
                            <PortfolioDeleteButton id={project.id} />
                         </div>
                         
                         {project.link && (
                             <a href={project.link} target="_blank" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-primary-500 flex items-center gap-2 transition-colors">
                                 View Live <ExternalLink className="w-3.5 h-3.5" />
                             </a>
                         )}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
