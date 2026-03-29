// src/app/admin/partners/page.tsx
import { Plus, FileEdit, Trash2, Globe, ImageIcon } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import PartnerModel from "@/models/Partner";
import { cn } from "@/lib/utils";

export default async function AdminPartnersPage() {
  await dbConnect();
  const rawPartners = await PartnerModel.find({}).sort({ order: 1 }).lean();
  const partners = rawPartners.map((p: any) => ({ ...p, _id: undefined, id: p._id?.toString() }));

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            Brand Partners <span className="text-primary-500">({partners.length})</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium font-heading">
            Manage the logos displayed in your trust-building marquee.
          </p>
        </div>
        
        <Link 
          href="/admin/partners/new" 
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add Brand
        </Link>
      </div>

      <div className="rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm overflow-hidden group">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.05]">
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Brand Logo</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Global Order</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Visibility</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
                        <Globe className="w-10 h-10 text-gray-300 dark:text-neutral-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">Marquee is empty</p>
                        <p className="text-gray-500 dark:text-neutral-500 font-medium">Add logos of brands that trust your services.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : partners.map((partner: any) => (
                <tr key={partner.id} className="group/row hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl bg-gray-50 dark:bg-white/[0.05] border border-gray-100 dark:border-white/[0.05] flex items-center justify-center p-2 group-hover/row:scale-110 transition-transform duration-500">
                             {partner.logo ? (
                                 <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain filter grayscale group-hover/row:grayscale-0 transition-all duration-700" />
                             ) : (
                                 <ImageIcon className="w-6 h-6 text-gray-300" />
                             )}
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover/row:text-primary-600 transition-colors uppercase tracking-tight text-sm">{partner.name}</h4>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/[0.05] text-[12px] font-bold text-gray-600 dark:text-neutral-400">
                        {partner.order}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest",
                        partner.active ? "bg-green-50/50 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-50/50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                    )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", partner.active ? "bg-green-500" : "bg-red-500")} />
                        {partner.active ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Link 
                            href={`/admin/partners/${partner.id}`}
                            className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white transition-all shadow-sm group/btn"
                        >
                            <FileEdit className="w-4 h-4" />
                        </Link>
                        <button className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                            <Trash2 className="w-4 h-4" />
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
