"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { 
  MessageSquare, Check, X, Trash2, Search, 
  CheckCircle2, Clock, Filter, Mail, User,
  Calendar, FileText, Loader2, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentItem {
  _id: string;
  name: string;
  email: string;
  content: string;
  approved: boolean;
  postTitle: string;
  postSlug: string;
  createdAt: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/admin/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApprove = async (id: string, approved: boolean) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      if (res.ok) {
        toast.success(approved ? "Comment approved!" : "Comment hidden.");
        fetchComments();
      } else {
        toast.error("Failed to update comment.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this comment?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Comment deleted.");
        fetchComments();
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredComments = comments
    .filter((c) => {
      if (filter === "pending") return !c.approved;
      if (filter === "approved") return c.approved;
      return true;
    })
    .filter((c) =>
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.content.toLowerCase().includes(search.toLowerCase()) ||
      c.postTitle.toLowerCase().includes(search.toLowerCase())
    );

  const pendingCount = comments.filter((c) => !c.approved).length;
  const approvedCount = comments.filter((c) => c.approved).length;

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            Comments <span className="text-primary-500">({comments.length})</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">
            Review, approve, and manage reader feedback on your articles.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm font-bold">
            <AlertCircle className="w-5 h-5" />
            {pendingCount} pending review
          </div>
        )}
      </div>

      {/* Filters & Search */}
      <div className="p-4 md:p-5 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            placeholder="Search comments, authors, posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.03] text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30 placeholder:text-gray-400 dark:placeholder:text-neutral-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] p-1.5 rounded-xl border border-gray-100 dark:border-white/[0.05]">
          {[
            { key: "all", label: "All", count: comments.length },
            { key: "pending", label: "Pending", count: pendingCount },
            { key: "approved", label: "Approved", count: approvedCount },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                filter === f.key
                  ? "bg-white dark:bg-white/[0.1] shadow-sm text-primary-600 dark:text-primary-400 ring-1 ring-gray-200 dark:ring-white/[0.1]"
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-gray-300 dark:text-neutral-600" />
              </div>
              <div className="space-y-1 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">No comments found</p>
                <p className="text-gray-500 dark:text-neutral-500 font-medium max-w-xs mx-auto">
                  {filter === "pending" ? "No pending comments to review." : "Comments from your readers will appear here."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment._id}
              className={cn(
                "p-6 md:p-8 rounded-3xl bg-white dark:bg-dark-900 border shadow-sm transition-all hover:shadow-md group",
                comment.approved
                  ? "border-gray-200 dark:border-white/[0.08]"
                  : "border-amber-200 dark:border-amber-500/20 bg-amber-50/30 dark:bg-amber-500/[0.03]"
              )}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Avatar */}
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 shadow-sm",
                  comment.approved
                    ? "bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                    : "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                )}>
                  {comment.name.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-[15px] font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                        {comment.name}
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          comment.approved
                            ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                            : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
                        )}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", comment.approved ? "bg-green-500" : "bg-amber-500")} />
                          {comment.approved ? "Approved" : "Pending"}
                        </span>
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3" />
                          {comment.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Post reference */}
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] w-fit">
                    <FileText className="w-3.5 h-3.5 text-primary-500" />
                    <span className="text-xs font-bold text-gray-500 dark:text-neutral-400">On:</span>
                    <span className="text-xs font-black text-gray-900 dark:text-white">{comment.postTitle}</span>
                  </div>

                  {/* Comment body */}
                  <p className="text-gray-600 dark:text-neutral-400 font-medium leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    {!comment.approved ? (
                      <button
                        onClick={() => handleApprove(comment._id, true)}
                        disabled={actionLoading === comment._id}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      >
                        {actionLoading === comment._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(comment._id, false)}
                        disabled={actionLoading === comment._id}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.05] hover:bg-gray-200 dark:hover:bg-white/[0.1] text-gray-600 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
                      >
                        {actionLoading === comment._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                        Unapprove
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment._id)}
                      disabled={actionLoading === comment._id}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
