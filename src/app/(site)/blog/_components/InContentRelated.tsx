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
    <div className="my-10 not-prose">
      {/* "Also Read" label above the box */}
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-3.5 h-3.5 text-primary-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary-500">
          Also Read
        </span>
        <span className="flex-1 h-px bg-primary-500/15" />
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-stretch gap-0 rounded-2xl overflow-hidden border border-primary-500/20 bg-primary-500/[0.03] hover:bg-primary-500/[0.06] hover:border-primary-500/40 shadow-sm hover:shadow-md hover:shadow-primary-500/10 transition-all duration-300"
      >
        {/* Left accent bar */}
        <div className="w-1 shrink-0 bg-primary-500 group-hover:bg-primary-400 transition-colors" />

        {/* Thumbnail (optional) */}
        {post.image && (
          <div className="relative w-20 sm:w-28 shrink-0 aspect-square overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* Text content */}
        <div className="flex-1 min-w-0 flex items-center px-4 py-4 sm:px-5 sm:py-4 gap-3">
          <div className="flex-1 min-w-0 space-y-1">
            {post.category && (
              <p className="text-[10px] font-black uppercase tracking-widest text-primary-500/70">
                {post.category}
              </p>
            )}
            <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
              {post.title}
            </p>
            {post.excerpt && (
              <p className="text-[12px] text-gray-500 dark:text-neutral-500 font-medium line-clamp-1 hidden sm:block">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Arrow button */}
          <div className="shrink-0 w-9 h-9 rounded-xl border border-primary-500/20 bg-white dark:bg-dark-900 group-hover:bg-primary-500 group-hover:border-primary-500 flex items-center justify-center transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-primary-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </Link>
    </div>
  );
}
