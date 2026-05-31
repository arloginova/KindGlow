import type { Metadata } from 'next';
import { articles } from '@/data/articles';

type BlogArticleLayoutProps = {
    children: React.ReactNode;
    params: Promise<{
        id: string;
    }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kind-glow.vercel.app';

export async function generateMetadata({ params }: BlogArticleLayoutProps): Promise<Metadata> {
    const { id } = await params;
    const article = articles.find((item) => item.id === id);

    if (!article) {
        return {
            title: 'Статья не найдена | KindGlow',
            description: 'Такой статьи нет на KindGlow.',
        };
    }

    const title = `${article.title} | KindGlow`;
    const url = new URL(`/blog/${article.id}`, siteUrl);
    const imageUrl = article.squareImage
        ? new URL(article.squareImage, siteUrl)
        : new URL('/logo_mobile.svg', siteUrl);

    return {
        title,
        description: article.description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description: article.description,
            url,
            siteName: 'KindGlow',
            type: 'article',
            locale: 'ru_RU',
            images: [
                {
                    url: imageUrl,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: article.description,
            images: [imageUrl],
        },
    };
}

export default function BlogArticleLayout({ children }: BlogArticleLayoutProps) {
    return children;
}
