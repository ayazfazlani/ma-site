// src/app/(site)/blog/_components/InContentRelated.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

interface InContentRelatedProps {
  post: {
    title: string;
    slug: string;
    image?: string;
    category?: string;
    excerpt?: string;
  };
}

export default function InContentRelated({ post }: InContentRelatedProps) {
  return (
    <div className="my-8 not-prose">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-center gap-4 p-3 pr-5 rounded-2xl border border-gray-100 dark:border-white/[0.05] bg-gray-50/50 dark:bg-white/[0.02] hover:bg-primary-500/[0.03] hover:border-primary-500/20 transition-all duration-300"
      >
        {/* Compact Thumbnail */}
        {post.image && (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-3 h-3 text-primary-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-primary-500">
              Also Read
            </span>
          </div>
          <p className="text-sm sm:text-[15px] font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
            {post.title}
          </p>
          {post.category && (
            <p className="text-[10px] text-gray-400 dark:text-neutral-500 font-medium uppercase tracking-tight mt-0.5">
              In {post.category}
            </p>
          )}
        </div>

        {/* Small Arrow */}
        <div className="shrink-0 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500" />
        </div>
      </Link>
    </div>
  );
}
