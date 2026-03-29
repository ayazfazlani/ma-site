// src/app/admin/blog/_components/BlogForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { ImageIcon, X, Save, Send, Eye, LayoutIcon, FileText, Search, Settings } from "lucide-react";
import Image from "next/image";
import { cn, slugify } from "@/lib/utils";

interface BlogFormProps {
  initialData?: any;
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "SEO",
    author: initialData?.author || "Ahmed Khan",
    image: initialData?.image || "",
    published: initialData?.published || false,
    metaTitle: initialData?.metaTitle || "",
    metaDesc: initialData?.metaDesc || "",
  });

  const [activeTab, setActiveTab] = useState("content");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "title" && !initialData) {
        newData.slug = slugify(value);
      }
      return newData;
    });
  };

  const handleToggle = () => {
      setFormData(prev => ({ ...prev, published: !prev.published }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify({ ...formData, id: initialData?.id }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        router.refresh();
        router.push("/admin/blog");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      {/* Top sticky action bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-[80px] z-20 bg-gray-50/80 dark:bg-dark-950/80 backdrop-blur-md py-4 transition-all duration-300">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {initialData ? "Edit Post" : "Compose New Post"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-neutral-400 font-medium">
            Drafting: <span className="text-primary-600 dark:text-primary-400 font-bold">{formData.title || "Untitled Article"}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="px-5 py-2.5 rounded-2xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] text-sm font-bold text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-all"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            {loading ? "Saving..." : formData.published ? "Update Live" : "Save Draft"}
            {!loading && <Save className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
            {/* Tabs Design */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                {[
                    { id: "content", label: "Read & Write", icon: FileText },
                    { id: "seo", label: "SEO Settings", icon: Search },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2.5 px-6 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300",
                            activeTab === tab.id 
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20" 
                                : "bg-white dark:bg-dark-900 text-gray-500 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-white/[0.03] hover:text-gray-900 dark:hover:text-white border border-gray-100 dark:border-white/[0.05]"
                        )}
                    >
                        <tab.icon className="w-4.5 h-4.5 font-bold" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-8">
                {activeTab === "content" ? (
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Article Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter a catchy title..."
                                className="w-full bg-transparent text-3xl font-extrabold text-gray-900 dark:text-white placeholder:text-gray-200 dark:placeholder:text-neutral-700 border-none px-0 focus:ring-0 leading-tight"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1 flex items-center justify-between">
                                Content Editor (Markdown Support)
                                <div className="flex items-center gap-2 opacity-50 font-medium">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Real-time Preview</span>
                                </div>
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Tell your story here..."
                                className="w-full min-h-[500px] bg-gray-50/50 dark:bg-white/[0.015] rounded-3xl p-6 md:p-8 text-black dark:text-neutral-200 text-lg border border-gray-100 dark:border-white/[0.05] focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30 transition-all leading-relaxed placeholder:text-gray-300 dark:placeholder:text-neutral-800"
                                required
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                        <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                                <ImageIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-blue-900 dark:text-blue-300 leading-tight mb-1">Search Engine Optimization</h4>
                                <p className="text-sm text-blue-700/70 dark:text-blue-400/60 font-medium leading-relaxed">
                                    Improve your reach by filling out these fields. They appear in Google results and social sharing cards.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-1 gap-8">
                            <div className="space-y-3">
                                <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Meta Title Tag</label>
                                <input
                                    name="metaTitle"
                                    value={formData.metaTitle}
                                    onChange={handleChange}
                                    placeholder="Keep it under 60 characters..."
                                    className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500/20 transition-all"
                                />
                                <div className="flex justify-between px-1">
                                    <span className="text-[11px] text-gray-400 font-medium">Recommended: 50-60 chars</span>
                                    <span className={cn("text-[11px] font-bold", formData.metaTitle.length > 60 ? "text-red-500" : "text-primary-500")}>{formData.metaTitle.length} characters</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Meta Description</label>
                                <textarea
                                    name="metaDesc"
                                    value={formData.metaDesc}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Write a compelling summary for search results..."
                                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20 transition-all leading-relaxed"
                                />
                                <div className="flex justify-between px-1">
                                    <span className="text-[11px] text-gray-400 font-medium">Recommended: 150-160 chars</span>
                                    <span className={cn("text-[11px] font-bold", formData.metaDesc.length > 160 ? "text-red-500" : "text-primary-500")}>{formData.metaDesc.length} characters</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                
                {/* Status Toggle */}
                <div className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] relative z-10 transition-colors group/status">
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest mb-0.5">Visibility</p>
                        <p className={cn("text-lg font-bold leading-tight", formData.published ? "text-green-600 dark:text-green-400" : "text-amber-500")}>
                            {formData.published ? "Publicly Live" : "Private Draft"}
                        </p>
                    </div>
                    <button 
                        type="button"
                        onClick={handleToggle}
                        className={cn(
                            "w-14 h-8 rounded-full p-1 transition-all duration-300 relative overflow-hidden group-active/status:scale-90",
                            formData.published ? "bg-green-500" : "bg-gray-200 dark:bg-white/[0.1]"
                        )}
                    >
                        <div className={cn(
                            "w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ease-spring",
                            formData.published ? "translate-x-6" : "translate-x-0"
                        )} />
                    </button>
                </div>

                {/* Cover Image Upload (Cloudinary) */}
                <div className="space-y-4 relative z-10">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Featured Cover</label>
                    
                    {formData.image ? (
                        <div className="group/img relative w-full h-56 rounded-3xl overflow-hidden border-2 border-primary-500/20 shadow-2xl transition-all hover:border-primary-500">
                            <Image src={formData.image} alt="Cover" fill className="object-cover transition-transform duration-700 group-hover/img:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    type="button"
                                    className="p-3 rounded-2xl bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all font-bold"
                                    onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <CldUploadWidget 
                            uploadPreset="ma_softs_preset" // Need to have the user configure this or I'll provide a neutral one
                            onSuccess={(result: any) => {
                                setFormData(prev => ({ ...prev, image: result?.info?.secure_url }));
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="w-full h-56 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.01] hover:bg-gray-100 dark:hover:bg-white/[0.03] hover:border-primary-500/40 transition-all flex flex-col items-center justify-center gap-4 group/upload"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/[0.05] border border-gray-100 dark:border-white/[0.05] flex items-center justify-center shadow-sm group-hover/upload:scale-110 group-hover/upload:-rotate-3 transition-transform">
                                        <ImageIcon className="w-8 h-8 text-primary-500" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-gray-900 dark:text-white">Click to Upload</p>
                                        <p className="text-xs text-gray-400 font-medium">SVG, PNG, JPG or WEBP (Max 10MB)</p>
                                    </div>
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                </div>

                {/* Categorization */}
                <div className="space-y-6 relative z-10 pt-2 border-t border-gray-100 dark:border-white/[0.05]">
                    <div className="space-y-3">
                        <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Primary Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
                        >
                            <option value="SEO">Digital SEO</option>
                            <option value="Web Design">Next.js Development</option>
                            <option value="Social Media">Cloud Solutions</option>
                            <option value="Content">AI & Automation</option>
                            <option value="PPC">Business Growth</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Custom Slug</label>
                        <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] group-focus-within:ring-2 ring-primary-500/20">
                            <span className="text-gray-400 text-sm font-medium">/blog/</span>
                            <input
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="flex-1 bg-transparent border-none p-0 text-sm font-bold text-gray-900 dark:text-white focus:ring-0 placeholder:text-gray-300"
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium italic pl-1">URL where this post will stay forever.</p>
                    </div>
                </div>
            </div>
            
            {/* Quick Tips Card */}
            <div className="p-6 rounded-3xl bg-linear-to-br from-primary-600 to-primary-700 text-white shadow-xl shadow-primary-600/20 relative overflow-hidden group">
                <Send className="absolute -bottom-4 -right-4 w-32 h-32 opacity-15 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                <h4 className="font-bold text-lg mb-2 relative z-10 uppercase tracking-tight">Writing Tips</h4>
                <p className="text-sm text-white/80 leading-relaxed font-medium relative z-10">
                    Use <span className="text-white font-bold">H2 and H3 tags</span> for better structure. Keep paragraphs short (3-4 lines) for better readability on mobile devices.
                </p>
            </div>
        </div>
      </div>
    </form>
  );
}
