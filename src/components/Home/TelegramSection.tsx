'use client';

import Image from 'next/image';
import Link from 'next/link';

export function TelegramSection() {
    return (
        <section className="py-7.75 lg:py-15 xl:py-21">
            {/* Контейнер */}
            <div className="flex flex-wrap flex-row justify-between">
                
                {/* Левая часть - заголовок и фотографии */}
                <div className="flex flex-col max-w-[166px] lg:max-w-[334px] xl:max-w-[458px] gap-5 lg:gap-7 xl:gap-10 flex-shrink-0 mr-2">
                    {/* Заголовок над фотографиями */}
                    <h2 className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat font-semibold text-black uppercase leading-2.5 lg:leading-3.75 xl:leading-5 mt-0.25 lg:mt-2.5 xl:mt-0">
                        ВДОХНОВЛЯЕМ ВАС<br />ВЫБИРАТЬ ПРАВИЛЬНОЕ
                    </h2>

                    {/* Фотографии */}
                    <div className="flex gap-2 lg:gap-4 xl:gap-5">
                        {/* Первое фото */}
                        <div className="relative w-[79px] h-[79px] lg:w-[159px] lg:h-[159px] xl:w-[219px] xl:h-[219px] rounded-[16px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[24px] xl:rounded-[32px] overflow-hidden flex-shrink-0">
                            <Image
                                src="/home/telegram_section_photo_1.jpg"
                                alt="Chat photo 1"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Второе фото */}
                        <div className="relative w-[79px] h-[79px] lg:w-[159px] lg:h-[159px] xl:w-[219px] xl:h-[219px] rounded-[16px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[24px] xl:rounded-[32px] overflow-hidden flex-shrink-0">
                            <Image
                                src="/home/telegram_section_photo_2.jpg"
                                alt="Chat photo 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Правая часть - текст и кнопка */}
                <div className="flex-1 max-w-[157px] lg:max-w-[378px] xl:max-w-[567px]">
                    {/* Основной заголовок */}
                    <h3 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-5.5 lg:leading-10.75 xl:leading-15.25 mb-2.25 lg:mb-4.25 xl:mb-5">
                        МЫ РЯДОМ.<br />В ОДНОМ ЧАТЕ
                    </h3>

                    {/* Описание */}
                    <p className="hidden lg:block text-[12px] xl:text-[16px] font-semibold font-montserrat text-black leading-3.75 xl:leading-5 max-w-[600px] mb-4.75 xl:mb-7">
                        В нашем Telegram-канале мы обсуждаем всё, что делает жизнь чуть легче и красивее: осознанный уход, честные бренды, устойчивые привычки и маленькие шаги, которые приносят спокойствие и уверенность<br className="hidden lg:block xl:hidden" /> в Вашем правильном выборе
                    </p>
                    {/* Описание для мобильного */}
                    <p className="lg:hidden text-[8px] font-semibold font-montserrat text-black leading-2.5 max-w-[600px] mb-2.75">
                        осознанный уход, честные бренды, устойчивые привычки и маленькие шаги, приносящие спокойствие
                    </p>
                    {/* Звездочка и кнопка */}
                    <div className="flex items-center gap-1.25 lg:gap-1 xl:gap-2.25">
                        <div className="w-3.5 h-3.5 lg:w-5.75 lg:h-5.75 xl:w-8.25 xl:h-8.25 flex-shrink-0">
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
                            className="bg-brand-purple text-white px-2 lg:px-3 xl:px-4 h-[26px] lg:h-[38px] xl:h-[49px] flex items-center rounded-full text-[8px] lg:text-[10px] xl:text-[14px] font-sans tracking-normal hover:opacity-90 transition-opacity whitespace-nowrap"
                        >
                            <span>@KINDGLOW</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
