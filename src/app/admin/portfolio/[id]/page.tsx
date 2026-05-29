// src/app/admin/portfolio/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, LayoutGrid, ImageIcon, ArrowLeft, Globe, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import RichTextEditor from "../../blog/_components/RichTextEditor";

export const dynamic = "force-dynamic";

export default function EditProjectPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
      title: "",
      slug: "",
      description: "",
      content: "",
      image: "",
      link: "",
      category: "Web App",
      published: true,
      order: 0,
    });
  
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/admin/portfolio/${params.id}`);
                const data = await res.json();
                if (res.ok) setFormData(data);
                else toast.error("Asset not found");
            } catch (err) {
                toast.error("Cloud connection failed");
            } finally {
                setFetching(false);
            }
        };
        fetchProject();
    }, [params.id]);

    const handleChange = (e: any) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/portfolio/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          toast.success("Synchronized project data!");
          setTimeout(() => router.push("/admin/portfolio"), 1500);
        }
      } catch (error) {
        toast.error("Process aborted. Check your sync connection.");
      } finally {
        setLoading(false);
      }
    };
  
    if (fetching) return (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="w-16 h-16 rounded-3xl bg-primary-500/10 border-2 border-primary-500/20 border-t-primary-500 animate-spin" />
            <p className="font-black uppercase tracking-widest text-primary-500/40 text-[10px]">Loading Asset Data</p>
        </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Toaster />
      
      <div className="flex items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-white/[0.05]">
        <div className="flex items-center gap-6">
            <Link href="/admin/portfolio" className="p-3 rounded-2xl bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] text-gray-500 hover:text-primary-500 shadow-sm transition-all group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Edit Portfolio Asset</h2>
                <p className="text-[12px] font-black uppercase tracking-widest text-primary-500/60 leading-none mt-1">Refining Presence</p>
            </div>
        </div>

        <button 
            type="submit" form="project-form" 
            disabled={loading}
            className="inline-flex items-center gap-3 px-10 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
            {loading ? "Exporting Changes..." : "Synchronize Project"}
            {!loading && <Save className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>

      <form id="project-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary-500/10 transition-colors" />
                
                <div className="space-y-4 relative z-10">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-primary-500" /> Asset Name</label>
                    <input name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Enterprise ERP Platform" className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-xl font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 appearance-none outline-none transition-all" />
                </div>

                <div className="space-y-4 relative z-10">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Story Narration / Impact Report</label>
                    <RichTextEditor 
                        value={formData.content}
                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                        placeholder="Deep dive into the problem, solution, and technical stack used..."
                    />
                </div>
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-2"><ExternalLink className="w-4 h-4 text-blue-500" /> External Deployment Link</label>
                        <input name="link" value={formData.link} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20" placeholder="https://..." />
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-6">
                <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Primary Display Snapshot</label>
                <div className="group/img relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 dark:border-white/[0.05] flex items-center justify-center bg-gray-50 dark:bg-white/[0.01] hover:border-primary-500/40 transition-all">
                    {formData.image ? (
                        <>
                            <Image src={formData.image} alt="Preview" fill className="object-cover" />
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: "" }))} className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-sm">Swap Snapshot</button>
                        </>
                    ) : (
                        <CldUploadWidget 
                            uploadPreset="ma_softs_preset"
                            onSuccess={(result: any) => setFormData(prev => ({ ...prev, image: result?.info?.secure_url }))}
                        >
                            {({ open }) => (
                                <button type="button" onClick={() => open()} className="flex flex-col items-center gap-3 text-gray-400 hover:text-primary-500 transition-colors">
                                    <ImageIcon className="w-10 h-10" />
                                    <span className="text-xs font-black uppercase tracking-widest">Connect Media Asset</span>
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                </div>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-8">
                <div className="space-y-4">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-2"><Globe className="w-4 h-4 text-primary-500" /> Identifier Slug</label>
                    <input name="slug" required value={formData.slug} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/[0.05] text-sm text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500/20" />
                </div>

                <div className="space-y-4">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-2"><Tag className="w-4 h-4 text-primary-500" /> Sector Analysis</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/[0.05] text-sm text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500/20 outline-none">
                        {["Web App", "ERP System", "Technical Strategy", "Mobile App", "Branding"].map(opt => (
                            <option key={opt} value={opt} className="bg-white dark:bg-dark-900 font-bold">{opt}</option>
                        ))}
                    </select>
                </div>
                
                <div className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05]">
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Active Display</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Visible to world</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-white/[0.1] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
}
