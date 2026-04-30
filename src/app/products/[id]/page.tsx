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
        const filtered = products.filter((p) => p.id !== id && !p.isTall);
        // Используем детерминированную сортировку на основе id
        const shuffled = [...filtered].sort((a, b) => {
            const hashA = a.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const hashB = b.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return hashA - hashB;
        });
        return shuffled.slice(0, 3);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-tan-pearl uppercase">Товар не найден</h1>
            </div>
        );
    }

    return (
        <main className="bg-white">
            <div className="max-w-[1440px] mx-auto px-2 lg:px-4 xl:px-4.75 py-6.75 lg:py-3.75 xl:py-1.25 xl:mb-15">

                {/* Хлебные крошки */}
                <nav className="flex items-center gap-1.75 text-[10px] lg:text-[13px] xl:text-[18px] uppercase mb-7.5 lg:mb-10.5 xl:mb-15.5 font-montserrat">
                    <Link href="/products" className="text-black hover:text-black transition-colors">КАТАЛОГ</Link>
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" className="w-2 h-2 xl:w-3 xl:h-3">
                        <path d="M0.134367 0.674504C0.0914455 0.636338 0.0578911 0.591442 0.0356188 0.542379C0.0133464 0.493316 0.00279195 0.441048 0.00455904 0.388558C0.00632613 0.336068 0.02038 0.284384 0.0459175 0.236458C0.071455 0.188532 0.107977 0.145302 0.153397 0.109236C0.198817 0.0731694 0.252246 0.0449739 0.310634 0.0262587C0.369022 0.00754345 0.431224 -0.00132496 0.493691 0.000159907C0.556158 0.00164477 0.617665 0.0134538 0.6747 0.0349127C0.731736 0.0563716 0.783183 0.0870601 0.826104 0.125226L4.86996 3.72311C4.95347 3.79734 5 3.89561 5 3.99775C5 4.0999 4.95347 4.19817 4.86996 4.27239L0.826104 7.87068C0.783466 7.90968 0.73203 7.94118 0.674785 7.96333C0.61754 7.98549 0.555626 7.99787 0.49264 7.99975C0.429654 8.00163 0.366851 7.99297 0.307878 7.97429C0.248906 7.9556 0.19494 7.92725 0.149116 7.89089C0.103292 7.85453 0.0665223 7.81088 0.0409431 7.76248C0.015364 7.71408 0.00148529 7.66189 0.00011301 7.60894C-0.00125927 7.55599 0.00990185 7.50334 0.032949 7.45405C0.0559961 7.40476 0.0904695 7.35981 0.134367 7.3218L3.86994 3.99775L0.134367 0.674504Z" fill="currentColor"/>
                    </svg>
                    <span className="text-black font-regular uppercase">{product.category}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.05fr_1fr] gap-2.75 lg:gap-4 xl:gap-6.75 items-start">

                    {/* Мобильный заголовок (над фото) */}
                    <div className="lg:hidden mb-0">
                        <h1 className="text-[18px] lg:text-[32px] font-montserrat font-medium text-black leading-5.25 uppercase mb-1.75 w-60">
                            {product.name}
                        </h1>
                        <p className="text-[10px] text-black font-montserrat w-10 leading-3">
                            {product.shortDescription}
                        </p>
                    </div>

                    {/* Фото продукта */}
                    <div className="relative aspect-square w-full bg-[#F3F3F7] rounded-[16px] lg:rounded-[20px] xl:rounded-[30px] overflow-hidden">
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
                    <div className="flex flex-col lg:pt-5 xl:pt-6.75">
                        {/* Десктопный заголовок */}
                        <div className="hidden lg:block mb-8">
                            <h1 className="text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-tight mb-3.25 xl:mb-4.75">
                                {product.name}
                            </h1>
                            <div className="text-[35px] xl:text-[50px] font-medium font-montserrat lg:mb-27 xl:mb-50">
                                {product.price.toLocaleString('de-DE')} ₽
                            </div>
                        </div>

                        {/* Бейджи */}
                        <div className="flex flex-wrap gap-1 mb-3.25 lg:mb-5.5 xl:mb-7.75">
                            {product.badges.map((badge) => (
                                <span
                                    key={badge}
                                    className="px-2 md:px-3 xl:px-2 py-0.5 lg:py-1 rounded-full border-[0.5px] border-black text-[8px] md:text-[12px] xl:text-[16px] font-medium normal-case font-montserrat"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* Мобильная цена (после бейджей) */}
                        <div className="lg:hidden text-[18px] font-medium font-montserrat mb-0">
                            {product.price.toLocaleString('de-DE')} ₽
                        </div>

                        {/* Краткое описание (Десктоп) */}
                        <div className="hidden lg:block mb-6">
                            <h2 className="text-[12px] xl:text-[16px] font-semibold uppercase mb-1.5 font-montserrat">
                                Описание продукта
                            </h2>
                            <p className="text-[12px] xl:text-[16px] text-black font-montserrat leading-normal">
                                {product.shortDescription}
                            </p>
                        </div>

                        {/* Кнопка Перейти (Десктоп и Планшет) */}
                        <div className="hidden lg:flex lg:mt-2.25 xl:mt-0">
                            <Link
                                href={product.link}
                                target="_blank"
                                className="inline-flex items-center justify-center border border-black rounded-full py-1 lg:px-27.75 xl:px-39.5 text-[12px] xl:text-[16px] font-regular normal-case transition-all font-montserrat group"
                            >
                                <span>перейти</span>
                                <svg width="4" height="4" viewBox="0 0 4 4" fill="none" className="ml-1.5 w-1 h-1 lg:w-2 lg:h-2 transition-transform">
                                    <path d="M0.251954 0.249325H3.63867M3.63867 0.249325V3.62102M3.63867 0.249325L0.251954 3.62102" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Табы: Применение, Состав */}
                <div className="mt-3.25 lg:mt-10.5 xl:mt-13.5 relative">
                    {/* Фоновая серая линия во всю ширину */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] lg:h-[3px] xl:h-[5px] bg-[#E1E5FB] rounded-full" />

                    <div className="flex gap-7 lg:gap-6.5 xl:gap-7 overflow-x-auto no-scrollbar relative">
                        {['application', 'composition'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as 'application' | 'composition')}
                                className={`pb-3 lg:pb-5.25 xl:pb-7.5 text-[10px] lg:text-[13px] xl:text-[18px] font-medium uppercase transition-all relative ${activeTab === tab ? 'text-black' : 'text-gray-400'
                                    }`}
                            >
                                {tab === 'application' ? 'Применение' : 'Состав'}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] lg:h-[3px] xl:h-[5px] bg-black rounded-full z-10" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="py-4 lg:py-4.75 xl:py-6.5">
                    <div className="text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat leading-3 lg:leading-normal max-w-[800px]">
                        {activeTab === 'application' && product.application}
                        {activeTab === 'composition' && product.composition}
                    </div>
                </div>

                {/* Кнопка Перейти (только Мобильный - под табами) */}
                <div className="lg:hidden mt-1 mb-7.25">
                    <Link
                        href={product.link}
                        target="_blank"
                        className="inline-flex w-full lg:w-auto items-center justify-center border border-black rounded-full py-0.75 px-10 text-[8px] font-regular normal-case transition-all font-montserrat group"
                    >
                        <span>перейти</span>

                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" className="ml-1.5 w-1 h-1 md:w-4 md:h-4 transition-transform group-hover:translate-x-1">
                            <path d="M0.251954 0.249325H3.63867M3.63867 0.249325V3.62102M3.63867 0.249325L0.251954 3.62102" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </Link>
                </div>

                {/* Блок Вам может понравиться */}
                <section className="mt-0 lg:mt-11 xl:mt-21">
                    <h2 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase mb-5.5 md:mb-12 xl:mb-16">
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
