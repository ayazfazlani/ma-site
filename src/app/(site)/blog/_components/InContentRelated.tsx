// src/app/(site)/blog/_components/InContentRelated.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface InContentRelatedProps {
  post: {
    title: string;
    slug: string;
    image?: string;
    category?: string;
  };
}

export default function InContentRelated({ post }: InContentRelatedProps) {
  return (
    <div className="my-12 not-prose">
      <Link 
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-5 rounded-3xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] hover:border-primary-500/30 transition-all duration-500"
      >
        {post.image && (
          <div className="relative w-full sm:w-40 aspect-[16/9] sm:aspect-square rounded-2xl overflow-hidden shrink-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0 py-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded-md">
              See Related
            </span>
            {post.category && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">
                • {post.category}
              </span>
            )}
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h4>
        </div>

        <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] group-hover:border-primary-500/50 text-gray-400 group-hover:text-primary-500 transition-all duration-500">
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
