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

export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-dynamic"; // Skip static generation during build

const blogBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://www.masofts.com" },
  { name: "Blog", url: "https://www.masofts.com/blog" },
]);

export default async function BlogPage() {
  await dbConnect();
  const rawPosts = await PostModel.find({ published: true }).sort({ createdAt: -1 }).lean();
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

      {/* Blog Grid - Handled by Client Component for Animations */}
      <BlogList initialPosts={posts} />
    </main>
  );
}
