"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

type ServiceFormData = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  price: string;
  icon: string;
  features: string;
  order: number;
  active: boolean;
};

const emptyService: ServiceFormData = { title: "", slug: "", description: "", longDescription: "", metaTitle: "", metaDescription: "", price: "", icon: "Layers", features: "", order: 0, active: true };

export default function ServiceForm({ id, initialData }: { id?: string; initialData?: Partial<ServiceFormData> }) {
  const router = useRouter();
  const [formData, setFormData] = useState<ServiceFormData>({ ...emptyService, ...initialData });
  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value }));
    if (name === "title" && !formData.slug) setFormData((current) => ({ ...current, slug: value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "") }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, features: formData.features.split("\n").map((feature) => feature.trim()).filter(Boolean) };
      const response = await fetch(id ? `/api/admin/services/${id}` : "/api/admin/services", { method: id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Could not save service");
      toast.success(id ? "Service updated" : "Service created");
      setTimeout(() => router.push("/admin/services"), 700);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save service");
    } finally {
      setLoading(false);
    }
  }

  return <div className="max-w-5xl mx-auto space-y-8"><Toaster /><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-4"><Link href="/admin/services" className="p-3 rounded-xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08]"><ArrowLeft className="w-5 h-5" /></Link><div><h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{id ? "Edit Service" : "New Service"}</h2><p className="text-sm text-gray-500">Content and search settings</p></div></div><button type="submit" form="service-form" disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold disabled:opacity-50"><Save className="w-4 h-4" />{loading ? "Saving..." : "Save Service"}</button></div><form id="service-form" onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2"><section className="space-y-5 p-6 rounded-2xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08]"><h3 className="font-bold text-lg">Service Content</h3><input required name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="field" /><input required name="slug" value={formData.slug} onChange={handleChange} placeholder="URL slug" className="field" /><textarea required name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Short description" className="field" /><textarea name="longDescription" value={formData.longDescription} onChange={handleChange} rows={6} placeholder="Detailed description" className="field" /><textarea name="features" value={formData.features} onChange={handleChange} rows={7} placeholder="One feature per line" className="field" /></section><section className="space-y-5 p-6 rounded-2xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08]"><h3 className="font-bold text-lg">SEO and Display</h3><input name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="SEO title" className="field" /><textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={4} placeholder="SEO description" className="field" /><input name="price" value={formData.price} onChange={handleChange} placeholder="Price label" className="field" /><input name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon name" className="field" /><input type="number" name="order" value={formData.order} onChange={handleChange} placeholder="Display order" className="field" /><label className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03]"><span className="font-bold">Visible to public</span><input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="h-5 w-5" /></label></section></form></div>;
}