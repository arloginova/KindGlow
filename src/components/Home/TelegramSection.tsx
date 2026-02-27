'use client';

import Image from 'next/image';
import Link from 'next/link';

export function TelegramSection() {
    return (
        <section className="py-8 md:py-[60px] xl:py-[76px]">
            {/* Контейнер */}
            <div className="flex flex-row gap-12 md:gap-70 xl:gap-100">
                
                {/* Левая часть - заголовок и фотографии */}
                <div className="flex flex-col gap-4 md:gap-6 xl:gap-8 flex-shrink-0">
                    {/* Заголовок над фотографиями */}
                    <h2 className="text-[8px] md:text-[12px] xl:text-[16px] font-montserrat font-semibold text-black uppercase leading-tight">
                        ВДОХНОВЛЯЕМ ВАС<br />ВЫБИРАТЬ ПРАВИЛЬНОЕ
                    </h2>

                    {/* Фотографии */}
                    <div className="flex gap-2 md:gap-4 xl:gap-4">
                        {/* Первое фото */}
                        <div className="relative w-[79px] h-[79px] md:w-[160px] md:h-[160px] xl:w-[219px] xl:h-[219px] rounded-[16px] md:rounded-[24px] xl:rounded-[32px] overflow-hidden flex-shrink-0">
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
                                className="object-cover hidden md:block xl:hidden"
                            />
                            <Image
                                src="/home/photo_chat_desktop.png"
                                alt="Chat photo 1"
                                fill
                                className="object-cover hidden xl:block"
                            />
                        </div>

                        {/* Второе фото */}
                        <div className="relative w-[79px] h-[79px] md:w-[160px] md:h-[160px] xl:w-[219px] xl:h-[219px] rounded-[16px] md:rounded-[24px] xl:rounded-[32px] overflow-hidden flex-shrink-0">
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
                                className="object-cover hidden md:block xl:hidden"
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
                    <h3 className="text-[18 px] md:text-[32px] xl:text-[48px] font-montserrat font-medium text-black uppercase leading-tight mb-2 md:mb-6">
                        МЫ РЯДОМ.<br />В ОДНОМ ЧАТЕ
                    </h3>

                    {/* Описание */}
                    <p className="hidden md:block text-[8px] md:text-[12px] xl:text-[15px] font-semibold font-montserrat text-black leading-snug max-w-[600px] mb-2 md:mb-6">
                        В нашем Telegram-канале мы обсуждаем всё, что делает жизнь чуть легче и красивее: осознанный уход, честные бренды, устойчивые привычки и маленькие шаги, которые приносят спокойствие и уверенность в Вашем правильном выборе
                    </p>
                    {/* Описание для мобильного */}
                    <p className="md:hidden text-[8px] font-semibold font-montserrat text-black leading-snug max-w-[600px] mb-2">
                        осознанный уход, честные бренды, устойчивые привычки и маленькие шаги, приносящие спокойствие
                    </p>
                    {/* Звездочка и кнопка */}
                    <div className="flex items-center gap-3 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10 flex-shrink-0">
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
                            className="inline-flex items-center gap-2 bg-brand-purple text-white rounded-full px-3 xl:px-5 py-2 xl:py-4 text-[8px] xl:text-[14px] font-regular font-montserrat uppercase tracking-wide hover:opacity-90 transition-all"
                        >
                            <span>@KINDGLOW</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
