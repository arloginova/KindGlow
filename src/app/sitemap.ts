import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { products } from '@/data/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kind-glow.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const staticRoutes = [
        '',
        '/products',
        '/blog',
        '/test',
        '/test/results',
        '/tutorials',
        '/faq',
        '/rules',
    ];

    const staticEntries = staticRoutes.map((route) => ({
        url: new URL(route, siteUrl).toString(),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.7,
    }));

    const articleEntries = articles.map((article) => ({
        url: new URL(`/blog/${article.id}`, siteUrl).toString(),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const productEntries = products.map((product) => ({
        url: new URL(`/products/${product.id}`, siteUrl).toString(),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticEntries, ...articleEntries, ...productEntries];
}
