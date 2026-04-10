"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  Plus, Trash2, Search, Tag, Loader2, Pencil, X, Check, Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

const PRESET_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#ef4444",
  "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#64748b",
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export default function CategoriesManager() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#6366f1",
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", slug: "", description: "", color: "#6366f1" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (cat: CategoryItem) => {
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      color: cat.color,
    });
    setEditingId(cat._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const url = editingId
        ? `/api/admin/categories/${editingId}`
        : "/api/admin/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Category updated!" : "Category created!");
        resetForm();
        fetchCategories();
      } else {
        const data = await res.json();
        toast.error(data.message || "Something went wrong.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Blog posts using it won't be affected.")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Category deleted.");
        fetchCategories();
      } else {
        toast.error("Failed to delete category.");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const filtered = categories.filter(
    (c) =>
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            Categories <span className="text-primary-500">({categories.length})</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">
            Organize your blog posts into meaningful topics.
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add Category
        </button>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-6 animate-in slide-in-from-top-5 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
              {editingId ? "Edit Category" : "New Category"}
            </h3>
            <button onClick={resetForm} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest pl-1">Category Name</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: slugify(e.target.value) })}
                placeholder="e.g. Web Development"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500/20 transition-all outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest pl-1">Slug</label>
              <input
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="web-development"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500/20 transition-all outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest pl-1">Description (Optional)</label>
              <input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A short description for this category..."
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20 transition-all outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-[11px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest pl-1 flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" /> Label Color
              </label>
              <div className="flex flex-wrap gap-3">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: c })}
                    className={cn(
                      "w-10 h-10 rounded-xl transition-all border-2",
                      formData.color === c
                        ? "scale-110 border-gray-900 dark:border-white shadow-lg"
                        : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={actionLoading}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editingId ? "Update Category" : "Create Category"}
              </button>
              <button type="button" onClick={resetForm} className="px-5 py-3 rounded-2xl bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-neutral-400 text-sm font-bold hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="p-4 md:p-5 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.03] text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30 placeholder:text-gray-400 dark:placeholder:text-neutral-500 transition-all"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="p-16 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-16 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center">
              <Tag className="w-10 h-10 text-gray-300 dark:text-neutral-600" />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">No categories yet</p>
              <p className="text-gray-500 dark:text-neutral-500 font-medium max-w-xs mx-auto">
                Create your first category to start organizing your blog content.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((cat) => (
            <div
              key={cat._id}
              className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              {/* Color strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ backgroundColor: cat.color }} />

              <div className="space-y-4 pt-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: cat.color + "20", color: cat.color }}
                    >
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white leading-tight">{cat.name}</h4>
                      <p className="text-[11px] text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-widest">/{cat.slug}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white transition-all"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {cat.description && (
                  <p className="text-sm text-gray-500 dark:text-neutral-400 font-medium leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
