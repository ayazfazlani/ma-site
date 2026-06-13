// src/app/blog/_components/BlogList.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, Clock, ImageIcon, Search, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDate, cn } from "@/lib/utils";

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

export default function BlogList({ initialPosts, initialSearch = "" }: { initialPosts: BlogPost[], initialSearch?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredPosts(initialPosts);
      return;
    }

    const filtered = initialPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt?.toLowerCase().includes(query) || 
      post.category?.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, initialPosts]);

  return (
    <div className="space-y-10">
      {/* Search Input */}
      <div className="relative group max-w-xl">
        <div className={cn("absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors", searchQuery ? "text-primary-500" : "text-gray-400")}>
          <Search className="w-5 h-5" />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles by title, category or topic..." 
          aria-label="Search articles"
          className={cn(
            "w-full pl-14 pr-16 py-4 rounded-[1.5rem] outline-none transition-all font-medium border",
            isDark ? "bg-white/5 border-white/10 focus:border-primary-500/50 text-white placeholder:text-neutral-600" : "bg-white border-gray-100 focus:border-primary-500/30 text-gray-900 placeholder:text-gray-400 shadow-sm"
          )}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-6 flex items-center group/clear"
          >
            <div className="p-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-neutral-500 group-hover/clear:bg-primary-500 group-hover/clear:text-white transition-all">
              <X className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-300 dark:text-neutral-700" />
          </div>
          <h3 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-gray-900")}>No articles found</h3>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">Try adjusting your search terms or browse categories.</p>
          <button 
            onClick={() => setSearchQuery("")}
            className="text-primary-500 font-bold hover:underline underline-offset-4"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "rounded-[2.5rem] overflow-hidden transition-all duration-500 group relative border shadow-sm hover:shadow-2xl hover:-translate-y-2",
                    isDark ? "bg-white/5 border-white/5 hover:border-primary-500/30 hover:bg-white/10" : "bg-white border-gray-100 hover:border-primary-500/20"
                  )}
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
                      <div className={cn("w-full h-full flex items-center justify-center text-primary-500/30", isDark ? "bg-primary-500/10" : "bg-primary-50")}>
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-5 left-5 z-20">
                      <span className={cn(
                          "backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest leading-none shadow-sm",
                          isDark ? "bg-dark-900 text-primary-400 border border-white/10" : "bg-white text-primary-600 border border-gray-100"
                        )}>
                        {post.category || "General"}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 relative">
                    <div className={cn("flex items-center space-x-4 text-[11px] font-bold uppercase tracking-widest mb-4", isDark ? "text-neutral-500" : "text-gray-400")}>
                      <span className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary-500" />
                        <span>{formatDate(post.createdAt)}</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary-500" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h2 className={cn("text-xl font-extrabold mb-3 transition-colors line-clamp-2 leading-tight group-hover:text-primary-500", isDark ? "text-white" : "text-gray-900")}>
                      {post.title}
                    </h2>

                    <p className={cn("mb-6 line-clamp-2 text-sm font-medium leading-relaxed opacity-70", isDark ? "text-neutral-400" : "text-gray-500")}>
                      {post.excerpt}
                    </p>

                    <div className={cn("flex items-center justify-between pt-5 border-t", isDark ? "border-white/10" : "border-gray-100")}>
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shadow-sm relative z-20",
                            isDark ? "bg-primary-500/10 border border-white/10" : "bg-primary-50 border border-primary-100"
                          )}>
                          <User className="w-3.5 h-3.5 text-primary-500" />
                        </div>
                        <span className={cn("text-[12px] font-bold relative z-20", isDark ? "text-neutral-300" : "text-gray-700")}>
                          {post.author || "M Ayaz"}
                        </span>
                      </div>

                      <div 
                        className="text-primary-500 font-extrabold text-sm flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      >
                        <span className="uppercase tracking-widest text-xs">Read</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
