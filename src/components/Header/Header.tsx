'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';

export const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const router = useRouter();
    const searchOverlayRef = useRef<HTMLDivElement>(null);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            router.push('/products');
            setIsMobileSearchOpen(false);
            return;
        }

        const foundProduct = products.find(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (foundProduct) {
            router.push(`/products/${foundProduct.id}`);
        } else {
            router.push('/products');
        }
        setIsMobileSearchOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Закрытие при клике вне поля поиска
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchOverlayRef.current && !searchOverlayRef.current.contains(event.target as Node)) {
                setIsMobileSearchOpen(false);
            }
        };

        if (isMobileSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileSearchOpen]);
    return (
        <header className="w-full bg-white font-sans">
            <div className="max-w-[1440px] mx-auto px-[8px] md:px-[16px] lg:px-[16px] xl:px-[20px]">
                <div className="lg:pt-[10px] xl:pt-[21px] flex items-center justify-between h-16 lg:h-18.5 xl:h-25.5">

                    {/* Десктопная навигация */}
                    <nav className="hidden lg:flex items-center gap-[28.5px] xl:gap-9.25">
                        <Link href="/products" className="text-[13px] xl:text-[18px] font-medium hover:text-brand-purple transition-colors">ПРОДУКТЫ</Link>
                        <Link href="/blog" className="text-[13px] xl:text-[18px] font-medium hover:text-brand-purple transition-colors">СТАТЬИ</Link>
                        <Link href="/test" className="text-[13px] xl:text-[18px] font-medium hover:text-brand-purple transition-colors">ТЕСТ</Link>
                        <Link href="/tutorials" className="text-[13px] xl:text-[18px] font-medium hover:text-brand-purple transition-colors whitespace-nowrap">УРОКИ И ОБЗОРЫ</Link>
                    </nav>

                    {/* Мобильная кнопка поиска */}
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="w-[31px] h-[31px] rounded-full bg-lavender flex items-center justify-center text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </div>

                    {/* Поле поиска на мобильных (появляется в шапке) */}
                    {isMobileSearchOpen && (
                        <div 
                            className="fixed top-0 left-0 right-0 bg-white z-[100] lg:hidden shadow-md animate-slideDown"
                            style={{ 
                                animation: 'slideDown 0.3s ease-out'
                            }}
                        >
                            <div className="max-w-[1440px] mx-auto px-[8px] pt-10 pb-6" ref={searchOverlayRef}>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => setIsMobileSearchOpen(false)}
                                        className="w-[31px] h-[31px] rounded-full bg-lavender flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.25 h-4.25">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <div className="flex-1 flex items-center border-2 border-lavender rounded-full px-4 h-[32px] transition-all focus-within:border-brand-purple">
                                        <input
                                            type="text"
                                            placeholder="Поиск продукта"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            autoFocus
                                            className="bg-transparent border-none outline-none text-[10px] w-full placeholder:text-gray-400 font-regular font-sans"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleSearch}
                                        className="w-[31px] h-[31px] rounded-full bg-brand-purple flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.25 h-4.25">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Логотип */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <Image
                            src="/logo_desktop.svg"
                            alt="KindGlow Logo"
                            width={180}
                            height={54}
                            className="hidden min-[1380px]:block h-[44px] w-auto object-contain"
                            priority
                        />
                        <Image
                            src="/logo_mobile.svg"
                            alt="KindGlow Logo"
                            width={40}
                            height={40}
                            className="block min-[1380px]:hidden h-[40px] w-[40px] object-contain"
                            priority
                        />
                    </Link>

                    {/* Правая часть: Поиск + Кнопка */}
                    <div className="flex items-center gap-[12px]">
                        <div className="flex items-center pt-[2px] xl:pt-0 gap-[8px]">
                            {/* Поле поиска */}
                            <div className="hidden lg:flex items-center border border-black rounded-full px-[11px] xl:px-[15px] w-[269px] xl:w-[346px] lg:h-[38px] xl:h-[49px]">
                                <input
                                    type="text"
                                    placeholder="Поиск продукта"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="bg-transparent border-none outline-none text-[12px] xl:text-[16px] w-full normal-case placeholder:text-black font-regular font-sans"
                                />
                            </div>

                            {/* Кнопка поиска */}
                            <button 
                                onClick={handleSearch}
                                className="hidden lg:flex lg:w-[38px] lg:h-[38px] xl:w-[49px] xl:h-[49px] rounded-full bg-lavender items-center justify-center flex-shrink-0 text-white hover:opacity-90 transition-opacity cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="lg:w-4.25 lg:h-4.25 xl:w-5.5 xl:h-5.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>

                        {/* Кнопка соцсети */}
                        <Link
                            href="https://t.me/arshklgnv"
                            className="bg-brand-purple text-white px-2 h-[26px] flex lg:hidden items-center rounded-full text-[8px] font-sans tracking-normal hover:opacity-90 transition-opacity whitespace-nowrap"
                        >
                            @KINDGLOW
                        </Link>
                    </div>
                </div>
            </div>

            {/* Мобильная навигация */}
            <div className="lg:hidden overflow-x-auto no-scrollbar">
                <nav className="flex items-center justify-center pt-[5px] h-6 gap-6.25 px-4">
                    <Link href="/products" className="text-[10px] font-normal whitespace-nowrap uppercase">ПРОДУКТЫ</Link>
                    <Link href="/blog" className="text-[10px] font-normal whitespace-nowrap uppercase">СТАТЬИ</Link>
                    <Link href="/test" className="text-[10px] font-normal whitespace-nowrap uppercase">ТЕСТ</Link>
                    <Link href="/tutorials" className="text-[10px] font-normal whitespace-nowrap uppercase">УРОКИ И ОБЗОРЫ</Link>
                </nav>
            </div>
        </header>
    );
};
