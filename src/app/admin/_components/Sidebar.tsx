// src/app/admin/_components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Layers, 
  Image as ImageIcon,
  Users,
  LogOut,
  ChevronRight,
  Tag,
  MessagesSquare,
  Mail,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
  { icon: Layers, label: "Series", href: "/admin/series" },
  { icon: Tag, label: "Categories", href: "/admin/categories" },
  { icon: Mail, label: "Messages", href: "/admin/messages" },
  { icon: MessagesSquare, label: "Comments", href: "/admin/comments" },
  { icon: Briefcase, label: "Services", href: "/admin/services" },
  { icon: LayoutGrid, label: "Portfolio", href: "/admin/portfolio" },
  { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Settings, label: "Site Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-white/[0.08] bg-white dark:bg-dark-900 hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-white/[0.08] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
          <span className="text-white font-bold">M</span>
        </div>
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white">Admin Panel</h2>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">MA Softs</p>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400" 
                  : "text-gray-500 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-white/[0.03] hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white")} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 ml-auto" />
              )}
              {!isActive && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-white/[0.08]">
        <button onClick={async () => {
          await fetch('/api/auth/logout', { method: 'POST' });
          window.location.href = '/login';
        }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
