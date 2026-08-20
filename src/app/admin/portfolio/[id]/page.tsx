// src/app/admin/portfolio/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, LayoutGrid, ImageIcon, ArrowLeft, Globe, Tag, ExternalLink, X, Plus } from "lucide-react";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
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
      images: [] as string[],
      link: "",
      category: "Web App",
      active: true,
      order: 0,
    });
  
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/admin/portfolio/${params.id}`);
                const data = await res.json();
                if (res.ok) {
                    const images: string[] = Array.isArray(data.images) && data.images.length
                      ? data.images
                      : data.image ? [data.image] : [];
                    setFormData({
                      title: data.title || "",
                      slug: data.slug || "",
                      description: data.description || "",
                      content: data.content || "",
                      image: data.image || images[0] || "",
                      images,
                      link: data.link || "",
                      category: data.category || "Web App",
                      active: data.active !== false,
                      order: data.order || 0,
                    });
                } else toast.error("Asset not found");
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

    const addImage = (url: string) => {
      if (!url) return;
      setFormData((prev) => {
        const images = prev.images.includes(url) ? prev.images : [...prev.images, url];
        return { ...prev, images, image: prev.image || url };
      });
    };

    const removeImage = (url: string) => {
      setFormData((prev) => {
        const images = prev.images.filter((img) => img !== url);
        const image = prev.image === url ? images[0] || "" : prev.image;
        return { ...prev, images, image };
      });
    };

    const setCoverImage = (url: string) => {
      setFormData((prev) => ({ ...prev, image: url }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const payload = {
          ...formData,
          image: formData.image || formData.images[0] || "",
          images: formData.images.length ? formData.images : formData.image ? [formData.image] : [],
        };
        const res = await fetch(`/api/admin/portfolio/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          toast.success("Synchronized project data!");
          setTimeout(() => router.push("/admin/portfolio"), 1500);
                } else {
                    const data = await res.json().catch(() => null);
                    toast.error(data?.error || "Could not save project");
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

                <div className="space-y-4 relative z-10">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Short Description</label>
                    <textarea name="description" required value={formData.description} onChange={handleChange} rows={4} placeholder="A concise summary for the portfolio showcase" className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20 outline-none resize-y" />
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
                <div className="flex items-center justify-between gap-3">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Project Images</label>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-500/70">{formData.images.length} added</span>
                </div>

                {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                        {formData.images.map((url) => (
                            <div key={url} className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 group/img ${formData.image === url ? "border-primary-500" : "border-gray-100 dark:border-white/[0.05]"}`}>
                                <Image src={url} alt="Project" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                    {formData.image !== url && (
                                        <button type="button" onClick={() => setCoverImage(url)} className="text-[10px] font-black uppercase tracking-widest text-white bg-primary-600 px-3 py-1.5 rounded-lg">Set Cover</button>
                                    )}
                                    {formData.image === url && (
                                        <span className="text-[10px] font-black uppercase tracking-widest text-accent-400">Cover</span>
                                    )}
                                    <button type="button" onClick={() => removeImage(url)} className="p-2 rounded-lg bg-red-500/90 text-white" aria-label="Remove image">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <CldUploadWidget
                    uploadPreset="ma_softs_preset"
                    options={{ multiple: true, maxFiles: 12 }}
                    onSuccess={(result: any) => addImage(result?.info?.secure_url)}
                >
                    {({ open }) => (
                        <button
                            type="button"
                            onClick={() => open()}
                            className="w-full flex flex-col items-center gap-3 py-8 rounded-2xl border-2 border-dashed border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.01] text-gray-400 hover:text-primary-500 hover:border-primary-500/40 transition-all"
                        >
                            <div className="flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                <ImageIcon className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">Add Images</span>
                        </button>
                    )}
                </CldUploadWidget>
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
                        <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-white/[0.1] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
}
