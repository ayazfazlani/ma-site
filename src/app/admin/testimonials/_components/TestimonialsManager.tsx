"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Plus, Trash2, Quote, Star, User, Loader2, Pencil, X, Check, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CldUploadWidget } from "next-cloudinary";

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image: "",
  });

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) setTestimonials(await res.json());
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", role: "", content: "", rating: 5, image: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (t: TestimonialItem) => {
    setFormData({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      image: t.image || "",
    });
    setEditingId(t._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const url = editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(editingId ? "Feedback updated!" : "Feedback added!");
        resetForm();
        fetchTestimonials();
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Testimonial deleted.");
        fetchTestimonials();
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Client <span className="text-primary-500">Reviews</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-500 font-medium">Manage social proof and global trust signals.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Add Feedback
        </button>
      </div>

      {showForm && (
        <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-6 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{editingId ? "Edit Feedback" : "New Feedback"}</h3>
            <button onClick={resetForm} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.05]"><X className="w-5 h-5 text-gray-400" /></button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Client Name</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Role / Company</label>
              <input
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Testimonial Content</label>
              <textarea
                required
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Client Image / Avatar</label>
              <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                      {formData.image ? (
                          <img src={formData.image} className="w-full h-full object-cover" />
                      ) : (
                          <User className="w-6 h-6 text-gray-400" />
                      )}
                  </div>
                  <CldUploadWidget 
                      uploadPreset="ma_softs_preset" 
                      onSuccess={(result: any) => {
                          setFormData(prev => ({ ...prev, image: result?.info?.secure_url }));
                      }}
                  >
                      {({ open }) => (
                          <button
                              type="button"
                              onClick={() => open()}
                              className="flex-1 px-5 py-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-all flex items-center justify-center gap-2"
                          >
                              <ImageIcon className="w-4 h-4 text-primary-500" />
                              {formData.image ? "Change Avatar" : "Upload Avatar"}
                          </button>
                      )}
                  </CldUploadWidget>
              </div>
              <input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or paste URL here..."
                className="w-full mt-2 px-5 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-500 dark:text-neutral-400 text-xs font-medium outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Rating</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold outline-none"
              >
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <div className="md:col-span-2 flex items-center gap-3 pt-4">
              <button disabled={actionLoading} type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all disabled:opacity-50">
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editingId ? "Update Feedback" : "Save Feedback"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-3.5 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-500 font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="p-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary-500" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] relative group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-3.5 h-3.5", i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-white/5")} />)}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(t)} className="p-2 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t._id)} className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-neutral-400 italic mb-6 leading-relaxed">&quot;{t.content}&quot;</p>
              <div className="flex items-center gap-4 border-t border-gray-50 dark:border-white/5 pt-6">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 overflow-hidden">
                  {t.image ? <img src={t.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><User className="w-5 h-5 text-gray-400" /></div>}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[15px]">{t.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
