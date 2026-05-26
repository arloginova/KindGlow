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
            <div className="max-w-[1440px] mx-auto px-2 lg:px-4 xl:px-5 mt-6.75 lg:mt-3 xl:mt-8 mb-6.75 lg:mb-15">
                
                {/* Заголовок и кнопка */}
                <div className="flex flex-row items-start justify-between gap-3 lg:gap-8 mb-6 lg:mb-8.25 xl:mb-14">
                    {/* Левая часть: заголовок и описание */}
                    <div className="flex-1">
                        <h1 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase xl:leading-0 mb-1.25 lg:mb-1 xl:mb-9">
                            РЕЗУЛЬТАТ ТЕСТА
                        </h1>
                        <p className="text-[9px] lg:text-[12px] xl:text-[16px] text-black font-montserrat font-normal leading-2.5 lg:leading-3.5 xl:leading-5 max-w-[600px]">
                            Надеемся, что эти средства заинтересуют тебя.<br />
                            Мы подобрали их исходя из твоих запросов
                        </p>
                    </div>
                    
                    {/* Правая часть: кнопка */}
                    <div className="flex items-start gap-3 md:gap-4 flex-shrink-0 mt-2.75 md:mt-3 lg:mt-5.25 xl:mt-0">

                        <Link
                            href="/test"
                            className="shrink-0 inline-flex items-center whitespace-nowrap leading-none gap-1.75 lg:gap-2 xl:gap-3 border-[0.5px] lg:border border-brand-purple text-brand-purple rounded-full px-1.75 lg:px-3.25 xl:px-4 py-1.75 lg:py-3.25 xl:py-4.25 text-[8px] lg:text-[13px] xl:text-[16px] font-montserrat uppercase hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all"
                        >
                            <span className="leading-none">ПРОЙТИ ТЕСТ ЗАНОВО</span>
    
                            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className="w-1.25 lg:w-1.75 xl:w-2.25 h-1.25 lg:h-1.75 xl:h-2.25">
                                <path d="M0.248057 0.24999H4.20507M4.20507 0.24999V4.207M4.20507 0.24999L0.248057 4.207" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
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
