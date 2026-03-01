'use client';

import { useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect, Suspense } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/Catalog/ProductCard';
import Link from 'next/link';

function TestResultsContent() {
    const searchParams = useSearchParams();
    const indicesParam = searchParams.get('indices');
    const sliderRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartScroll, setDragStartScroll] = useState(0);
    
    useEffect(() => {
        const slider = sliderRef.current;
        const track = trackRef.current;
        if (!slider || !track) return;

        const handleScroll = () => {
            if (isDragging) return; // Не обновляем при перетаскивании
            const scrollLeft = slider.scrollLeft;
            const scrollWidth = slider.scrollWidth - slider.clientWidth;
            const trackWidth = track.clientWidth - 233;
            
            const position = scrollWidth > 0 ? (scrollLeft / scrollWidth) * trackWidth : 0;
            setScrollPosition(position);
        };

        slider.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => slider.removeEventListener('scroll', handleScroll);
    }, [isDragging]);

    // Обработка перетаскивания thumb
    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragStartScroll(sliderRef.current?.scrollLeft || 0);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !sliderRef.current || !trackRef.current) return;

            const deltaX = e.clientX - dragStartX;
            const trackWidth = trackRef.current.clientWidth - 233;
            const scrollWidth = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
            
            const scrollDelta = (deltaX / trackWidth) * scrollWidth;
            sliderRef.current.scrollLeft = dragStartScroll + scrollDelta;
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
    
    if (!indicesParam) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <p>Результаты не найдены</p>
            </main>
        );
    }

    const productIndices = indicesParam.split(',').map(Number);
    const faceProducts = products.filter(p => p.category === 'лицо');
    const recommendedProducts = productIndices
        .map(index => faceProducts[index - 1])
        .filter(Boolean);

    return (
        <main className="bg-white">
            <div className="max-w-[1440px] mx-auto px-2 md:px-6 lg:px-5 py-8 lg:py-5">
                
                {/* Заголовок и кнопка */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8 mb-8 md:mb-12 lg:mb-12">
                    {/* Левая часть: заголовок и описание */}
                    <div className="flex-1">
                        <h1 className="text-[18px] md:text-[35px] lg:text-[50px] font-montserrat font-medium text-black uppercase leading-tight mb-1 md:mb-1">
                            РЕЗУЛЬТАТ ТЕСТА
                        </h1>
                        <p className="text-[8px] md:text-[12px] lg:text-[16px] text-black font-montserrat font-normal leading-relaxed max-w-[600px]">
                            Надеемся, что эти средства заинтересуют тебя.<br />
                            Мы подобрали их исходя из твоих запросов
                        </p>
                    </div>
                    
                    {/* Правая часть: кнопка */}
                    <div className="flex items-start gap-3 md:gap-4 flex-shrink-0 mt-2 md:mt-3 lg:mt-4">
                        <Link
                            href="/test"
                            className="inline-flex items-center gap-2 bg-white border border-brand-purple rounded-full px-4 md:px-8 lg:px-10 py-2.5 md:py-4 text-[8px] md:text-[14px] lg:text-[16px] text-brand-purple font-medium font-montserrat uppercase tracking-wide hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all whitespace-nowrap group"
                        >
                            <span>ПРОЙТИ ТЕСТ ЗАНОВО</span>
                            <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 16 16" 
                                fill="none" 
                                className="w-3 h-3 md:w-4 md:h-4"
                            >
                                <path 
                                    d="M4 12L12 4M12 4H6M12 4V10" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Сетка с продуктами (Mobile и iPad) */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:hidden gap-2 md:gap-4">
                    {recommendedProducts.map((product) => (
                        <div key={`grid-${product.id}`}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Слайдер с продуктами (Desktop) */}
                <div 
                    ref={sliderRef}
                    className="hidden xl:block overflow-x-auto no-scrollbar pb-10"
                >
                    <div className="flex gap-5 min-w-max">
                        {recommendedProducts.map((product) => (
                            <div 
                                key={`slider-${product.id}`} 
                                className="w-[453px] flex-shrink-0"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Скролл-полоска (только для Desktop) */}
                <div ref={trackRef} className="hidden xl:block relative mb-16">
                    <div className="w-full h-[4px] bg-[#E1E5FB] rounded-full" />
                    <div 
                        ref={thumbRef}
                        className="absolute top-0 h-[4px] bg-black rounded-full transition-all duration-200 z-10 cursor-grab active:cursor-grabbing"
                        style={{ 
                            width: '233px',
                            left: `${scrollPosition}px`
                        }}
                        onMouseDown={handleThumbMouseDown}
                    />
                </div>

            </div>
        </main>
    );
}

export default function TestResultsPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-white flex items-center justify-center">
                <p>Загрузка результатов...</p>
            </main>
        }>
            <TestResultsContent />
        </Suspense>
    );
}
