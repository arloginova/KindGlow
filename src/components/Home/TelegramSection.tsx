'use client';

import Image from 'next/image';
import Link from 'next/link';

export function TelegramSection() {
    return (
        <section className="py-8 sm:py-10 md:py-12 lg:py-[60px] xl:py-[76px]">
            {/* Контейнер */}
            <div className="flex flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-70 xl:gap-100">
                
                {/* Левая часть - заголовок и фотографии */}
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-5.5 lg:gap-6 xl:gap-8 flex-shrink-0">
                    {/* Заголовок над фотографиями */}
                    <h2 className="text-[8px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[16px] font-montserrat font-semibold text-black uppercase leading-tight">
                        ВДОХНОВЛЯЕМ ВАС<br />ВЫБИРАТЬ ПРАВИЛЬНОЕ
                    </h2>

                    {/* Фотографии */}
                    <div className="flex gap-2 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-4">
                        {/* Первое фото */}
                        <div className="relative w-[79px] h-[79px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] xl:w-[219px] xl:h-[219px] rounded-[16px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[24px] xl:rounded-[32px] overflow-hidden flex-shrink-0">
                            <Image
                                src="/home/photo_chat_iphone.png"
                                alt="Chat photo 1"
                                fill
                                className="object-cover xl:hidden"
                            />
                            <Image
                                src="/home/photo_chat_ipad.png"
                                alt="Chat photo 1"
                                fill
                                className="object-cover hidden lg:block xl:hidden"
                            />
                            <Image
                                src="/home/photo_chat_desktop.png"
                                alt="Chat photo 1"
                                fill
                                className="object-cover hidden xl:block"
                            />
                        </div>

                        {/* Второе фото */}
                        <div className="relative w-[79px] h-[79px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] xl:w-[219px] xl:h-[219px] rounded-[16px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[24px] xl:rounded-[32px] overflow-hidden flex-shrink-0">
                            <Image
                                src="/home/photo2_chat_iphone.png"
                                alt="Chat photo 2"
                                fill
                                className="object-cover xl:hidden"
                            />
                            <Image
                                src="/home/photo2_chat_ipad.png"
                                alt="Chat photo 2"
                                fill
                                className="object-cover hidden lg:block xl:hidden"
                            />
                            <Image
                                src="/home/photo2_chat_desktop.png"
                                alt="Chat photo 2"
                                fill
                                className="object-cover hidden xl:block"
                            />
                        </div>
                    </div>
                </div>

                {/* Правая часть - текст и кнопка */}
                <div className="flex-1">
                    {/* Основной заголовок */}
                    <h3 className="text-[18px] sm:text-[25px] md:text-[28px] lg:text-[32px] xl:text-[48px] font-montserrat font-medium text-black uppercase leading-tight mb-2 sm:mb-4 md:mb-5 lg:mb-6">
                        МЫ РЯДОМ.<br />В ОДНОМ ЧАТЕ
                    </h3>

                    {/* Описание */}
                    <p className="hidden lg:block text-[8px] lg:text-[12px] xl:text-[15px] font-semibold font-montserrat text-black leading-snug max-w-[600px] mb-2 lg:mb-6">
                        В нашем Telegram-канале мы обсуждаем всё, что делает жизнь чуть легче и красивее: осознанный уход, честные бренды, устойчивые привычки и маленькие шаги, которые приносят спокойствие и уверенность в Вашем правильном выборе
                    </p>
                    {/* Описание для мобильного */}
                    <p className="lg:hidden text-[8px] sm:text-[9px] md:text-[10px] font-semibold font-montserrat text-black leading-snug max-w-[600px] mb-2 sm:mb-3 md:mb-4">
                        осознанный уход, честные бренды, устойчивые привычки и маленькие шаги, приносящие спокойствие
                    </p>
                    {/* Звездочка и кнопка */}
                    <div className="flex items-center gap-3 md:gap-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-7.5 md:h-7.5 lg:w-8 lg:h-8 xl:w-10 xl:h-10 flex-shrink-0">
                            <Image
                                src="/test/star_test.svg"
                                alt="Star"
                                width={40}
                                height={40}
                                className="w-full h-full"
                            />
                        </div>
                        {/* Кнопка */}
                        <Link
                            href="https://t.me/arshklgnv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-brand-purple text-white rounded-full px-3 sm:px-4 md:px-4 lg:px-4 xl:px-5 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-4 text-[8px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] font-regular font-montserrat uppercase tracking-wide hover:opacity-90 transition-all"
                        >
                            <span>@KINDGLOW</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
