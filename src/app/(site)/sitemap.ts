import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ma-site-nu.vercel.app';
  
  const routes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/services',
    '/services/analytics',
    '/services/content',
    '/services/ppc',
    '/services/seo',
    '/services/social-media',
    '/services/web-development',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
