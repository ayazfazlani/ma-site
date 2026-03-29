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

const blogBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://ma-softs.com" },
  { name: "Blog", url: "https://ma-softs.com/blog" },
]);

export default async function BlogPage() {
  await dbConnect();
  const rawPosts = await PostModel.find({ published: true }).sort({ createdAt: -1 }).lean();
  const posts = rawPosts.map((p: any) => ({ ...p, _id: undefined, id: p._id?.toString() }));

  // Fallback for SEO schema if DB is empty
  const seoPosts = posts.length > 0 ? posts : [];

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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
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
