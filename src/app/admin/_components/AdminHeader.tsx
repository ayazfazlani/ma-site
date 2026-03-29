// src/app/admin/_components/AdminHeader.tsx
"use client";

import { Bell, Search, User, Globe, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const currentTitle = pathname.split("/").pop() || "Dashboard";
  const title = currentTitle === "admin" ? "Dashboard" : currentTitle.charAt(0).toUpperCase() + currentTitle.slice(1);

  return (
    <header className="h-20 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-white/[0.08] px-6 flex items-center justify-between sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-white/[0.05] text-gray-500 dark:text-neutral-400 font-bold">
          <Menu className="w-5 h-5 font-bold" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white lg:block hidden">
            {title}
        </h1>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden sm:flex">
        <div className="relative w-full group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 dark:text-neutral-500 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search blogs, settings..." 
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border-none bg-gray-50 dark:bg-white/[0.03] text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 placeholder:text-gray-400 dark:placeholder:text-neutral-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Link 
          href="/" 
          target="_blank"
          className="p-2.5 rounded-xl text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-white/[0.05] hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
          title="Visit Website"
        >
          <Globe className="w-5 h-5 font-bold" />
        </Link>
        <button className="p-2.5 rounded-xl text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-white/[0.05] relative transition-all duration-200">
          <Bell className="w-5 h-5 font-bold" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-dark-900" />
        </button>
        <div className="h-10 w-[1px] bg-gray-200 dark:bg-white/[0.08] mx-1 md:mx-2 hidden sm:block" />
        <div className="flex items-center gap-3 pl-1 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-bold text-gray-900 dark:text-white leading-tight">Ahmed Khan</p>
            <p className="text-[11px] text-primary-500 dark:text-primary-400 font-semibold leading-tight">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary-500/20 bg-primary-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
            AK
          </div>
        </div>
      </div>
    </header>
  );
}
