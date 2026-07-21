"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Plus, Trash2, Globe, Loader2, Pencil, X, Check, Image as ImageIcon, Eye, EyeOff, Layout } from "lucide-react";
import { cn } from "@/lib/utils";
import { CldUploadWidget } from "next-cloudinary";

interface PartnerItem {
  _id: string;
  name: string;
  logo: string;
  active: boolean;
  showInHero: boolean;
  order: number;
}

export default function PartnersManager() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    active: true,
    showInHero: false,
    order: 0,
  });

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/admin/partners");
      if (res.ok) setPartners(await res.json());
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", logo: "", active: true, showInHero: false, order: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p: PartnerItem) => {
    setFormData({
      name: p.name,
      logo: p.logo || "",
      active: p.active,
      showInHero: p.showInHero || false,
      order: p.order || 0,
    });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const url = editingId ? `/api/admin/partners/${editingId}` : "/api/admin/partners";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(editingId ? "Brand updated!" : "Brand added!");
        resetForm();
        fetchPartners();
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this brand?")) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Brand deleted.");
        fetchPartners();
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const toggleField = async (id: string, field: "active" | "showInHero", value: boolean) => {
    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !value }),
      });
      if (res.ok) {
        fetchPartners();
        toast.success("Updated!");
      }
    } catch {
      toast.error("Update failed.");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Brand <span className="text-primary-500">Partners</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-500 font-medium font-heading">Manage brand logos for the marquee and toggle which images appear in the Hero avatar stack.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Add Brand
        </button>
      </div>

      {showForm && (
        <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-6 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{editingId ? "Edit Brand" : "New Brand"}</h3>
            <button onClick={resetForm} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.05]"><X className="w-5 h-5 text-gray-400" /></button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Brand Name</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Logo / Avatar Image</label>
              <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] overflow-hidden flex items-center justify-center p-2 shrink-0 shadow-sm">
                      {formData.logo ? (
                          <img src={formData.logo} className="max-w-full max-h-full object-contain filter dark:invert" />
                      ) : (
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                  </div>
                  <CldUploadWidget 
                      uploadPreset="ma_softs_preset" 
                      onSuccess={(result: any) => {
                          setFormData(prev => ({ ...prev, logo: result?.info?.secure_url }));
                      }}
                  >
                      {({ open }) => (
                          <button
                              type="button"
                              onClick={() => open()}
                              className="flex-1 px-5 py-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-all flex items-center justify-center gap-2"
                          >
                              <ImageIcon className="w-4 h-4 text-primary-500" />
                              {formData.logo ? "Change Image" : "Upload Image"}
                          </button>
                      )}
                  </CldUploadWidget>
              </div>
              <input
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="Or paste URL here..."
                className="w-full mt-2 px-5 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-500 dark:text-neutral-400 text-xs font-medium outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Sort Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold outline-none"
              />
            </div>
            <div className="flex items-center gap-8 pt-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="hidden"
                  />
                  <div className={cn("w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all", formData.active ? "bg-primary-500 border-primary-500" : "border-gray-200 dark:border-white/10")}>
                    {formData.active && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-sm font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-widest">Visible</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.showInHero}
                    onChange={(e) => setFormData({ ...formData, showInHero: e.target.checked })}
                    className="hidden"
                  />
                  <div className={cn("w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all", formData.showInHero ? "bg-accent-500 border-accent-500" : "border-gray-200 dark:border-white/10")}>
                    {formData.showInHero && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-sm font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-widest">Show in Hero Stack</span>
                </label>
            </div>
            
            <div className="md:col-span-2 flex items-center gap-3 pt-4">
              <button disabled={actionLoading} type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all disabled:opacity-50">
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editingId ? "Update Brand" : "Add Brand"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-3.5 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-500 font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="p-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary-500" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div key={p._id} className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] relative group hover:shadow-xl transition-all duration-500">
              <div className="flex items-start justify-between mb-6">
                <div className="w-20 h-14 rounded-xl bg-gray-50 dark:bg-white/[0.05] border border-gray-100 dark:border-white/[0.05] p-3 flex items-center justify-center">
                  {p.logo ? (
                      <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain filter dark:invert" />
                  ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(p)} className="p-2 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">{p.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Order: {p.order}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50 dark:border-white/[0.05]">
                <button 
                    onClick={() => toggleField(p._id, "active", p.active)}
                    className={cn(
                        "flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                        p.active ? "bg-green-500/10 border-green-500/20 text-green-600" : "bg-gray-100 border-gray-200 text-gray-400"
                    )}
                >
                    {p.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {p.active ? "Visible" : "Hidden"}
                </button>
                <button 
                    onClick={() => toggleField(p._id, "showInHero", p.showInHero)}
                    className={cn(
                        "flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                        p.showInHero ? "bg-accent-500/10 border-accent-500/20 text-accent-600" : "bg-gray-100 border-gray-200 text-gray-400"
                    )}
                >
                    <Layout className="w-3 h-3" />
                    Hero Stack
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
