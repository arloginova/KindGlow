import Image from 'next/image';
import Link from 'next/link';

export function TestSection() {
    return (
        <section className="py-8 sm:py-10 md:py-12 lg:py-[60px] xl:py-[76px]">
            {/* Контейнер с рамкой */}
            <div className="relative w-full rounded-[16px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[24px] xl:rounded-[32px]">
                

                
                {/* Контент */}
                <div className="relative flex items-center justify-between min-h-[200px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[280px] xl:min-h-[320px] px-4 sm:px-6 md:px-7 lg:px-8 xl:px-12">
                    
                    {/* Левая часть: текст и кнопка */}
                    <div className="flex-1 max-w-[650px] z-10">
                        <h2 className="text-[18px] sm:text-[26px] md:text-[30px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-tight mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                            НЕ ЗНАЕШЬ КАКОЙ<br />УХОД ПОДОЙДЁТ ТЕБЕ?
                        </h2>
                        
                        <p className="text-[7px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[16px] font-semibold font-montserrat leading-snug text-black mb-3 sm:mb-3.5 md:mb-3.5 lg:mb-4">
                            Пройди тест и мы подберём средства,<br />которые подойдут именно тебе
                        </p>

                        {/* Кнопка с звездочкой */}
                        <div className="flex items-center gap-3 md:gap-3">
                            {/* Звездочка */}
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
                                href="/test"
                                className="inline-flex items-center gap-2 border-1 border-brand-purple text-brand-purple rounded-full px-2 sm:px-2.5 md:px-2.5 lg:px-3 xl:px-4 py-2 sm:py-2.5 md:py-2.5 lg:py-3 text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] xl:text-[16px] font-medium font-montserrat uppercase tracking-wide hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all"
                            >
                                <span>ПРОЙТИ ТЕСТ</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Правая часть: картинка цветка */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[127px] h-[127px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] xl:w-[320px] xl:h-[320px] z-5">
                        <Image
                            src="/home/flower_iphone.svg"
                            alt="Flower decoration"
                            width={127}
                            height={127}
                            className="w-full h-full object-contain lg:hidden"
                        />
                        <Image
                            src="/home/flower_ipad.svg"
                            alt="Flower decoration"
                            width={280}
                            height={280}
                            className="w-full h-full object-contain hidden lg:block xl:hidden"
                        />
                        <Image
                            src="/home/flower_desktop.svg"
                            alt="Flower decoration"
                            width={350}
                            height={350}
                            className="w-full h-full object-contain hidden xl:block"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
