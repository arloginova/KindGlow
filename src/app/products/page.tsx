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

function AdvertisingBanner() {
    return (
        <div className="relative w-full h-[136px] lg:h-[262px] xl:h-[350px] rounded-[16px] lg:rounded-[20px] xl:rounded-[30px] overflow-hidden">
            <Image
                src="/advertising/background_advertising.jpg"
                alt="Background"
                fill
                className="object-cover"
            />

            <div className="relative h-full flex px-3 py-3 lg:px-9 lg:py-9 xl:px-11.25 xl:py-11">
                <div className="relative z-10 flex-1 max-w-[400px] lg:max-w-[460px] xl:max-w-[650px]">
                    <h2 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium leading-5.5 lg:leading-10.75 xl:leading-15.25 text-black mb-1 lg:mb-2 xl:mb-3">
                        <span className="lg:hidden">
                            НЕ ЗНАЕШЬ КАКОЙ<br />УХОД ПОДОЙДЁТ?
                        </span>
                        <span className="hidden lg:inline">
                            НЕ ЗНАЕШЬ КАКОЙ<br />УХОД ПОДОЙДЁТ ТЕБЕ?
                        </span>
                    </h2>
                    <p className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat font-semibold leading-2.5 lg:leading-3.75 xl:leading-5 text-black mb-4 lg:mb-5 xl:mb-7">
                        Пройди тест и мы подберём средства,<br />которые подойдут именно тебе
                    </p>

                    <div className="flex items-center gap-1 xl:gap-2">
                        <div className="w-3.5 h-3.5 lg:w-5.75 lg:h-5.75 xl:w-8.25 xl:h-8.25 flex-shrink-0">
                            <Image
                                src="/test/star_test.svg"
                                alt="Star"
                                width={40}
                                height={40}
                                className="w-full h-full"
                            />
                        </div>
                        <Link
                            href="/test"
                            className="inline-flex items-center gap-1.75 lg:gap-2 xl:gap-3 border-[0.5px] lg:border-[0.7px] xl:border border-brand-purple text-brand-purple rounded-full px-1.75 lg:px-3.25 xl:px-4 py-1.75 lg:py-3.25 xl:py-4.25 text-[8px] lg:text-[13px] xl:text-[16px] font-montserrat uppercase hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all"
                        >
                            <span>ПРОЙТИ ТЕСТ</span>

                            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className="w-1.25 h-1.25 lg:w-1.75 lg:h-1.75 xl:w-2.25 xl:h-2.25">
                                <path d="M0.248057 0.24999H4.20507M4.20507 0.24999V4.207M4.20507 0.24999L0.248057 4.207" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="absolute right-3 lg:right-9 xl:right-13.25 bottom-0 w-[187px] lg:w-[423px] xl:w-[498px] h-[99px] lg:h-[224px] xl:h-[264px] z-0">
                    <Image
                        src="/advertising/photo_advertising.png"
                        alt="Products"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>
            </div>
        </div>
    );
}

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
        <main className="bg-white">
            <div className="max-w-[1440px] mx-auto px-2 lg:px-4 xl:px-4.75 py-6.75 lg:py-3.75 xl:py-1.25 xl:mb-15">

                {/* Заголовок */}
                <h1 className="text-[18px] lg:text-[35px] xl:text-[50px] text-black uppercase font-medium mb-6.25 lg:mb-9.25 xl:mb-14 lg:block">
                    КАТАЛОГ
                </h1>

                {/* Навигация по категориям */}
                <div className="flex overflow-x-auto no-scrollbar gap-5.25 lg:gap-6 xl:gap-8.25 mb-6.5 lg:mb-9.5 xl:mb-14.75">
                    {categories.map((cat, index) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat uppercase whitespace-nowrap transition-all cursor-pointer ${
                                activeCategory === cat
                                ? 'text-black font-medium'
                                : 'font-normal hover:text-gray-400'
                            } ${
                                index === 0 ? 'mr-6 md:mr-16 xl:mr-25.25' : ''
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Сетка товаров */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.25 md:gap-4 xl:gap-5 auto-rows-auto">
                    {(() => {
                        const result = [];
                        
                        // Разделяем товары на обычные и высокие
                        const normalProducts = filteredProducts.filter(p => !p.isTall);
                        const tallProducts = filteredProducts.filter(p => p.isTall);
                        
                        // Функция для расчета полных блоков
                        const calculateCompleteBlocks = (normalCount: number, tallCount: number, normalPerBlock: number, tallPerBlock: number) => {
                            const maxBlocksByNormal = Math.floor(normalCount / normalPerBlock);
                            const maxBlocksByTall = Math.floor(tallCount / tallPerBlock);
                            return Math.min(maxBlocksByNormal, maxBlocksByTall);
                        };
                        
                        // Desktop: блок = 4 обычных + 1 высокая
                        const completeBlocksDesktop = calculateCompleteBlocks(normalProducts.length, tallProducts.length, 4, 1);
                        const normalUsedDesktop = completeBlocksDesktop * 4;
                        const tallUsedDesktop = completeBlocksDesktop * 1;
                        
                        // Mobile: блок = 2 обычных + 1 высокая
                        const completeBlocksMobile = calculateCompleteBlocks(normalProducts.length, tallProducts.length, 2, 1);
                        const normalUsedMobile = completeBlocksMobile * 2;
                        const tallUsedMobile = completeBlocksMobile * 1;
                        
                        let normalIndexDesktop = 0;
                        let tallIndexDesktop = 0;
                        let normalIndexMobile = 0;
                        let tallIndexMobile = 0;
                        let gridRowDesktop = 1;
                        let gridRowMobile = 1;
                        
                        // Desktop: размещаем полные блоки
                        for (let blockIndex = 0; blockIndex < completeBlocksDesktop; blockIndex++) {
                            const patternType = blockIndex % 3;
                            
                            if (patternType === 0 || patternType === 2) {
                                // 4 обычных слева (2x2), 1 высокая справа
                                result.push(<div key={`${normalProducts[normalIndexDesktop].id}-d1`} className="hidden lg:block" style={{ gridRow: gridRowDesktop, gridColumn: '1' }}><ProductCard product={normalProducts[normalIndexDesktop]} /></div>);
                                normalIndexDesktop++;
                                result.push(<div key={`${normalProducts[normalIndexDesktop].id}-d2`} className="hidden lg:block" style={{ gridRow: gridRowDesktop, gridColumn: '2' }}><ProductCard product={normalProducts[normalIndexDesktop]} /></div>);
                                normalIndexDesktop++;
                                result.push(<div key={`${tallProducts[tallIndexDesktop].id}-dt`} className="hidden lg:block" style={{ gridRow: `${gridRowDesktop} / span 2`, gridColumn: '3' }}><ProductCard product={tallProducts[tallIndexDesktop]} isTallLg={true} /></div>);
                                tallIndexDesktop++;
                                result.push(<div key={`${normalProducts[normalIndexDesktop].id}-d3`} className="hidden lg:block" style={{ gridRow: gridRowDesktop + 1, gridColumn: '1' }}><ProductCard product={normalProducts[normalIndexDesktop]} /></div>);
                                normalIndexDesktop++;
                                result.push(<div key={`${normalProducts[normalIndexDesktop].id}-d4`} className="hidden lg:block" style={{ gridRow: gridRowDesktop + 1, gridColumn: '2' }}><ProductCard product={normalProducts[normalIndexDesktop]} /></div>);
                                normalIndexDesktop++;
                                gridRowDesktop += 2;
                            } else {
                                // 1 высокая слева, 4 обычных справа
                                result.push(<div key={`${tallProducts[tallIndexDesktop].id}-dt`} className="hidden lg:block" style={{ gridRow: `${gridRowDesktop} / span 2`, gridColumn: '1' }}><ProductCard product={tallProducts[tallIndexDesktop]} isTallLg={true} /></div>);
                                tallIndexDesktop++;
                                result.push(<div key={`${normalProducts[normalIndexDesktop].id}-d1`} className="hidden lg:block" style={{ gridRow: gridRowDesktop, gridColumn: '2' }}><ProductCard product={normalProducts[normalIndexDesktop]} /></div>);
                                normalIndexDesktop++;
                                result.push(<div key={`${normalProducts[normalIndexDesktop].id}-d2`} className="hidden lg:block" style={{ gridRow: gridRowDesktop, gridColumn: '3' }}><ProductCard product={normalProducts[normalIndexDesktop]} /></div>);
                                normalIndexDesktop++;
                                result.push(<div key={`${normalProducts[normalIndexDesktop].id}-d3`} className="hidden lg:block" style={{ gridRow: gridRowDesktop + 1, gridColumn: '2' }}><ProductCard product={normalProducts[normalIndexDesktop]} /></div>);
                                normalIndexDesktop++;
                                result.push(<div key={`${normalProducts[normalIndexDesktop].id}-d4`} className="hidden lg:block" style={{ gridRow: gridRowDesktop + 1, gridColumn: '3' }}><ProductCard product={normalProducts[normalIndexDesktop]} /></div>);
                                normalIndexDesktop++;
                                gridRowDesktop += 2;
                            }
                            
                            // Вставляем баннер после второго блока
                            if (blockIndex === 1) {
                                result.push(
                                    <div key="advertising-banner" className="hidden lg:block col-span-2 lg:col-span-3 my-0" style={{ gridRow: gridRowDesktop, gridColumn: '1 / -1' }}>
                                        <AdvertisingBanner />
                                    </div>
                                );
                                gridRowDesktop++; // Увеличиваем счетчик после баннера
                            }
                        }
                        
                        // Desktop: оставшиеся товары как обычная сетка
                        const remainingNormalDesktop = normalProducts.slice(normalUsedDesktop);
                        const remainingTallDesktop = tallProducts.slice(tallUsedDesktop);
                        const remainingAllDesktop = [...remainingNormalDesktop, ...remainingTallDesktop];
                        
                        remainingAllDesktop.forEach((product) => {
                            result.push(<div key={`${product.id}-dr`} className="hidden lg:block"><ProductCard product={product} isTallLg={product.isTall} /></div>);
                        });
                        
                        // Mobile: размещаем полные блоки
                        for (let blockIndex = 0; blockIndex < completeBlocksMobile; blockIndex++) {
                            const patternType = blockIndex % 2;
                            
                            if (patternType === 0) {
                                // 2 обычных слева, 1 высокая справа
                                result.push(<div key={`${normalProducts[normalIndexMobile].id}-m1`} className="lg:hidden" style={{ gridRow: gridRowMobile, gridColumn: '1' }}><ProductCard product={normalProducts[normalIndexMobile]} /></div>);
                                normalIndexMobile++;
                                result.push(<div key={`${tallProducts[tallIndexMobile].id}-mt`} className="lg:hidden" style={{ gridRow: `${gridRowMobile} / span 2`, gridColumn: '2' }}><ProductCard product={tallProducts[tallIndexMobile]} isTallSm={true} /></div>);
                                tallIndexMobile++;
                                result.push(<div key={`${normalProducts[normalIndexMobile].id}-m2`} className="lg:hidden" style={{ gridRow: gridRowMobile + 1, gridColumn: '1' }}><ProductCard product={normalProducts[normalIndexMobile]} /></div>);
                                normalIndexMobile++;
                                gridRowMobile += 2;
                            } else {
                                // 1 высокая слева, 2 обычных справа
                                result.push(<div key={`${tallProducts[tallIndexMobile].id}-mt`} className="lg:hidden" style={{ gridRow: `${gridRowMobile} / span 2`, gridColumn: '1' }}><ProductCard product={tallProducts[tallIndexMobile]} isTallSm={true} /></div>);
                                tallIndexMobile++;
                                result.push(<div key={`${normalProducts[normalIndexMobile].id}-m1`} className="lg:hidden" style={{ gridRow: gridRowMobile, gridColumn: '2' }}><ProductCard product={normalProducts[normalIndexMobile]} /></div>);
                                normalIndexMobile++;
                                result.push(<div key={`${normalProducts[normalIndexMobile].id}-m2`} className="lg:hidden" style={{ gridRow: gridRowMobile + 1, gridColumn: '2' }}><ProductCard product={normalProducts[normalIndexMobile]} /></div>);
                                normalIndexMobile++;
                                gridRowMobile += 2;
                            }
                            
                            // Вставляем баннер после второго блока (для mobile)
                            if (blockIndex === 1) {
                                result.push(
                                    <div key="advertising-banner-mobile" className="col-span-2 lg:hidden" style={{ gridRow: gridRowMobile, gridColumn: '1 / -1' }}>
                                        <AdvertisingBanner />
                                    </div>
                                );
                                gridRowMobile++; // Увеличиваем счетчик после баннера
                            }
                        }
                        
                        // Mobile: оставшиеся товары как обычная сетка
                        const remainingNormalMobile = normalProducts.slice(normalUsedMobile);
                        const remainingTallMobile = tallProducts.slice(tallUsedMobile);
                        const remainingAllMobile = [...remainingNormalMobile, ...remainingTallMobile];
                        
                        remainingAllMobile.forEach((product) => {
                            result.push(<div key={`${product.id}-mr`} className="lg:hidden"><ProductCard product={product} isTallSm={product.isTall} /></div>);
                        });
                        
                        return result;
                    })()}
                </div>
            </div>
        </main>
    );
}
