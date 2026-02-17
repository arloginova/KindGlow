'use client';

import { use } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/Catalog/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find((p) => p.id === id);
    const [activeTab, setActiveTab] = useState<'application' | 'composition' | 'brand'>('application');

    const recommendedProducts = useMemo(() => {
        return products
            .filter((p) => p.id !== id && !p.isTall)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-tan-pearl uppercase">Товар не найден</h1>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1440px] mx-auto px-2 md:px-4 lg:px-5 py-6">

                {/* Хлебные крошки */}
                <nav className="flex items-center gap-2 text-[12px] lg:text-[18px] uppercase tracking-widest mb-6 lg:mb-10 font-montserrat">
                    <Link href="/products" className="text-black hover:text-black transition-colors">КАТАЛОГ</Link>
                    <span className="text-black">&gt;</span>
                    <span className="text-black font-regular uppercase">{product.category}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start">

                    {/* Мобильный заголовок (над фото) */}
                    <div className="lg:hidden mb-0">
                        <h1 className="text-[18px] lg:text-[32px] font-montserrat font-medium text-black uppercase leading-tight mb-1">
                            {product.name}
                        </h1>
                        <p className="text-[10px] text-black font-montserrat leading-relaxed">
                            {product.shortDescription}
                        </p>
                    </div>

                    {/* Фото продукта */}
                    <div className="relative aspect-square w-full bg-[#F3F3F7] rounded-[40px] overflow-hidden">
                        {/* Desktop Image */}
                        <div className="hidden xl:block relative w-full h-full">
                            <Image
                                src={product.largeImages?.desktop || product.images.desktop}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Tablet Image */}
                        <div className="hidden lg:block xl:hidden relative w-full h-full">
                            <Image
                                src={product.largeImages?.tablet || product.images.tablet}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Mobile Image */}
                        <div className="lg:hidden relative w-full h-full">
                            <Image
                                src={product.largeImages?.mobile || product.images.mobile}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Информация о продукте (Правая колонка) */}
                    <div className="flex flex-col xl:pt-8 md:pt-2">
                        {/* Десктопный заголовок */}
                        <div className="hidden lg:block mb-8">
                            <h1 className="text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-tight mb-5">
                                {product.name}
                            </h1>
                            <div className="text-[35px] xl:text-[50px] font-medium font-montserrat md:mb-[145px] xl:mb-55">
                                {product.price.toLocaleString()} Р
                            </div>
                        </div>

                        {/* Бейджи */}
                        <div className="flex flex-wrap gap-3 mb-4 lg:mb-8">
                            {product.badges.map((badge) => (
                                <span
                                    key={badge}
                                    className="px-2 md:px-3 xl:px-4 py-0.5 rounded-full border border-black text-[8px] md:text-[12px] xl:text-[16px] font-medium normal-case font-montserrat"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* Мобильная цена (после бейджей) */}
                        <div className="lg:hidden text-[18px] font-medium font-montserrat mb-8">
                            {product.price.toLocaleString()} Р
                        </div>

                        {/* Краткое описание (Десктоп) */}
                        <div className="hidden lg:block mb-7">
                            <h2 className="text-[12px] xl:text-[14px] font-bold uppercase tracking-widest mb-4 font-montserrat">
                                Описание продукта
                            </h2>
                            <p className="text-[12px] xl:text-[16px] text-black font-montserrat leading-relaxed">
                                {product.shortDescription}
                            </p>
                        </div>

                        {/* Кнопка Перейти (Десктоп и Планшет) */}
                        <div className="hidden lg:flex xl:mt-10 mt-1">
                            <Link
                                href={product.link}
                                target="_blank"
                                className="inline-flex items-center justify-center border border-black rounded-full py-1 md:px-25 xl:px-[38px] text-[12px] xl:text-[16px] font-regular normal-case hover:bg-black hover:text-white transition-all font-montserrat group"
                            >
                                <span>перейти</span>
                                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Табы: Применение, Состав */}
                <div className="mt-12 lg:mt-24 relative">
                    {/* Фоновая серая линия во всю ширину */}
                    <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#E1E5FB] rounded-full" />

                    <div className="flex gap-10 lg:gap-8 overflow-x-auto no-scrollbar relative">
                        {['application', 'composition'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-4 text-[10px] xl:text-[18px] font-regular uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-black' : 'text-gray-400'
                                    }`}
                            >
                                {tab === 'application' ? 'Применение' : 'Состав'}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-black rounded-full z-10" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="py-8 lg:py-12">
                    <div className="text-[10px] lg:text-[16px] text-gray-600 font-montserrat leading-relaxed max-w-[800px]">
                        {activeTab === 'application' && product.application}
                        {activeTab === 'composition' && product.composition}
                    </div>
                </div>

                {/* Кнопка Перейти (только Мобильный - под табами) */}
                <div className="lg:hidden mt-4 mb-16">
                    <Link
                        href={product.link}
                        target="_blank"
                        className="inline-flex w-full lg:w-auto items-center justify-center border border-black rounded-full py-1 px-10 text-[10px] font-regular normal-case hover:bg-black hover:text-white transition-all font-montserrat group"
                    >
                        <span>перейти</span>
                        <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Блок Вам может понравиться */}
                <section className="mt-20 lg:mt-32">
                    <h2 className="text-[28px] md:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase mb-10 md:mb-12 xl:mb-16">
                        Вам может понравиться
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-5">
                        {recommendedProducts.map((p, index) => (
                            <div key={p.id} className={index === 2 ? 'hidden md:block' : ''}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
