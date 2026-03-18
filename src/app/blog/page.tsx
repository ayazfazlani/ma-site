// app/blog/page.tsx
"use client";

import { motion } from "framer-motion";
import ScrollTray from "../../../components/ScrollTray";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../../../components/ThemeProvider";
import JsonLd from "../../../components/JsonLd";
import { 
  blogPageSchema, 
  getBlogPostingsSchema, 
  getBreadcrumbSchema 
} from "../../../lib/schemas";

const blogBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://medialinkers.pk" },
  { name: "Blog", url: "https://medialinkers.pk/blog" },
]);

const posts = [
  {
    title: "10 SEO Trends to Watch in 2024",
    excerpt: "Stay ahead of the curve with these emerging SEO trends that will shape the digital landscape.",
    category: "SEO",
    author: "Ahmed Khan",
    date: "Mar 5, 2024",
    readTime: "5 min read",
    image: "bg-blue-100",
    imageDark: "bg-blue-500/10",
  },
  {
    title: "The Complete Guide to Social Media Marketing",
    excerpt: "Learn how to build a winning social media strategy that drives engagement and conversions.",
    category: "Social Media",
    author: "Sarah Ali",
    date: "Mar 3, 2024",
    readTime: "8 min read",
    image: "bg-pink-100",
    imageDark: "bg-pink-500/10",
  },
  {
    title: "Content Marketing Strategies That Work",
    excerpt: "Discover proven content marketing tactics to attract and retain your target audience.",
    category: "Content",
    author: "Muhammad Rizwan",
    date: "Mar 1, 2024",
    readTime: "6 min read",
    image: "bg-amber-100",
    imageDark: "bg-amber-500/10",
  },
  {
    title: "PPC Advertising: Maximizing Your ROI",
    excerpt: "Expert tips on optimizing your pay-per-click campaigns for better returns.",
    category: "PPC",
    author: "Ahmed Khan",
    date: "Feb 28, 2024",
    readTime: "7 min read",
    image: "bg-green-100",
    imageDark: "bg-green-500/10",
  },
  {
    title: "Web Design Trends for 2024",
    excerpt: "Modern web design trends that will help your website stand out and convert better.",
    category: "Web Design",
    author: "Sarah Ali",
    date: "Feb 25, 2024",
    readTime: "5 min read",
    image: "bg-purple-100",
    imageDark: "bg-purple-500/10",
  },
  {
    title: "Understanding Google Analytics 4",
    excerpt: "A comprehensive guide to navigating and utilizing GA4 for better insights.",
    category: "Analytics",
    author: "Muhammad Rizwan",
    date: "Feb 22, 2024",
    readTime: "10 min read",
    image: "bg-cyan-100",
    imageDark: "bg-cyan-500/10",
  },
];

export default function BlogPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="pt-20">
      {/* SEO Schemas */}
      <JsonLd data={blogPageSchema} />
      <JsonLd data={getBlogPostingsSchema(posts)} />
      <JsonLd data={blogBreadcrumb} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-900 to-primary-800 py-20 lg:py-32">
        <ScrollTray src="/tray.mp4" className="opacity-20" />
        <div className="container-custom mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Our <span className="gradient-text">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Insights, tips, and strategies for digital marketing success
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className={`section-padding ${isDark ? "bg-dark-950" : "bg-gray-50"}`}>
        <div className="container-custom mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 group ${
                  isDark
                    ? "bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.05]"
                    : "bg-white shadow-lg hover:shadow-2xl"
                }`}
              >
                <div className={`h-48 ${isDark ? post.imageDark : post.image} relative overflow-hidden`}>
                  <div className={`absolute inset-0 flex items-center justify-center ${isDark ? "text-neutral-600" : "text-gray-400"}`}>
                    <span className="text-lg font-medium">Featured Image</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold ${
                      isDark
                        ? "bg-dark-950/70 text-primary-400"
                        : "bg-white/90 text-primary-600"
                    }`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className={`flex items-center space-x-4 text-sm mb-3 ${isDark ? "text-neutral-500" : "text-gray-500"}`}>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                  
                  <h2 className={`text-xl font-bold mb-3 transition-colors line-clamp-2 ${
                    isDark
                      ? "text-white group-hover:text-primary-400"
                      : "text-gray-900 group-hover:text-primary-600"
                  }`}>
                    {post.title}
                  </h2>
                  
                  <p className={`mb-4 line-clamp-2 ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                    {post.excerpt}
                  </p>
                  
                  <div className={`flex items-center justify-between pt-4 border-t ${isDark ? "border-white/[0.06]" : "border-gray-100"}`}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDark ? "bg-primary-500/15" : "bg-primary-100"
                      }`}>
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className={`text-sm font-medium ${isDark ? "text-neutral-300" : "text-gray-700"}`}>{post.author}</span>
                    </div>
                    
                    <Link
                      href="#"
                      className="inline-flex items-center text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}