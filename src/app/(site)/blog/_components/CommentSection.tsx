"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MessageSquare, User, Send, Loader2, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Comment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
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
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, postId }),
      });

      if (res.ok) {
        toast.success("Comment posted successfully!");
        setFormData({ name: "", email: "", content: "" });
        fetchComments(); // Refresh list
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to post comment");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-24 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/[0.05] pb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-4">
            <MessageSquare className="w-8 h-8 text-primary-500" />
            Thoughts & Comments
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium mt-2">
            {comments.length === 0 
              ? "No comments yet. Be the first to start the conversation!" 
              : `Showing ${comments.length} conversation${comments.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        
        {/* Comment Form */}
        <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-dark-900/50 border border-gray-100 dark:border-white/[0.05] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-500/10 transition-colors" />
                
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-3">
                    Submit a Response
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest pl-1">Full Name</label>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Your name"
                                className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500/20 transition-all outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest pl-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="name@company.com"
                                className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-primary-500/20 transition-all outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest pl-1">Your Comment</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.content}
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                            placeholder="Share your thoughts..."
                            className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-dark-950 border border-gray-100 dark:border-white/[0.05] text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20 transition-all outline-none leading-relaxed placeholder:text-gray-300 dark:placeholder:text-gray-600 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-black tracking-wide shadow-lg shadow-primary-600/20 transition-all active:scale-[0.98] disabled:opacity-50 group/btn"
                    >
                        {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Send Comment
                                <Send className="w-4.5 h-4.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 dark:text-neutral-600 font-bold uppercase tracking-wider">
                        Your email address will not be published.
                    </p>
                </form>
            </div>
        </div>

        {/* Comments List */}
        <div className="lg:col-span-7 space-y-10">
            {loading ? (
                <div className="space-y-8">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-6 animate-pulse">
                            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-dark-900" />
                            <div className="flex-1 space-y-4">
                                <div className="h-4 w-1/3 bg-gray-100 dark:bg-dark-900 rounded-lg" />
                                <div className="h-20 w-full bg-gray-50 dark:bg-dark-900/50 rounded-2xl" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : comments.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-100 dark:border-white/[0.05] rounded-[3rem]">
                    <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-dark-900 flex items-center justify-center mb-6">
                        <MessageSquare className="w-10 h-10 text-gray-200 dark:text-neutral-800" />
                    </div>
                    <p className="text-lg font-bold text-gray-400 dark:text-neutral-600 mb-1">Silence is golden, but comments are better.</p>
                    <p className="text-sm font-medium text-gray-400 dark:text-neutral-700">Be the first to speak up!</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {comments.map((comment, index) => (
                        <div 
                            key={comment._id} 
                            className="group flex gap-6 animate-in slide-in-from-right-10 duration-700"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 dark:bg-primary-500/20 border border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-black text-xl shadow-sm">
                                    {comment.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h4 className="text-[15px] font-black text-gray-900 dark:text-white uppercase tracking-tight">{comment.name}</h4>
                                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 dark:text-neutral-600 uppercase tracking-widest">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(comment.createdAt)}
                                    </span>
                                </div>
                                <div className="p-6 rounded-2xl rounded-tl-none bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm group-hover:border-primary-500/20 transition-colors">
                                    <p className="text-gray-600 dark:text-neutral-400 font-medium leading-relaxed whitespace-pre-wrap">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
