'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/Blog/ArticleCard';

const getThumbWidth = (viewportWidth: number) => {
    if (viewportWidth >= 1280) return 233;
    if (viewportWidth >= 1024) return 165;
    return 63;
};

export function ArticlesSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartScroll, setDragStartScroll] = useState(0);
    const [thumbWidth, setThumbWidth] = useState(63);

    const featuredArticles = articles.slice(0, 6);

    useEffect(() => {
        const updateThumbWidth = () => {
            setThumbWidth(getThumbWidth(window.innerWidth));
        };

        updateThumbWidth();
        window.addEventListener('resize', updateThumbWidth);

        return () => window.removeEventListener('resize', updateThumbWidth);
    }, []);

    useEffect(() => {
        const slider = scrollRef.current;
        const track = trackRef.current;
        if (!slider || !track) return;

        const handleScroll = () => {
            if (isDragging) return;
            const scrollLeft = slider.scrollLeft;
            const scrollWidth = slider.scrollWidth - slider.clientWidth;
            const trackWidth = track.clientWidth - thumbWidth;
            
            const position = scrollWidth > 0 ? (scrollLeft / scrollWidth) * trackWidth : 0;
            setScrollPosition(position);
        };

        slider.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => slider.removeEventListener('scroll', handleScroll);
    }, [featuredArticles, isDragging, thumbWidth]);

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
            const trackWidth = trackRef.current.clientWidth - thumbWidth;
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
    }, [isDragging, dragStartX, dragStartScroll, thumbWidth]);

    return (
        <section className="pt-10 lg:pt-29 xl:pt-32.5">
            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-[22.5px] lg:mb-[35px] xl:mb-12.25">
                <h2 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase">
                    СТАТЬИ
                </h2>
                <Link
                    href="/blog"
                    className="hidden lg:inline-flex items-center gap-1 bg-brand-purple text-white rounded-full pl-2.75 xl:pl-4.5 pr-1.75 xl:pr-2.25 py-2.75 xl:py-3.5 text-[10px] xl:text-[14px] font-regular font-montserrat uppercase hover:opacity-90 transition-all ml-6 flex-shrink-0">
                    <span>СМОТРЕТЬ ВСЁ</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-4 h-4 xl:w-5 xl:h-5">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>
            </div>

            {/* Слайдер статей */}
            <div 
                ref={scrollRef}
                className="overflow-x-auto no-scrollbar pb-5"
            >
                <div className="flex gap-2 lg:gap-4 xl:gap-5 min-w-max">
                    {featuredArticles.map((article) => (
                        <div 
                            key={article.id}
                            className="w-[184px] lg:w-[320px] xl:w-[453px] flex-shrink-0"
                        >
                            <ArticleCard article={article} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Индикатор скролла */}
            <div ref={trackRef} className="relative lg:mt-[13.5px] xl:mt-6">
                <div className="w-full h-[2px] lg:h-[3px] xl:h-[5px] bg-[#E1E5FB] rounded-full" />
                <div 
                    ref={thumbRef}
                    className="absolute top-0 h-[2px] lg:h-[3px] xl:h-[5px] bg-black rounded-full transition-all duration-200 cursor-grab active:cursor-grabbing"
                    style={{ 
                        width: `${thumbWidth}px`,
                        left: `${scrollPosition}px`
                    }}
                    onMouseDown={handleThumbMouseDown}
                />
            </div>
        </section>
    );
}
