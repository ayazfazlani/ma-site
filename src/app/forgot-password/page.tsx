"use client";

import { useState } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { Mail, Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Could not send reset email");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 dark:bg-dark-950 font-sans px-4 overflow-hidden">
      <Toaster position="top-center" />

      <div className="absolute top-10 left-[-10%] w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-dark-900 rounded-[2rem] shadow-2xl shadow-primary-500/5 border border-gray-100 dark:border-white/[0.05] overflow-hidden relative z-10">
        <div className="p-8 pb-6 border-b border-gray-100 dark:border-white/[0.05] flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20">
            <span className="text-2xl font-black text-white">M</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot password</h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400 font-medium text-center">
            Enter the admin email and we&apos;ll send a reset link if an account exists.
          </p>
        </div>

        <div className="p-8">
          {sent ? (
            <div className="space-y-6 text-center">
              <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">
                If an account exists for <span className="font-semibold">{email}</span>, check that inbox for a reset link. It expires in 1 hour.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@masoft.com"
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
                    Sending...
                  </>
                ) : (
                  "Send reset link"
                )}
              </button>

              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
