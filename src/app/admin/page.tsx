// src/app/admin/page.tsx
import { 
  Users, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  Eye, 
  MousePointerClick, 
  Search 
} from "lucide-react";
import StatCard from "@/app/admin/_components/StatCard";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Views", value: "12,450", change: "+14%", icon: Eye, color: "blue" },
    { label: "Blog Posts", value: "24", change: "+2", icon: FileText, color: "primary" },
    { label: "Projects", value: "12", change: "+1", icon: Briefcase, color: "accent" },
    { label: "Active Clients", value: "8", change: "0%", icon: Users, color: "green" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header section with Welcome message */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            Welcome back, <span className="gradient-text">Ahmed</span> 👋
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">
            Here's what's happening with <span className="text-primary-600 dark:text-primary-400 font-bold">MA Softs</span> today.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-2xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">Live Tracking</span>
          </div>
          <button className="px-6 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
            View Analytics
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} delay={i * 0.1} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 md:gap-6">
        <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm relative overflow-hidden group">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary-500/10 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">Dynamic Content Overview</h3>
                    <p className="text-gray-500 dark:text-neutral-400 font-medium leading-relaxed max-w-xl">
                        Manage your website's content dynamically from one central dashboard. 
                        Updates are reflected instantly across the site for your clients to see.
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-2 md:self-start">
                    <span className="px-4 py-1.5 rounded-xl bg-gray-100 dark:bg-white/[0.05] text-[12px] font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-widest">SEO Friendly</span>
                    <span className="px-4 py-1.5 rounded-xl bg-gray-100 dark:bg-white/[0.05] text-[12px] font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-widest">Optimized Images</span>
                    <span className="px-4 py-1.5 rounded-xl bg-gray-100 dark:bg-white/[0.05] text-[12px] font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-widest">Fast Delivery</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {[
                { title: "Manage SEO", desc: "Optimize your meta tags and descriptions for each page automatically.", icon: Search, color: "blue" },
                { title: "Cloudinary Sync", desc: "Upload and manage images with Cloudinary's powerful optimization engine.", icon: Eye, color: "green" },
                { title: "Lead Generation", desc: "Track conversions and clicks with built-in analytics and tracking tools.", icon: MousePointerClick, color: "purple" }
                ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-transparent hover:border-primary-500/20 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 group/item cursor-default">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm bg-gradient-to-br ${i === 0 ? "from-blue-500 to-cyan-400 shadow-blue-500/20" : i === 1 ? "from-green-500 to-emerald-400 shadow-green-500/20" : "from-purple-500 to-pink-400 shadow-purple-500/20"}`}>
                            <item.icon className="w-6 h-6 text-white group-hover/item:scale-110 transition-transform" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">{item.title}</h4>
                        <p className="text-[15px] text-gray-500 dark:text-neutral-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
