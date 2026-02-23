'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/Blog/ArticleCard';

export function ArticlesSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Берем первые 6 статей для главной страницы
    const featuredArticles = articles.slice(0, 6);

    useEffect(() => {
        const slider = scrollRef.current;
        const track = trackRef.current;
        if (!slider || !track) return;

        const handleScroll = () => {
            const scrollLeft = slider.scrollLeft;
            const scrollWidth = slider.scrollWidth - slider.clientWidth;
            const trackWidth = track.clientWidth - 100; // Ширина трека минус ширина thumb
            
            const position = scrollWidth > 0 ? (scrollLeft / scrollWidth) * trackWidth : 0;
            setScrollPosition(position);
        };

        slider.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => slider.removeEventListener('scroll', handleScroll);
    }, [featuredArticles]);

    return (
        <section className="py-8 md:py-12 xl:py-16">
            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-6 md:mb-8 xl:mb-10">
                <h2 className="text-[24px] md:text-[36px] xl:text-[48px] font-montserrat font-medium text-black uppercase">
                    СТАТЬИ
                </h2>

                <Link
                    href="/blog"
                    className="hidden md:inline-flex items-center gap-2 bg-brand-purple text-white rounded-full px-6 xl:px-5 py-2 xl:py-3 text-[12px] xl:text-[14px] font-regular font-montserrat uppercase tracking-wide hover:opacity-90 transition-all ml-6 flex-shrink-0"
                >
                    <span>СМОТРЕТЬ ВСЁ</span>
                    <span className="text-[16px] xl:text-[20px]">&gt;</span>
                </Link>
            </div>

            {/* Слайдер статей */}
            <div 
                ref={scrollRef}
                className="overflow-x-auto no-scrollbar pb-4"
            >
                <div className="flex gap-4 md:gap-6 xl:gap-8 min-w-max">
                    {featuredArticles.map((article) => (
                        <div 
                            key={article.id}
                            className="w-[185px] md:w-[320px] xl:w-[453px] flex-shrink-0"
                        >
                            <ArticleCard article={article} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Индикатор скролла */}
            <div ref={trackRef} className="relative mt-6 md:mt-8 xl:mt-10">
                <div className="w-full h-[4px] bg-[#E1E5FB] rounded-full" />
                <div 
                    className="absolute top-0 h-[4px] bg-black rounded-full transition-all duration-200"
                    style={{ 
                        width: '100px',
                        left: `${scrollPosition}px`
                    }}
                />
            </div>
        </section>
    );
}
