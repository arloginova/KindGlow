'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { ProductCard } from '@/components/Catalog/ProductCard';

const categories = [
    { id: 'all', name: 'ВСЕ ТОВАРЫ' },
    { id: 'лицо', name: 'ДЛЯ ЛИЦА' },
    { id: 'румяна', name: 'РУМЯНА' },
    { id: 'глаза', name: 'ГЛАЗА' },
    { id: 'губы', name: 'ГУБЫ' },
    { id: 'кисти и спонжи', name: 'КИСТИ И СПОНЖИ' }
];

const getThumbWidth = (viewportWidth: number) => {
    if (viewportWidth >= 1280) return 233;
    if (viewportWidth >= 1024) return 165;
    return 63;
};

export function ProductsSection() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartScroll, setDragStartScroll] = useState(0);
    const [thumbWidth, setThumbWidth] = useState(63);
    const categoryScrollRef = useRef<HTMLDivElement>(null);
    const productScrollRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    const squareProducts = products.filter(p => !p.isTall);
    
    const filteredProducts = selectedCategory === 'all' 
        ? squareProducts 
        : squareProducts.filter(p => p.category === selectedCategory);

    useEffect(() => {
        const updateThumbWidth = () => {
            setThumbWidth(getThumbWidth(window.innerWidth));
        };

        updateThumbWidth();
        window.addEventListener('resize', updateThumbWidth);

        return () => window.removeEventListener('resize', updateThumbWidth);
    }, []);

    useEffect(() => {
        const slider = productScrollRef.current;
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
    }, [filteredProducts, isDragging, thumbWidth]);

    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragStartScroll(productScrollRef.current?.scrollLeft || 0);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !productScrollRef.current || !trackRef.current) return;

            const deltaX = e.clientX - dragStartX;
            const trackWidth = trackRef.current.clientWidth - thumbWidth;
            const scrollWidth = productScrollRef.current.scrollWidth - productScrollRef.current.clientWidth;
            
            const scrollDelta = (deltaX / trackWidth) * scrollWidth;
            productScrollRef.current.scrollLeft = dragStartScroll + scrollDelta;
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
        <section className="py-7.25 lg:py-[56px] xl:py-[76px]">
            {/* Заголовок */}
            <h2 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase mb-6.25 lg:mb-9.75 xl:mb-14.5">
                Наши находки
            </h2>

            {/* Категории и кнопка */}
            <div className="flex items-center justify-between mb-6.5 lg:mb-10 xl:mb-14">
                {/* Слайдер категорий */}
                <div 
                    ref={categoryScrollRef}
                    className="flex-1 overflow-x-auto no-scrollbar"
                >
                    <div className="flex gap-5.25 lg:gap-6 xl:gap-8.25 min-w-max">
                        {categories.map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat uppercase whitespace-nowrap transition-all cursor-pointer ${
                                    index === 0 ? 'mr-6 md:mr-16 xl:mr-25.25' : ''
                                } ${
                                    selectedCategory === category.id
                                        ? 'text-black font-medium'
                                        : 'text-gray-400 font-normal hover:text-gray-600'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Кнопка "Смотреть весь каталог" - скрыта на мобиле */}
                <Link
                    href="/products"
                    className="hidden lg:inline-flex items-center gap-1 bg-brand-purple text-white rounded-full pl-2.75 xl:pl-4.5 pr-1.75 xl:pr-2.25 py-2.75 xl:py-3.5 text-[10px] xl:text-[14px] font-regular font-montserrat uppercase hover:opacity-90 transition-all ml-6 flex-shrink-0"
                >
                    <span>СМОТРЕТЬ ВЕСЬ КАТАЛОГ</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-4 h-4 xl:w-5 xl:h-5">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>
            </div>

            {/* Слайдер товаров */}
            <div 
                ref={productScrollRef}
                className="overflow-x-auto no-scrollbar pb-[20px]"
            >
                <div className="flex gap-2 lg:gap-4 xl:gap-5 min-w-max">
                    {filteredProducts.slice(0, 6).map((product) => (
                        <div 
                            key={product.id} 
                            className="w-[184px] lg:w-[320px] xl:w-[453px] flex-shrink-0"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Индикатор скролла */}
            <div ref={trackRef} className="relative lg:mt-[11.5px] xl:mt-6">
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
