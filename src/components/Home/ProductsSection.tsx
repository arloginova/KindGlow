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

export function ProductsSection() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [scrollPosition, setScrollPosition] = useState(0);
    const categoryScrollRef = useRef<HTMLDivElement>(null);
    const productScrollRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Фильтруем только квадратные товары (не вытянутые)
    const squareProducts = products.filter(p => !p.isTall);
    
    const filteredProducts = selectedCategory === 'all' 
        ? squareProducts 
        : squareProducts.filter(p => p.category === selectedCategory);

    useEffect(() => {
        const slider = productScrollRef.current;
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
    }, [filteredProducts]);

    return (
        <section className="py-8 md:py-12 xl:py-16">
            {/* Заголовок */}
            <h2 className="text-[24px] md:text-[36px] xl:text-[48px] font-montserrat font-medium text-black uppercase mb-6 md:mb-8 xl:mb-10">
                НАШИ НАХОДКИ
            </h2>

            {/* Категории и кнопка */}
            <div className="flex items-center justify-between mb-6 md:mb-8 xl:mb-10">
                {/* Слайдер категорий */}
                <div 
                    ref={categoryScrollRef}
                    className="flex-1 overflow-x-auto no-scrollbar"
                >
                    <div className="flex gap-4 md:gap-6 xl:gap-8 min-w-max">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`text-[12px] md:text-[14px] xl:text-[16px] font-montserrat uppercase whitespace-nowrap transition-all ${
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
                    className="hidden md:inline-flex items-center gap-2 bg-brand-purple text-white rounded-full px-6 xl:px-5 py-2 xl:py-3 text-[12px] xl:text-[14px] font-regular font-montserrat uppercase tracking-wide hover:opacity-90 transition-all ml-6 flex-shrink-0"
                >
                    <span>СМОТРЕТЬ ВЕСЬ КАТАЛОГ</span>
                    <span className="text-[16px] xl:text-[20px]">&gt;</span>
                </Link>
            </div>

            {/* Слайдер товаров */}
            <div 
                ref={productScrollRef}
                className="overflow-x-auto no-scrollbar pb-4"
            >
                <div className="flex gap-4 md:gap-6 xl:gap-8 min-w-max">
                    {filteredProducts.slice(0, 6).map((product) => (
                        <div 
                            key={product.id} 
                            className="w-[185px] md:w-[320px] xl:w-[453px] flex-shrink-0"
                        >
                            <ProductCard product={product} />
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
