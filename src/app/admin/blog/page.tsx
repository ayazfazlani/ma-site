// src/app/admin/blog/page.tsx
import { Search, Plus, MoreHorizontal, FileEdit, Trash2, LayoutGrid, List as ListIcon, User,  Eye, 
  ArrowUpDown,
  FileText,
  ImageIcon
} from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";

export default async function AdminBlogPage() {
  await dbConnect();
  const rawPosts = await PostModel.find({}).sort({ createdAt: -1 }).lean();
  const posts = rawPosts.map((p: any) => ({ ...p, _id: undefined, id: p._id?.toString() }));

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* Header section with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            Blog Posts <span className="text-primary-500">({posts.length})</span>
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">
            Manage your articles, tutorials, and thought leadership content.
          </p>
        </div>
        
        <Link 
          href="/admin/blog/new" 
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Create New Post
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="p-4 md:p-5 rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by title, category..." 
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.03] text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30 placeholder:text-gray-400 dark:placeholder:text-neutral-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/[0.03] p-1.5 rounded-xl border border-gray-100 dark:border-white/[0.05]">
           <button className="p-2 rounded-lg bg-white dark:bg-white/[0.1] shadow-sm text-primary-600 dark:text-primary-400 ring-1 ring-gray-200 dark:ring-white/[0.1]">
              <ListIcon className="w-4.5 h-4.5" />
           </button>
           <button className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <LayoutGrid className="w-4.5 h-4.5" />
           </button>
        </div>
      </div>

      {/* Blog Table */}
      <div className="rounded-3xl bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/[0.08] shadow-sm overflow-hidden group">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.05]">
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors group/head">
                    Post Info
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover/head:opacity-100" />
                  </div>
                </th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest hidden md:table-cell">Category</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest hidden lg:table-cell">Publish Date</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center">
                        <FileText className="w-10 h-10 text-gray-300 dark:text-neutral-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">No posts found</p>
                        <p className="text-gray-500 dark:text-neutral-500 font-medium max-w-xs mx-auto">Get started by creating your first blog post to show up here.</p>
                      </div>
                      <Link href="/admin/blog/new" className="mt-2 px-5 py-2 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-bold hover:bg-primary-500 hover:text-white transition-all">
                        Create Post
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : posts.map((post: any) => (
                <tr key={post.id} className="group/row hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl relative overflow-hidden bg-gray-100 dark:bg-white/[0.05] border border-gray-100 dark:border-white/[0.08] shadow-sm flex-shrink-0 group-hover/row:scale-105 transition-transform">
                            {post.image ? (
                                <Image src={post.image} alt={post.title} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                            <h4 className="font-bold text-gray-900 dark:text-white truncate group-hover/row:text-primary-600 dark:group-hover/row:text-primary-400 transition-colors leading-tight">{post.title}</h4>
                            <div className="flex items-center gap-3 text-[12px] text-gray-500 dark:text-neutral-500 font-medium">
                                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author || "Admin"}</span>
                                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />0 views</span>
                            </div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/[0.05] text-[12px] font-bold text-gray-600 dark:text-neutral-400 leading-tight">
                        {post.category || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell text-sm text-gray-500 dark:text-neutral-500 font-medium">
                    <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-neutral-300 font-bold leading-tight">{formatDate(post.createdAt)}</span>
                        <span className="text-[11px] opacity-70">Published 3:24 PM</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider",
                        post.published 
                            ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20" 
                            : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
                    )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", post.published ? "bg-green-500" : "bg-amber-500")} />
                        {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Link 
                            href={`/admin/blog/${post.id}`}
                            className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                            title="Edit Post"
                        >
                            <FileEdit className="w-4.5 h-4.5" />
                        </Link>
                        <button 
                            className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            title="Delete Post"
                        >
                            <Trash2 className="w-4.5 h-4.5" />
                        </button>
                        <button className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.05] text-gray-400 transition-colors">
                            <MoreHorizontal className="w-4.5 h-4.5" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
