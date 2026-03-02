'use client';

import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/Blog/ArticleCard';
import { useRef } from 'react';

const CATEGORIES = [
    { key: 'об осознанности', label: 'ОБ ОСОЗНАННОСТИ' },
    { key: 'бренды', label: 'БРЕНДЫ' },
    { key: 'отечественный подход', label: 'ОТЕЧЕСТВЕННЫЙ ПОДХОД' },
] as const;

export default function BlogPage() {
    const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

    return (
        <main className="bg-white">
            <div className="max-w-[1440px] mx-auto px-2 md:px-4 xl:px-5 py-8 md:py-8 xl:py-12">

                {/* Секции по категориям */}
                {CATEGORIES.map(({ key, label }, index) => {
                    const categoryArticles = articles.filter(a => a.category === key);
                    const isLast = index === CATEGORIES.length - 1;

                    return (
                        <section key={key} className={isLast ? '' : 'mb-5 md:mb-12 xl:mb-16'}>
                            <h2 className="text-[18px] xl:text-[40px] font-montserrat font-medium text-black uppercase mb-3 md:mb-6 xl:mb-8 font-montserrat">
                                {label}
                            </h2>

                            {/* Десктоп и планшет: сетка 3 колонки */}
                            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                                {categoryArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>

                            {/* Мобильный: горизонтальный слайдер, 2 карточки на экране */}
                            <div
                                ref={(el) => { sliderRefs.current[key] = el; }}
                                className="md:hidden flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
                                style={{ scrollPaddingLeft: '8px' }}
                            >
                                {categoryArticles.map((article) => (
                                    <div
                                        key={article.id}
                                        className="snap-start flex-shrink-0"
                                        style={{ width: 'calc(50vw - 14px)' }}
                                    >
                                        <MobileArticleCard article={article} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}

/* ─── Мобильная карточка (компактная) ─────────────────────────────── */

import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';

const badgeColors: Record<string, string> = {
    'vegan': 'text-[#6B7F5E]',
    'cruelty-free': 'text-[#7B6B8F]',
    'zero-waste': 'text-[#5E7A7A]',
};

function MobileArticleCard({ article }: { article: Article }) {
    return (
        <Link href={`/blog/${article.id}`} className="block group">
            <div className="relative overflow-hidden rounded-[12px] w-full" style={{ aspectRatio: '453/273' }}>
                {/* Фон */}
                <div className="absolute inset-0">
                    {article.backgroundImage ? (
                        <Image
                            src={article.backgroundImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E8E0F0] via-[#D4C8E8] to-[#C8D8E8]" />
                    )}
                </div>

                {/* Затемнение */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />

                {/* Бейджи */}
                <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
                    {article.badges.map((badge) => (
                        <span
                            key={badge}
                            className="text-[8px] font-regular font-montserrat leading-tight bg-white px-1.5 py-0.5 rounded-full"
                        >
                            #{badge}
                        </span>
                    ))}
                </div>

                {/* Квадратная картинка */}
                <div className="absolute top-2 right-2 w-[53px] h-[53px] rounded-[7px] overflow-hidden shadow">
                    {article.squareImage ? (
                        <Image src={article.squareImage} alt="" fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#D4C8E8] to-[#C8D8E8]" />
                    )}
                </div>

                {/* Контент */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5">

                    <h3 className="text-[9px] font-bold text-black font-montserrat leading-tight line-clamp-2 mb-0.5">
                        {article.title}
                    </h3>
                    <p className="text-[8px] text-gray-600 font-montserrat line-clamp-1">
                        {article.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
