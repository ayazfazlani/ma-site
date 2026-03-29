"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome back!");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 dark:bg-dark-950 font-sans px-4 overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-[-10%] w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-200 dark:border-white/[0.05] rounded-full sm:flex items-center justify-center hidden opacity-50 pointer-events-none">
        <div className="w-[600px] h-[600px] border border-gray-200 dark:border-white/[0.05] rounded-full" />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-dark-900 rounded-[2rem] shadow-2xl shadow-primary-500/5 border border-gray-100 dark:border-white/[0.05] overflow-hidden relative z-10">
        
        {/* Header Block */}
        <div className="p-8 pb-6 border-b border-gray-100 dark:border-white/[0.05] flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20">
              <span className="text-2xl font-black text-white">M</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-500 dark:text-neutral-400 font-medium text-center">
              Please sign in to access your administrative dashboard.
            </p>
        </div>

        {/* Form Body */}
        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
            
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">
                  Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@masoft.com"
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-all outline-none"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest pl-1">
                  Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-all outline-none"
                    />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold tracking-wide shadow-lg shadow-primary-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
              >
                {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Authenticating...
                    </>
                ) : (
                    "Access Dashboard"
                )}
              </button>

            </form>
        </div>

      </div>
    </div>
  );
}
