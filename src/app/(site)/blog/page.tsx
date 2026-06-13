// app/blog/page.tsx
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import ScrollTray from "@/components/ScrollTray";
import JsonLd from "@/components/JsonLd";
import {
  blogPageSchema,
  getBlogPostingsSchema,
  getBreadcrumbSchema
} from "@/lib/schemas";
import BlogList from "./_components/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Insights on Custom Software & Development",
  description: "Read the latest articles, tutorials, and strategy guides on custom software, ERP systems, SaaS development, and digital transformation by MA Softs.",
  alternates: {
    canonical: "https://masofts.com/blog",
  },
};


export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-dynamic"; // Skip static generation during build

const blogBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
  { name: "Blog", url: "https://masofts.com/blog" },
]);

import CategoryModel from "@/models/Category";
import SeriesModel from "@/models/Series";
import { Search as SearchIcon, Tag as TagIcon, Layers } from "lucide-react";
import Link from "next/link";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: searchQuery } = await searchParams;
  await dbConnect();
  
  const [rawPosts, categories, series] = await Promise.all([
    PostModel.find({ published: true }).sort({ createdAt: -1 }).lean(),
    CategoryModel.find({}).sort({ name: 1 }).lean(),
    SeriesModel.find({ active: true }).sort({ order: 1 }).lean(),
  ]);

  type DbPost = {
    _id?: { toString(): string } | null;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    author: string | null;
    createdAt: Date;
    readTime: string | null;
    image: string | null;
    date?: Date;
  };
  type DbLeanPost = DbPost & Record<string, unknown>;
  const posts = rawPosts.map((p: DbLeanPost) => ({
    ...p,
    _id: undefined,
    id: p._id?.toString() ?? p.slug,
  }));

  // Fallback for SEO schema if DB is empty
  type BlogPostingSeoPost = Parameters<typeof getBlogPostingsSchema>[0][number];
  const seoPosts: BlogPostingSeoPost[] =
    posts.length > 0
      ? posts.map((p) => ({
        title: p.title,
        excerpt: p.excerpt ?? "",
        category: p.category ?? "General",
        author: p.author ?? "Ayaz",
        date: p.date ? p.date.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        readTime: p.readTime ?? "5 min",
      }))
      : [];

  return (
    <main className="pt-20">
      {/* SEO Schemas */}
      <JsonLd data={blogPageSchema} />
      <JsonLd data={getBlogPostingsSchema(seoPosts)} />
      <JsonLd data={blogBreadcrumb} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-900 to-primary-800 py-20 lg:py-32">
        <ScrollTray src="/tray.mp4" className="opacity-20" />
        <div className="container-custom mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            Insights, tips, and strategies for software development success
          </p>
        </div>
      </section>

      {/* Blog Content with Sidebar */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-950">
        <div className="container-custom mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
               <BlogList initialPosts={posts} initialSearch={searchQuery} />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                        <SearchIcon className="w-5 h-5 text-primary-500" />
                        Quick Find
                    </h3>
                    <p className="text-[12px] text-gray-500 dark:text-neutral-500 font-medium mb-4 leading-relaxed">
                        Looking for something specific? Start typing to filter the articles.
                    </p>
                    <div className="text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-500/5 px-4 py-2 rounded-xl border border-primary-500/10 inline-block">
                        Search in {posts.length} Articles
                    </div>
                </div>

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

                {/* Learning Series */}
                {series.length > 0 && (
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm">
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                            <Layers className="w-5 h-5 text-primary-500" />
                            Featured Series
                        </h3>
                        <div className="space-y-4">
                            {series.map((s: any) => (
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
