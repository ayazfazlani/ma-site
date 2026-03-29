// src/app/admin/testimonials/page.tsx
import { Search, Plus, FileEdit, Trash2, Quote, Star, User, MoreHorizontal, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import { cn } from "@/lib/utils";

export default async function AdminTestimonialsPage() {
  await dbConnect();
  const raw = await TestimonialModel.find({}).sort({ createdAt: -1 }).lean();
  const testimonials = raw.map((t: any) => ({ ...t, _id: undefined, id: t._id?.toString() }));

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            Client Testimonials <span className="text-primary-500">({testimonials.length})</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">
            Manage your social proof and global trust signals.
          </p>
        </div>
        
        <Link 
          href="/admin/testimonials/new" 
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add Feedback
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.length === 0 ? (
            <div className="col-span-full py-24 text-center bg-white dark:bg-dark-900 rounded-3xl border border-dashed border-gray-200 dark:border-white/[0.08]">
                <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
                    <Quote className="w-10 h-10 text-gray-300 dark:text-neutral-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No reviews yet</h3>
                <p className="text-gray-500 dark:text-neutral-500 font-medium">Your client feedback will appear here once added.</p>
            </div>
        ) : testimonials.map((t: any) => (
            <div key={t.id} className="group p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm hover:shadow-xl transition-all duration-500 relative flex flex-col items-start gap-4">
                <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(star => (
                        <Star key={star} className={cn("w-4 h-4", star <= (t.rating || 5) ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-white/10")} />
                    ))}
                </div>
                
                <p className="text-lg font-medium text-gray-700 dark:text-neutral-300 italic flex-1 leading-relaxed">
                   &quot;{t.content}&quot;
                </p>

                <div className="flex items-center justify-between w-full pt-6 border-t border-gray-100 dark:border-white/[0.05]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-600 font-black">
                            {t.image ? (
                                <img src={t.image} alt={t.name} className="w-full h-full rounded-2xl object-cover" />
                            ) : t.name[0]}
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900 dark:text-white leading-tight">{t.name}</h5>
                            <p className="text-xs text-gray-500 dark:text-neutral-500 font-medium uppercase tracking-widest">{t.role}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Link 
                            href={`/admin/testimonials/${t.id}`}
                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] text-gray-400 hover:text-primary-500 transition-all"
                        >
                            <FileEdit className="w-4 h-4" />
                        </Link>
                        {/* More options */}
                         <button className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] text-gray-400 hover:text-red-500 transition-all">
                             <Trash2 className="w-4 h-4" />
                         </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
