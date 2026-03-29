// src/app/admin/services/page.tsx
import { Plus, FileEdit, Trash2, Server, Layers } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import { cn } from "@/lib/utils";

export default async function AdminServicesPage() {
  await dbConnect();
  const rawServices = await ServiceModel.find({}).sort({ order: 1 }).lean();
  const services = rawServices.map((s: any) => ({ ...s, _id: undefined, id: s._id?.toString() }));

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            Our Services <span className="text-primary-500">({services.length})</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium font-heading">
            Manage your core business offerings and pricing plans.
          </p>
        </div>
        
        <Link 
          href="/admin/services/new" 
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add New Service
        </Link>
      </div>

      <div className="rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm overflow-hidden group">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.05]">
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Service Info</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest hidden md:table-cell">Pricing</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest hidden lg:table-cell">Display Order</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
                        <Server className="w-10 h-10 text-gray-300 dark:text-neutral-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">No services found</p>
                        <p className="text-gray-500 dark:text-neutral-500 font-medium">Add your first service to show what you offer.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : services.map((service: any) => (
                <tr key={service.id} className="group/row hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors duration-300">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center shadow-sm group-hover/row:scale-110 group-hover/row:rotate-3 transition-all duration-500">
                            <Layers className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="space-y-0.5">
                            <h4 className="font-bold text-gray-900 dark:text-white group-hover/row:text-primary-600 transition-colors">{service.title}</h4>
                            <p className="text-[12px] text-gray-500 dark:text-neutral-500 font-medium truncate max-w-[200px]">{service.slug}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell">
                    <span className="inline-flex items-center px-3 py-1 rounded-xl bg-gray-100 dark:bg-white/[0.05] text-[12px] font-bold text-gray-600 dark:text-neutral-400 border border-gray-100 dark:border-white/[0.05]">
                        {service.price || "Contact for Quote"}
                    </span>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">{service.order}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest",
                        service.active ? "bg-green-50/50 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-50/50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                    )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", service.active ? "bg-green-500" : "bg-red-500")} />
                        {service.active ? "Live" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Link 
                            href={`/admin/services/${service.id}`}
                            className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                        >
                            <FileEdit className="w-4.5 h-4.5" />
                        </Link>
                        <button className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                            <Trash2 className="w-4.5 h-4.5" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
