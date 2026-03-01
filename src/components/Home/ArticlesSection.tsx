'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/Blog/ArticleCard';

export function ArticlesSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartScroll, setDragStartScroll] = useState(0);

    const featuredArticles = articles.slice(0, 6);

    useEffect(() => {
        const slider = scrollRef.current;
        const track = trackRef.current;
        if (!slider || !track) return;

        const handleScroll = () => {
            if (isDragging) return;
            const scrollLeft = slider.scrollLeft;
            const scrollWidth = slider.scrollWidth - slider.clientWidth;
            const trackWidth = track.clientWidth - 100;
            
            const position = scrollWidth > 0 ? (scrollLeft / scrollWidth) * trackWidth : 0;
            setScrollPosition(position);
        };

        slider.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => slider.removeEventListener('scroll', handleScroll);
    }, [featuredArticles, isDragging]);

    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragStartScroll(scrollRef.current?.scrollLeft || 0);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !scrollRef.current || !trackRef.current) return;

            const deltaX = e.clientX - dragStartX;
            const trackWidth = trackRef.current.clientWidth - 100;
            const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
            
            const scrollDelta = (deltaX / trackWidth) * scrollWidth;
            scrollRef.current.scrollLeft = dragStartScroll + scrollDelta;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStartX, dragStartScroll]);

    return (
        <section className="py-8 md:py-[60px] xl:py-[76px]">
            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-6 md:mb-8 xl:mb-10">
                <h2 className="text-[24px] md:text-[36px] xl:text-[48px] font-montserrat font-medium text-black uppercase">
                    СТАТЬИ
                </h2>

                <Link
                    href="/blog"
                   className="hidden md:inline-flex items-center gap-2 bg-brand-purple text-white rounded-full px-5 py-3 text-[14px] font-regular font-montserrat uppercase tracking-wide hover:opacity-90 transition-all ml-6 flex-shrink-0"
                >
                    <span>СМОТРЕТЬ ВСЁ</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                    ref={thumbRef}
                    className="absolute top-0 h-[4px] bg-black rounded-full transition-all duration-200 cursor-grab active:cursor-grabbing"
                    style={{ 
                        width: '100px',
                        left: `${scrollPosition}px`
                    }}
                    onMouseDown={handleThumbMouseDown}
                />
            </div>
        </section>
    );
}
