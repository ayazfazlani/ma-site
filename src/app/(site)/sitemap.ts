import { MetadataRoute } from 'next';
export const revalidate = 3600; // revalidate every hour
import dbConnect from '@/lib/mongodb';
import PostModel from '@/models/Post';
import ProjectModel from '@/models/Project';
import { servicesData } from '@/lib/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://masofts.com';

  // Static routes with priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Static service sub-pages
  const servicePages = [
    'analytics',
    'content',
    'ppc',
    'seo',
    'social-media',
    'web-development',
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic service sub-pages from servicesData (for [slug] routes)
  const dynamicServiceRoutes: MetadataRoute.Sitemap = servicesData
    .filter((s) => !servicePages.includes(s.slug))
    .map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // Dynamic blog posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    await dbConnect();
    const posts = await PostModel.find({ published: true })
      .select('slug updatedAt')
      .lean();
    blogRoutes = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // DB unavailable during build – skip dynamic blog routes
  }

  // Dynamic portfolio projects
  let portfolioRoutes: MetadataRoute.Sitemap = [];
  try {
    await dbConnect();
    const projects = await ProjectModel.find({ active: true })
      .select('slug updatedAt')
      .lean();
    portfolioRoutes = projects.map((project: any) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // DB unavailable during build – skip dynamic portfolio routes
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...dynamicServiceRoutes,
    ...blogRoutes,
    ...portfolioRoutes,
  ];
}
