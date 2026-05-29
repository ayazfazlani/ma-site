// src/app/(site)/blog/_components/RelatedPostSidebar.tsx
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface RelatedPost {
  title: string;
  slug: string;
  image?: string;
  createdAt: Date;
  readTime: string;
  category?: string;
}

interface RelatedPostSidebarProps {
  posts: RelatedPost[];
}

export default function RelatedPostSidebar({ posts }: RelatedPostSidebarProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <aside className="space-y-10 sticky top-32">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">
            Related Articles
          </h3>
          <div className="h-px flex-1 bg-gray-100 dark:bg-white/[0.05] ml-4" />
        </div>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group block space-y-3"
            >
              {post.image && (
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.05]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                    {post.category || "General"}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">
                  <span>{formatDate(post.createdAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter or CTA placeholder */}
      <div className="p-8 rounded-[2rem] bg-primary-600 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        <div className="relative z-10 space-y-4">
          <h3 className="text-xl font-black text-white leading-tight">Need a custom solution?</h3>
          <p className="text-sm text-primary-100 font-medium leading-relaxed">
            Let's build something amazing together. Our experts are ready to help.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white bg-primary-700 hover:bg-primary-800 px-6 py-3 rounded-xl transition-all"
          >
            Contact Us <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
