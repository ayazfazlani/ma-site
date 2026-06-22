// src/app/(site)/blog/series/[slug]/page.tsx
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import CategoryModel from "@/models/Category";
import SeriesModel from "@/models/Series";
import BlogList from "../../_components/BlogList";
import { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, Tag as TagIcon, Layers, ChevronLeft, Clock } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const series = await SeriesModel.findOne({ slug }).lean() as any;

  if (!series) return { title: "Series Not Found" };

  return {
    title: `${series.title} – Learning Series | MA Softs`,
    description: series.description || `Follow our series on ${series.title}.`,
    alternates: {
      canonical: `https://masofts.com/blog/series/${slug}`,
    },
  };
}

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  
  const seriesItem = await SeriesModel.findOne({ slug }).lean() as any;
  if (!seriesItem) return notFound();

  const postsPerPage = 6;
  const [rawPosts, categories, allSeries, totalPosts] = await Promise.all([
    PostModel.find({ published: true, seriesId: seriesItem._id }).sort({ orderInSeries: 1 }).limit(postsPerPage).lean(),
    CategoryModel.find({}).sort({ name: 1 }).lean(),
    SeriesModel.find({ active: true }).sort({ order: 1 }).lean(),
    PostModel.countDocuments({ published: true, seriesId: seriesItem._id }),
  ]);

  const posts = rawPosts.map((p: any) => ({
    ...p,
    _id: undefined,
    id: p._id?.toString() ?? p.slug,
  }));

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://masofts.com" },
    { name: "Blog", url: "https://masofts.com/blog" },
    { name: seriesItem.title, url: `https://masofts.com/blog/series/${slug}` },
  ]);

  return (
    <main className="pt-20">
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--color-primary-400)_0%,_transparent_50%)]" />
        <div className="container-custom mx-auto px-4 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-200 hover:text-white transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary-300 border border-white/10 backdrop-blur-sm shadow-xl">
                <Layers className="w-6 h-6" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] text-primary-300">Playlist / Series</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
            {seriesItem.title}
          </h1>
          {seriesItem.description && (
            <p className="text-xl text-primary-100/80 max-w-3xl font-medium leading-relaxed">
              {seriesItem.description}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-50 dark:bg-dark-950">
        <div className="container-custom mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="mb-12 p-8 rounded-[2.5rem] bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Series Content</span>
                    <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                </div>
                <div className="space-y-4">
                    {posts.map((p, idx) => (
                        <Link 
                            key={p.slug} 
                            href={`/blog/${p.slug}`}
                            className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-transparent hover:border-primary-500/30 hover:bg-white dark:hover:bg-white/5 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 font-black text-sm group-hover:bg-primary-500 group-hover:text-white transition-all">
                                {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">{p.title}</h3>
                                <div className="flex items-center gap-4 mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
                                    <span>{p.category}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
              </div>
              
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <div className="w-2 h-8 bg-primary-500 rounded-full" />
                    Detailed View
                </h2>
                <BlogList 
                  initialPosts={posts} 
                  totalPosts={totalPosts} 
                  postsPerPage={postsPerPage} 
                  seriesId={seriesItem._id.toString()}
                />
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-10">
                {/* Categories */}
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                        <TagIcon className="w-5 h-5 text-primary-500" />
                        Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat: any) => (
                            <Link 
                                key={cat._id.toString()} 
                                href={`/blog/category/${cat.slug}`}
                                className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] text-sm font-bold text-gray-600 dark:text-neutral-400 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Other Series */}
                {allSeries.length > 1 && (
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm">
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                            <Layers className="w-5 h-5 text-primary-500" />
                            More Series
                        </h3>
                        <div className="space-y-4">
                            {allSeries.filter((s: any) => s.slug !== slug).map((s: any) => (
                                <Link 
                                    key={s._id.toString()} 
                                    href={`/blog/series/${s.slug}`}
                                    className="block p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] hover:border-primary-500/30 transition-all group/series"
                                >
                                    <h4 className="font-bold text-gray-900 dark:text-white group-hover/series:text-primary-500 transition-colors uppercase tracking-tight text-sm mb-1">{s.title}</h4>
                                    <p className="text-[12px] text-gray-500 font-medium line-clamp-1">{s.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
