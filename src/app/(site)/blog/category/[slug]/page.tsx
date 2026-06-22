// src/app/(site)/blog/category/[slug]/page.tsx
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import CategoryModel from "@/models/Category";
import SeriesModel from "@/models/Series";
import BlogList from "../../_components/BlogList";
import { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, Tag as TagIcon, Layers, ChevronLeft } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schemas";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const category = await CategoryModel.findOne({ slug }).lean() as any;

  if (!category) return { title: "Category Not Found" };

  return {
    title: category.metaTitle || `${category.name} – MA Softs Blog`,
    description: category.metaDesc || category.description || `Read the latest articles about ${category.name} on the MA Softs blog.`,
    alternates: {
      canonical: `https://masofts.com/blog/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  
  const category = await CategoryModel.findOne({ slug }).lean() as any;
  if (!category) return notFound();

  const postsPerPage = 6;
  const [rawPosts, categories, series, totalPosts] = await Promise.all([
    PostModel.find({ published: true, category: category.name }).sort({ createdAt: -1 }).limit(postsPerPage).lean(),
    CategoryModel.find({}).sort({ name: 1 }).lean(),
    SeriesModel.find({ active: true }).sort({ order: 1 }).lean(),
    PostModel.countDocuments({ published: true, category: category.name }),
  ]);

  const posts = rawPosts.map((p: any) => ({
    ...p,
    _id: undefined,
    id: p._id?.toString() ?? p.slug,
  }));

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://masofts.com" },
    { name: "Blog", url: "https://masofts.com/blog" },
    { name: category.name, url: `https://masofts.com/blog/category/${slug}` },
  ]);

  return (
    <main className="pt-20">
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dark-950 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-primary-500)_0%,_transparent_70%)]" />
        <div className="container-custom mx-auto px-4 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary-500 transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: category.color + "20", color: category.color, border: `1px solid ${category.color}30` }}
            >
              <TagIcon className="w-6 h-6" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] text-primary-500">Category</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-400 max-w-3xl font-medium leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-50 dark:bg-dark-950">
        <div className="container-custom mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Showing <span className="text-primary-500">{posts.length}</span> articles
                </h2>
              </div>
              <BlogList 
                initialPosts={posts} 
                totalPosts={totalPosts} 
                postsPerPage={postsPerPage} 
                category={category.name}
              />
            </div>

            <aside className="lg:col-span-4 space-y-10">
                {/* Search */}
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                        <SearchIcon className="w-5 h-5 text-primary-500" />
                        Search
                    </h3>
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Find an article..." 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                        <TagIcon className="w-5 h-5 text-primary-500" />
                        All Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat: any) => (
                            <Link 
                                key={cat._id.toString()} 
                                href={`/blog/category/${cat.slug}`}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                                    cat.slug === slug 
                                        ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/20" 
                                        : "bg-gray-50 dark:bg-white/[0.03] border-gray-100 dark:border-white/[0.05] text-gray-600 dark:text-neutral-400 hover:bg-white dark:hover:bg-white/10 hover:border-primary-500/30"
                                )}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Learning Series */}
                {series.length > 0 && (
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3 w-full">
                            <Layers className="w-5 h-5 text-primary-500" />
                            Featured Series
                        </h3>
                        <div className="space-y-4 w-full">
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

// Ensure cn utility is available or imported from utils
import { cn } from "@/lib/utils";
