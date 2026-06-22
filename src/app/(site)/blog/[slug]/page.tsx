// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import Image from "next/image";
import { Metadata } from "next";
import { Calendar, Clock, ChevronLeft, Share2, Tag, Bookmark, Layers } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import CommentSection from "../_components/CommentSection";
import RelatedPostSidebar from "../_components/RelatedPostSidebar";
import InContentRelated from "../_components/InContentRelated";
import ShareButtons from "../_components/ShareButtons";

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
      canonical: `https://masofts.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDesc || post.excerpt || "",
      images: post.image ? [post.image] : [],
      type: "article",
      url: `https://masofts.com/blog/${slug}`,
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
  // Start all top-level queries in parallel
  const [postRaw, firstRelatedRaw] = await Promise.all([
    PostModel.findOne({ slug, published: true }).lean(),
    PostModel.find({ slug: { $ne: slug }, published: true, category: null }).limit(4).sort({ createdAt: -1 }).lean(), // Placeholders
  ]);

  const post = postRaw as any;
  if (!post) return notFound();

  // Now we know the post, we can fetch specific related and series info in parallel
  const [relatedByCategory, generalRelated, seriesInfo] = await Promise.all([
    PostModel.find({ slug: { $ne: slug }, published: true, category: post.category }).limit(4).sort({ createdAt: -1 }).lean(),
    PostModel.find({ slug: { $ne: slug }, published: true }).limit(4).sort({ createdAt: -1 }).lean(),
    post.seriesId ? (async () => {
      const SeriesModel = (await import("@/models/Series")).default;
      const s = await SeriesModel.findById(post.seriesId).lean();
      const ps = await PostModel.find({ seriesId: post.seriesId, published: true }).sort({ orderInSeries: 1 }).select("title slug orderInSeries").lean();
      return { series: s, seriesPosts: ps };
    })() : Promise.resolve(null)
  ]);

  const relatedPosts = relatedByCategory as any[];
  let finalRelated = [...relatedPosts];
  if (finalRelated.length < 4) {
    const existingIds = new Set(finalRelated.map(p => p._id.toString()));
    const additional = (generalRelated as any[]).filter(p => !existingIds.has(p._id.toString())).slice(0, 4 - finalRelated.length);
    finalRelated = [...finalRelated, ...additional];
  }

  const series = seriesInfo?.series || null;
  const seriesPosts = seriesInfo?.seriesPosts || [];

  // Content Splitting Logic for Inline Related Posts
  const paragraphs = post.content.split('</p>').filter((p: string) => p.trim().length > 0);
  const totalParas = paragraphs.length;
  
  // Decide how many to inject (up to 3)
  const injectCount = totalParas > 12 ? 3 : totalParas > 8 ? 2 : totalParas > 4 ? 1 : 0;
  
  const chunks = [];
  if (injectCount > 0) {
    const chunkSize = Math.floor(totalParas / (injectCount + 1));
    for (let i = 0; i <= injectCount; i++) {
        const start = i * chunkSize;
        const end = (i === injectCount) ? totalParas : (i + 1) * chunkSize;
        chunks.push(paragraphs.slice(start, end).join('</p>') + '</p>');
    }
  } else {
    chunks.push(post.content);
  }

  return (
    <article className="pt-20 sm:pt-28 pb-16 sm:pb-24 dark:bg-dark-950 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] text-sm font-bold text-gray-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/20 shadow-sm transition-all mb-8 sm:mb-12 group"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:-translate-x-1 transition-transform" />
            Browse Articles
          </Link>

          {/* Header Section */}
          <div className="space-y-4 mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2">
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-widest border border-primary-500/10 leading-none">
                {post.category || "General"}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-[12px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest leading-none">
                <span className="flex items-center gap-1.5 sm:gap-2"><Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{formatDate(post.createdAt)}</span>
                <span className="flex items-center gap-1.5 sm:gap-2"><Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-gray-900 dark:text-white leading-[1.2] tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-100 dark:border-white/[0.05]">
              <div className="flex items-center gap-4 group cursor-default">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center p-0.5 group-hover:border-primary-500 transition-colors"
                  aria-hidden="true"
                >
                  <div className="w-full h-full rounded-2xl bg-primary-500 flex items-center justify-center text-white text-base sm:text-lg font-black shadow-lg shadow-primary-500/20">
                    {post.author ? post.author.charAt(0) : "A"}
                  </div>
                </div>
                <div>
                  <p className="text-[13px] sm:text-[14px] font-black text-gray-900 dark:text-white uppercase tracking-tight">{post.author || "Ahmed Khan"}</p>
                  <p className="text-[11px] sm:text-xs text-gray-500 dark:text-neutral-400 font-bold uppercase tracking-widest">Enterprise Lead Writer</p>
                </div>
              </div>

              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 min-w-0">
            {/* Feature Image */}
            {post.image && (
              <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-16 shadow-xl shadow-primary-500/5 group border border-gray-100 dark:border-white/[0.05]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Series Playlist Widget */}
            {series && (
              <div className="mb-10 sm:mb-16 rounded-[2rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] overflow-hidden shadow-sm">
                <div className="p-6 sm:p-8 bg-primary-600 text-white flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Learning Series</p>
                    <h3 className="text-xl font-bold tracking-tight">{series.title}</h3>
                  </div>
                  <Layers className="w-8 h-8 opacity-20" />
                </div>
                <div className="p-4 sm:p-6 space-y-1">
                  {seriesPosts.map((p: any, idx: number) => {
                    const isCurrent = p.slug === slug;
                    return (
                      <Link 
                        key={p.slug} 
                        href={`/blog/${p.slug}`}
                        className={cn(
                          "flex items-center gap-4 p-3 rounded-xl transition-all group/item",
                          isCurrent 
                            ? "bg-primary-500/10 border border-primary-500/20" 
                            : "hover:bg-white dark:hover:bg-white/5 border border-transparent"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-colors",
                          isCurrent 
                            ? "bg-primary-600 text-white" 
                            : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-neutral-500 group-hover/item:bg-primary-500 group-hover/item:text-white"
                        )}>
                          {idx + 1}
                        </div>
                        <span className={cn(
                          "text-sm font-bold truncate",
                          isCurrent ? "text-primary-600 dark:text-primary-400" : "text-gray-600 dark:text-neutral-400 group-hover/item:text-gray-900 dark:group-hover/item:text-white"
                        )}>{p.title}</span>
                        {isCurrent && (
                            <div className="ml-auto px-2 py-0.5 rounded-md bg-primary-500/10 text-[9px] font-black uppercase text-primary-500 tracking-widest border border-primary-500/20">Playing</div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="relative">
              <div className={cn(
                "prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words hyphens-none",
                "prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white",
                "prose-p:text-gray-600 dark:prose-p:text-neutral-400 prose-p:font-medium",
                "prose-strong:text-primary-600 dark:prose-strong:text-primary-400 prose-strong:font-black",
                "prose-img:rounded-2xl sm:prose-img:rounded-3xl prose-img:shadow-xl sm:prose-img:shadow-2xl prose-img:border prose-img:border-gray-100 dark:prose-img:border-white/[0.05] prose-img:max-w-full prose-img:h-auto",
                "prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-black prose-a:no-underline hover:prose-a:underline",
                "prose-li:text-gray-600 dark:prose-li:text-neutral-400 prose-li:font-medium",
                "prose-ul:list-disc prose-ol:list-decimal",
                "prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:text-xs sm:prose-pre:text-sm",
                "[&_iframe]:max-w-full [&_iframe]:rounded-xl sm:[&_iframe]:rounded-2xl [&_video]:max-w-full [&_video]:rounded-xl sm:[&_video]:rounded-2xl",
              )}>
                {chunks.map((chunk, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: chunk }} />
                    {index < injectCount && finalRelated[index] && (
                      <InContentRelated post={finalRelated[index]} />
                    )}
                  </div>
                ))}
              </div>

              {/* Footer tags */}
              <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-gray-100 dark:border-white/[0.05] flex flex-wrap gap-2 sm:gap-3 items-center">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                {["Software", "Strategy", post.category || "General"].map(tag => (
                  <span key={tag} className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] text-xs sm:text-sm text-gray-500 dark:text-neutral-400 font-bold border border-gray-100 dark:border-white/[0.05] hover:border-primary-500/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all cursor-default">#{tag}</span>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-24">
              <CommentSection postId={post._id.toString()} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:w-80 shrink-0">
            <RelatedPostSidebar posts={finalRelated} />
          </div>
        </div>
      </div>
    </article>
  );
}