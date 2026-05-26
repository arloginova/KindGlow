import Image from 'next/image';
import Link from 'next/link';

export function TestSection() {
    return (
        <section className="pt-[60.5px] lg:pt-30 xl:pt-34">
                            
            {/* Контент */}
            <div className="relative flex items-center justify-between">
                    
                {/* Левая часть: текст и кнопка */}
                <div className="flex-1 max-w-[650px] z-10">
                    <h2 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-5.5 lg:leading-10.75 xl:leading-15.25 mb-[4.5px] lg:mb-3 xl:mb-3.25">
                        НЕ ЗНАЕШЬ КАКОЙ<br />УХОД ПОДОЙДЁТ ТЕБЕ?
                    </h2>
                        
                    <p className="text-[9px] lg:text-[12px] xl:text-[16px] font-semibold font-montserrat leading-2.25 lg:leading-3.75 xl:leading-5 text-black mb-[12.5px] lg:mb-5 xl:mb-7">
                        Пройди тест и мы подберём средства,<br />которые подойдут именно тебе
                    </p>

                    {/* Кнопка с звездочкой */}
                    <div className="flex items-center gap-1 lg:gap-1 xl:gap-2">
                        {/* Звездочка */}
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
                            href="/test"
                            className="shrink-0 inline-flex items-center whitespace-nowrap leading-none gap-1.75 lg:gap-2 xl:gap-3 border-[0.5px] lg:border border-brand-purple text-brand-purple rounded-full px-1.75 lg:px-3.25 xl:px-4 py-1.75 lg:py-3.25 xl:py-4.25 text-[8px] lg:text-[13px] xl:text-[16px] font-montserrat uppercase hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all"
                        >
                            <span>ПРОЙТИ ТЕСТ</span>
    
                            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className="w-1.25 lg:w-1.75 xl:w-2.25 h-1.25 lg:h-1.75 xl:h-2.25">
                                <path d="M0.248057 0.24999H4.20507M4.20507 0.24999V4.207M4.20507 0.24999L0.248057 4.207" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Правая часть: картинка цветка */}
                <div className="absolute right-0 lg:right-0 xl:right-0.5 -top-1.75 lg:-top-15 xl:-top-14 w-[127px] h-[122px] lg:w-[328px] lg:h-[315px] xl:w-[382px] xl:h-[377px] z-5">
                    <Image
                        src="/home/flower_mask.png"
                        alt="Flower decoration"
                        fill
                        className="w-full h-full object-contain"
                        priority
                        />
                </div>
            </div>
        </section>
    );
}
