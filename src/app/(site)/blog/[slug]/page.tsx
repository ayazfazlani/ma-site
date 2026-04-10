// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import Image from "next/image";
import { Metadata } from "next";
import { Calendar, User, Clock, ChevronLeft, Share2, Tag, Bookmark } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const post = await PostModel.findOne({ slug }).lean() as any;

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.metaTitle || post.title}`,
    description: post.metaDesc || post.excerpt || `Read about ${post.title} on the MA Softs blog.`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDesc || post.excerpt || "",
      images: post.image ? [post.image] : [],
      type: "article",
      url: `https://www.masofts.com/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDesc || post.excerpt || "",
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const post = await PostModel.findOne({ slug }).lean() as any;

  if (!post || !post.published) {
    return notFound();
  }

  return (
    <article className="pt-32 pb-24 dark:bg-dark-950 min-h-screen">
      <div className="container-custom mx-auto px-4 max-w-4xl">
        <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] text-sm font-bold text-gray-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/20 shadow-sm transition-all mb-12 group"
        >
          <ChevronLeft className="w-4.5 h-4.5 group-hover:-translate-x-1 transition-transform" />
          Browse Articles
        </Link>

        {/* Header Section */}
        <div className="space-y-6 mb-16">
            <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className="px-4 py-1.5 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-widest border border-primary-500/10 leading-none">
                    {post.category || "General"}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-6 text-[12px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest leading-none">
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                {post.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-gray-100 dark:border-white/[0.05]">
                <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center p-0.5 group-hover:border-primary-500 transition-colors">
                        <div className="w-full h-full rounded-2xl bg-primary-500 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-primary-500/20">
                            {post.author ? post.author.charAt(0) : "A"}
                        </div>
                    </div>
                    <div>
                        <p className="text-[14px] font-black text-gray-900 dark:text-white uppercase tracking-tight">{post.author || "Ahmed Khan"}</p>
                        <p className="text-xs text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-widest">Enterprise Lead Writer</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-3.5 rounded-2xl bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] text-gray-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/20 shadow-sm transition-all group" title="Save for later">
                        <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="p-3.5 rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20 flex items-center gap-3 font-bold text-sm px-6 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] transition-all" title="Share Article">
                        <Share2 className="w-5 h-5" />
                        Share Now
                    </button>
                </div>
            </div>
        </div>

        {/* Feature Image */}
        {post.image && (
          <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-primary-500/5 group border border-gray-100 dark:border-white/[0.05]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Content Section */}
        <div className="relative">
            <div className="sticky top-32 left-0 h-0 w-full hidden lg:block overflow-visible -ml-24 pointer-events-none">
                <div className="flex flex-col gap-4 pointer-events-auto">
                    {/* Social floating sidebar */}
                </div>
            </div>

            <div className={cn(
                "prose prose-lg dark:prose-invert max-w-none",
                "prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white",
                "prose-p:text-gray-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:font-medium",
                "prose-strong:text-primary-600 dark:prose-strong:text-primary-400 prose-strong:font-black",
                "prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-gray-100 dark:prose-img:border-white/[0.05]",
                "prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-black prose-a:no-underline hover:prose-a:underline",
                "prose-li:text-gray-600 dark:prose-li:text-neutral-400 prose-li:font-medium",
                "prose-ul:list-disc prose-ol:list-decimal",
                "first-letter:text-5xl first-letter:font-black first-letter:text-primary-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none"
            )}>
                {/* Normally we'd use MDXRemote here, but for now we'll render as dangerouslySetInnerHTML if it's stored as HTML */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Footer tags */}
            <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/[0.05] flex flex-wrap gap-3 items-center">
                <Tag className="w-5 h-5 text-gray-400" />
                {["Software", "Strategy", post.category || "General"].map(tag => (
                   <span key={tag} className="px-5 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] text-sm text-gray-500 dark:text-neutral-400 font-bold border border-gray-100 dark:border-white/[0.05] hover:border-primary-500/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all cursor-default">#{tag}</span> 
                ))}
            </div>
        </div>
      </div>
    </article>
  );
}
