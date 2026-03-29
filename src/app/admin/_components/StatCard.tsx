// src/app/admin/_components/StatCard.tsx
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatCard({ label, value, change, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300 relative overflow-hidden group/stat">
      {/* Background design overlay */}
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover/stat:opacity-20 transition-opacity duration-700 -mr-10 -mt-10",
        color === 'blue' ? "bg-blue-500" : color === 'green' ? "bg-green-500" : color === 'accent' ? "bg-purple-500" : "bg-primary-500"
      )} />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover/stat:rotate-3 group-hover/stat:scale-110",
          color === 'blue' ? "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" : 
          color === 'green' ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : 
          color === 'accent' ? "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400" : 
          "bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold font-heading",
            change.startsWith("+") ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-gray-50 dark:bg-white/[0.05] text-gray-500 dark:text-neutral-400"
        )}>
          {change.startsWith("+") && <ArrowUpRight className="w-3.5 h-3.5 font-bold" />}
          {change !== "0%" && change}
          {change === "0%" && "Static"}
        </div>
      </div>
      
      <div className="relative z-10">
        <p className="text-[13px] font-bold text-gray-500 dark:text-neutral-400 mb-1 lg:text-[14px] uppercase tracking-wider">{label}</p>
        <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">{value}</h4>
      </div>
    </div>
  );
}
