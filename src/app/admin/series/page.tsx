"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, LayoutGrid, Save, X, ImageIcon, Search } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

export default function SeriesManagementPage() {
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    order: 0,
    active: true,
  });

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const res = await fetch("/api/admin/series");
      const data = await res.json();
      setSeries(data);
    } catch (err) {
      toast.error("Failed to fetch series");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    if (name === "title" && !editingSeries) {
        setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/series", {
        method: editingSeries ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSeries ? { ...formData, id: editingSeries.id } : formData),
      });
      if (res.ok) {
        toast.success(editingSeries ? "Series updated" : "Series created");
        setIsModalOpen(false);
        setEditingSeries(null);
        setFormData({ title: "", slug: "", description: "", image: "", order: 0, active: true });
        fetchSeries();
      }
    } catch (err) {
      toast.error("Failed to save series");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s: any) => {
    setEditingSeries(s);
    setFormData({
      title: s.title,
      slug: s.slug || "",
      description: s.description || "",
      image: s.image || "",
      order: s.order || 0,
      active: s.active !== undefined ? s.active : true,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Toaster />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Article Series</h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">Group your blog posts into powerful learning series.</p>
        </div>
        <button 
          onClick={() => { setEditingSeries(null); setFormData({ title: "", slug: "", description: "", image: "", order: 0, active: true }); setIsModalOpen(true); }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create New Series
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.map((s) => (
          <div key={s.id} className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-4 group">
            <div className="h-40 relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/[0.05]">
              {s.image ? (
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <LayoutGrid className="w-10 h-10" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{s.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{s.description}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.05]">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${s.active ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}`}>
                {s.active ? "Active" : "Inactive"}
              </span>
              <button 
                onClick={() => handleEdit(s)}
                className="p-2 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 hover:bg-primary-600 hover:text-white transition-all"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white dark:bg-dark-900 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200">
            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{editingSeries ? "Edit Series" : "New Series"}</h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest">Title</label>
                    <input name="title" required value={formData.title} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold" />
                </div>
                <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest">Slug</label>
                    <input name="slug" required value={formData.slug} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest">Description</label>
                  <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium" />
              </div>

              <div className="space-y-4">
                  <label className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest">Cover Image</label>
                  <div className="group/img relative w-full h-40 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-white/5 flex items-center justify-center bg-gray-50 dark:bg-white/[0.01]">
                    {formData.image ? (
                        <>
                            <Image src={formData.image} alt="Preview" fill className="object-cover" />
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: "" }))} className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-sm">Clear Image</button>
                        </>
                    ) : (
                        <CldUploadWidget 
                            uploadPreset="ma_softs_preset"
                            onSuccess={(result: any) => setFormData(prev => ({ ...prev, image: result?.info?.secure_url }))}
                        >
                            {({ open }) => (
                                <button type="button" onClick={() => open()} className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors">
                                    <ImageIcon className="w-8 h-8" />
                                    <span className="text-xs font-bold uppercase">Upload Cover</span>
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                  </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-3">
                <Save className="w-5 h-5" />
                {loading ? "Saving..." : "Save Series"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
