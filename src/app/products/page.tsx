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

                {/* Заголовок */}
                <h1 className="text-[30px] lg:text-[50px] font-tan-pearl text-black uppercase mb-8 lg:block">
                    КАТАЛОГ
                </h1>

                {/* Навигация по категориям */}
                <div className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 lg:gap-10 mb-8 md:mb-12 pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[14px] lg:text-[16px] font-normal tracking-tight whitespace-nowrap transition-colors hover:text-brand-purple ${
                                activeCategory === cat ? 'text-brand-purple border-b-2 border-brand-purple pb-4 -mb-[18px]' : 'text-black'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Сетка товаров */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-5 auto-rows-auto">
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
                                    <div key="advertising-banner" className="col-span-2 lg:col-span-3 my-4 md:my-6 lg:my-8" style={{ gridRow: gridRowDesktop, gridColumn: '1 / -1' }}>
                                        <div className="relative w-full h-[136px] md:h-[262px] xl:h-[350px] rounded-[24px] md:rounded-[32px] lg:rounded-[40px] overflow-hidden">
                                            {/* Фоновое изображение */}
                                            <Image
                                                src="/advertising/background_advertising_iphone.png"
                                                alt="Background"
                                                fill
                                                className="object-cover md:hidden"
                                            />
                                            <Image
                                                src="/advertising/background_advertising_ipad.svg"
                                                alt="Background"
                                                fill
                                                className="object-cover hidden md:block lg:hidden"
                                            />
                                            <Image
                                                src="/advertising/background_advertising_desktop.svg"
                                                alt="Background"
                                                fill
                                                className="object-cover hidden lg:block"
                                            />
                                            
                                            {/* Контент */}
                                            <div className="relative h-full flex items-center p-4 md:p-8 lg:p-12">
                                                <div className="flex-1 max-w-[400px] lg:max-w-[650px]">
                                                    <h2 className="text-[16px] md:text-[35px] xl:text-[50px] font-montserrat font-medium text-black leading-tight mb-2 md:mb-2 xl:mb-3">
                                                        НЕ ЗНАЕШЬ КАКОЙ<br />УХОД ПОДОЙДЁТ ТЕБЕ?
                                                    </h2>
                                                    <p className="text-[8px] md:text-[12px] xl:text-[16px] font-semibold leading-tight font-montserrat text-black mb-3 md:mb-3 xl:mb-6">
                                                        Пройди тест и мы подберём средства,<br />которые подойдут именно тебе
                                                    </p>
                                                    
                                                    {/* Звездочка и кнопка */}
                                                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                                                        <div className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0">
                                                            <Image
                                                                src="/test/star_test.svg"
                                                                alt="Star"
                                                                width={32}
                                                                height={32}
                                                                className="w-full h-full"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="/test"
                                                            className="inline-flex items-center gap-1 md:gap-2 border-1 border-brand-purple text-brand-purple rounded-full px-3 md:px-3 xl:px-4 py-1.5 md:py-3 xl:py-3 text-[8px] md:text-[12px] lg:text-[14px] font-medium font-montserrat uppercase tracking-wide hover:bg-brand-purple hover:text-white transition-all"
                                                        >
                                                            <span>ПРОЙТИ ТЕСТ</span>
                                                            <span className="text-[12px] md:text-[13px] xl:text-[18px]">&gt;</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                
                                                {/* Фото товаров справа */}
                                                <div className="absolute right-4 md:right-8 xl:right-12 bottom-0 w-[100px] md:w-[423px] xl:w-[498px] h-[80px] md:h-[224px] xl:h-[264px]">
                                                    <Image
                                                        src="/advertising/photo_advertising_iphone.png"
                                                        alt="Products"
                                                        fill
                                                        className="object-contain md:hidden"
                                                    />
                                                    <Image
                                                        src="/advertising/photo_advertising_ipad.png"
                                                        alt="Products"
                                                        fill
                                                        className="object-contain hidden md:block lg:hidden"
                                                    />
                                                    <Image
                                                        src="/advertising/photo_advertising_desktop.png"
                                                        alt="Products"
                                                        fill
                                                        className="object-contain hidden lg:block"
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                                    <div key="advertising-banner-mobile" className="col-span-2 lg:hidden my-4 md:my-6" style={{ gridRow: gridRowMobile, gridColumn: '1 / -1' }}>
                                        <div className="relative w-full h-[136px] md:h-[262px] rounded-[24px] md:rounded-[32px] overflow-hidden">
                                            {/* Фоновое изображение */}
                                            <Image
                                                src="/advertising/background_advertising_iphone.png"
                                                alt="Background"
                                                fill
                                                className="object-cover md:hidden"
                                            />
                                            <Image
                                                src="/advertising/background_advertising_ipad.png"
                                                alt="Background"
                                                fill
                                                className="object-cover hidden md:block"
                                            />
                                            
                                            {/* Контент */}
                                            <div className="relative h-full flex items-center p-4 md:p-8">
                                                <div className="flex-1 max-w-[400px]">
                                                    <h2 className="text-[16px] md:text-[28px] font-montserrat font-semibold text-black leading-tight mb-2 md:mb-4">
                                                        НЕ ЗНАЕШЬ КАКОЙ<br />УХОД ПОДОЙДЁТ ТЕБЕ?
                                                    </h2>
                                                    <p className="text-[8px] md:text-[12px] font-montserrat text-black mb-3 md:mb-4">
                                                        Пройди тест и мы подберём средства,<br />которые подойдут именно тебе
                                                    </p>
                                                    
                                                    {/* Звездочка и кнопка */}
                                                    <div className="flex items-center gap-2 md:gap-3">
                                                        <div className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0">
                                                            <Image
                                                                src="/test/star_test.svg"
                                                                alt="Star"
                                                                width={32}
                                                                height={32}
                                                                className="w-full h-full"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="/test"
                                                            className="inline-flex items-center gap-1 md:gap-2 border-2 border-brand-purple text-brand-purple rounded-full px-3 md:px-5 py-1.5 md:py-2 text-[8px] md:text-[12px] font-medium font-montserrat uppercase tracking-wide hover:bg-brand-purple hover:text-white transition-all"
                                                        >
                                                            <span>ПРОЙТИ ТЕСТ</span>
                                                            <span className="text-[12px] md:text-[16px]">&gt;</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                
                                                {/* Фото товаров справа */}
                                                <div className="absolute right-4 md:right-8 bottom-0 w-[100px] md:w-[180px] h-[80px] md:h-[150px]">
                                                    <Image
                                                        src="/advertising/photo_advertising_iphone.png"
                                                        alt="Products"
                                                        fill
                                                        className="object-contain md:hidden"
                                                    />
                                                    <Image
                                                        src="/advertising/photo_advertising_ipad.png"
                                                        alt="Products"
                                                        fill
                                                        className="object-contain hidden md:block"
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
