"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function PortfolioStatusToggle({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const nextActive = !active;

  async function toggleStatus() {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Could not update visibility");
      toast.success(nextActive ? "Project is now public" : "Project paused and private");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update visibility");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleStatus}
      disabled={loading}
      aria-label={nextActive ? "Make project public" : "Pause project and make private"}
      title={nextActive ? "Make public" : "Pause and make private"}
      className={`p-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 ${
        active
          ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-amber-500 hover:text-white"
          : "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-neutral-400 hover:bg-green-600 hover:text-white"
      }`}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
    </button>
  );
}