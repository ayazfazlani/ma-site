// src/app/admin/layout.tsx
import { ReactNode } from "react";
import Sidebar from "@/app/admin/_components/Sidebar";
import AdminHeader from "@/app/admin/_components/AdminHeader";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-950">
      <Toaster position="top-right" />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
