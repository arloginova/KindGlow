'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/Catalog/ProductCard';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
    'ВСЕ ТОВАРЫ',
    'ДЛЯ ЛИЦА',
    'РУМЯНА',
    'ГЛАЗА',
    'ГУБЫ',
    'КИСТИ И СПОНЖИ'
];

export default function CatalogPage() {
    const [activeCategory, setActiveCategory] = useState('ВСЕ ТОВАРЫ');

    const filteredProducts = activeCategory === 'ВСЕ ТОВАРЫ'
        ? products
        : products.filter(p => {
            const cat = p.category.toLowerCase();
            if (activeCategory === 'ДЛЯ ЛИЦА' && cat === 'лицо') return true;
            return cat === activeCategory.toLowerCase();
        });

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1440px] mx-auto px-2 md:px-4 lg:px-5 py-8 lg:py-12">

                {/* Заголовок (виден на iPad и Mobile) */}
                <h1 className="text-[30px] lg:text-[50px] font-tan-pearl text-black uppercase mb-8 lg:block">
                    КАТАЛОГ
                </h1>

                {/* Навигация по категориям */}
                <div className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 lg:gap-10 mb-8 md:mb-12  pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[14px] lg:text-[16px] font-mormal tracking-tight whitespace-nowrap transition-colors hover:text-brand-purple ${activeCategory === cat ? 'text-brand-purple border-b-2 border-brand-purple pb-4 -mb-[18px]' : 'text-black'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Сетка товаров */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-5 grid-flow-dense">
                    {filteredProducts.map((product, index) => {
                        // Логика для десктопа (lg: 3 колонки)
                        // Цикл 10 элементов: 2-й (3-я колонка) и 5-й (1-я колонка) — высокие
                        const isTallLg = index % 10 === 2 || index % 10 === 5;
                        const colStartLg = index % 10 === 2 ? 'lg:col-start-3' : (index % 10 === 5 ? 'lg:col-start-1' : '');

                        // Логика для мобилки (2 колонки)
                        // Цикл 6 элементов: 1-й (2-я колонка) и 3-й (1-я колонка) — высокие
                        const isTallSm = index % 6 === 1 || index % 6 === 3;
                        const colStartSm = index % 6 === 1 ? 'col-start-2' : (index % 6 === 3 ? 'col-start-1' : '');

                        return (
                            <div
                                key={product.id}
                                className={`
                                    ${isTallLg ? 'lg:row-span-2' : ''} 
                                    ${colStartLg}
                                    ${isTallSm ? 'row-span-2' : ''}
                                    ${colStartSm}
                                `}
                            >
                                <ProductCard
                                    product={product}
                                    isTallLg={isTallLg}
                                    isTallSm={isTallSm}
                                />
                            </div>
                        );
                    })}

                    {/* Рекламный баннер (вставляем после 6-го товара или в конце) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-8">
                        <div className="relative w-full h-[200px] lg:h-[350px] bg-[#EBEBFF] rounded-[40px] overflow-hidden flex items-center p-8 lg:p-16">
                            <div className="max-w-[600px] z-10">
                                <h2 className="text-[24px] lg:text-[48px] font-tan-pearl text-black leading-tight mb-6">
                                    НЕ ЗНАЕШЬ КАКОЙ УХОД ПОДОЙДЕТ ТЕБЕ?
                                </h2>
                                <p className="text-[14px] lg:text-[18px] text-black mb-8 max-w-[400px]">
                                    Пройди тест и мы подберем средства, которые подойдут именно тебе
                                </p>
                                <Link
                                    href="/test"
                                    className="inline-flex items-center gap-2 bg-brand-purple text-white px-8 py-4 rounded-full text-[14px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                                >
                                    <span>ПРОЙТИ ТЕСТ</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16663 10H15.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Фоновое изображение для баннера */}
                            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
                                <Image
                                    src="/banner_image.png"
                                    alt="Skincare"
                                    fill
                                    className="object-contain object-right"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
