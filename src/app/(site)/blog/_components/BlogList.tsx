// src/app/blog/_components/BlogList.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  author: string | null;
  createdAt: Date;
  readTime: string | null;
  image: string | null;
}

export default function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (initialPosts.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
          <ImageIcon className="w-10 h-10 text-gray-300 dark:text-neutral-700" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No blog posts yet</h3>
        <p className="text-gray-500 dark:text-neutral-400 font-medium">Check back later for new insights and updates.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {initialPosts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-[2.5rem] overflow-hidden transition-all duration-500 group relative border shadow-sm hover:shadow-2xl hover:-translate-y-2 ${isDark
              ? "bg-white/[0.025] border-white/[0.05] hover:border-primary-500/30 hover:bg-white/[0.04]"
              : "bg-white border-gray-100 hover:border-primary-500/20"
            }`}
        >
          <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post.title}`} />
          
          <div className="h-52 relative overflow-hidden">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${isDark ? "bg-primary-500/10" : "bg-primary-50"} text-primary-500/30`}>
                <ImageIcon className="w-12 h-12" />
              </div>
            )}
            <div className="absolute top-5 left-5 z-20">
              <span className={`backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest leading-none shadow-sm ${isDark
                  ? "bg-dark-950/70 text-primary-400 border border-white/5"
                  : "bg-white/90 text-primary-600 border border-gray-100"
                 }`}>
                {post.category || "General"}
              </span>
            </div>
          </div>

          <div className="p-7 relative">
            <div className={`flex items-center space-x-4 text-[11px] font-bold uppercase tracking-widest mb-4 ${isDark ? "text-neutral-500" : "text-gray-400"}`}>
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary-500" />
                <span>{formatDate(post.createdAt)}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-500" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <h2 className={`text-xl font-extrabold mb-3 transition-colors line-clamp-2 leading-tight group-hover:text-primary-500 ${isDark ? "text-white" : "text-gray-900"}`}>
              {post.title}
            </h2>

            <p className={`mb-6 line-clamp-2 text-sm font-medium leading-relaxed opacity-70 ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
              {post.excerpt}
            </p>

            <div className={`flex items-center justify-between pt-5 border-t ${isDark ? "border-white/[0.06]" : "border-gray-100"}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm relative z-20 ${isDark ? "bg-primary-500/10 border border-white/5" : "bg-primary-50 border border-primary-100"}`}>
                  <User className="w-3.5 h-3.5 text-primary-500" />
                </div>
                <span className={`text-[12px] font-bold relative z-20 ${isDark ? "text-neutral-300" : "text-gray-700"}`}>
                  {post.author || "M Ayaz"}
                </span>
              </div>

              <div className="text-primary-500 font-extrabold text-sm flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span className="uppercase tracking-widest text-xs">Read</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
