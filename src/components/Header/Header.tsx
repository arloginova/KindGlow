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
        <header className="w-full bg-white font-montserrat sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto px-[8px] md:px-[16px] lg:px-[16px] xl:px-[20px]">
                <div className="pt-8 pb-2 flex items-center justify-between h-[95px]">

                    {/* Десктопная навигация */}
                    <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                        <Link href="/products" className="text-[14px] xl:text-[18px] font-medium tracking-tight hover:text-brand-purple transition-colors">ПРОДУКТЫ</Link>
                        <Link href="/blog" className="text-[14px] xl:text-[18px] font-medium tracking-tight hover:text-brand-purple transition-colors">СТАТЬИ</Link>
                        <Link href="/test" className="text-[14px] xl:text-[18px] font-medium tracking-tight hover:text-brand-purple transition-colors">ТЕСТ</Link>
                        <Link href="/tutorials" className="text-[14px] xl:text-[18px] font-medium tracking-tight hover:text-brand-purple transition-colors whitespace-nowrap">УРОКИ И ОБЗОРЫ</Link>
                    </nav>

                    {/* Мобильная кнопка поиска */}
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="w-[32px] h-[32px] rounded-full bg-lavender flex items-center justify-center text-white"
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
                                        className="w-[32px] h-[32px] rounded-full bg-lavender flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
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
                                            className="bg-transparent border-none outline-none text-[14px] w-full placeholder:text-gray-400 font-regular font-montserrat"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleSearch}
                                        className="w-[32px] h-[32px] rounded-full bg-brand-purple flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
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
                            className="h-[34px] md:h-[40px] xl:h-[54px] w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Правая часть: Поиск + Кнопка */}
                    <div className="flex items-center gap-[12px]">
                        <div className="flex items-center gap-[5px]">
                            {/* Поле поиска */}
                            <div className="hidden lg:flex items-center border border-black rounded-full px-[16px] xl:px-[24px] w-[220px] xl:w-[350px] lg:h-[38px] xl:h-[49px]">
                                <input
                                    type="text"
                                    placeholder="Поиск продукта"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="bg-transparent border-none outline-none text-[16px] ml:text-[16px] xl:text-[16px] w-full normal-case placeholder:text-black font-regular font-montserrat"
                                />
                            </div>

                            {/* Кнопка поиска */}
                            <button 
                                onClick={handleSearch}
                                className="hidden lg:flex lg:w-[38px] lg:h-[38px] xl:w-[49px] xl:h-[49px] rounded-full bg-lavender items-center justify-center flex-shrink-0 text-white hover:opacity-90 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>

                        {/* Кнопка соцсети */}
                        <Link
                            href="https://t.me/arshklgnv"
                            className="bg-brand-purple text-white px-4 xl:px-4 h-[32px] lg:h-[38px] xl:h-[49px] flex items-center rounded-full text-[9px] xl:text-[14px] font-montserrat tracking-normal hover:opacity-90 transition-opacity whitespace-nowrap"
                        >
                            @KINDGLOW
                        </Link>
                    </div>
                </div>
            </div>

            {/* Мобильная навигация */}
            <div className="lg:hidden overflow-x-auto no-scrollbar">
                <nav className="flex items-center justify-center gap-5 px-4">
                    <Link href="/products" className="text-[11px] font-normal tracking-tight whitespace-nowrap uppercase">ПРОДУКТЫ</Link>
                    <Link href="/blog" className="text-[11px] font-normal tracking-tight whitespace-nowrap uppercase">СТАТЬИ</Link>
                    <Link href="/test" className="text-[11px] font-normal tracking-tight whitespace-nowrap uppercase">ТЕСТ</Link>
                    <Link href="/tutorials" className="text-[11px] font-normal tracking-tight whitespace-nowrap uppercase">УРОКИ И ОБЗОРЫ</Link>
                </nav>
            </div>
        </header>
    );
};
