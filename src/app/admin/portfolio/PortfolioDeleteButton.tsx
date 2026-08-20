"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PortfolioDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this portfolio project? This cannot be undone.")) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Could not delete project");
      }
      toast.success("Project deleted");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      aria-label="Delete project"
      className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}