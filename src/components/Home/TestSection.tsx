import Image from 'next/image';
import Link from 'next/link';

export function TestSection() {
    return (
        <section className="py-8 md:py-12 xl:py-16">
            {/* Контейнер с рамкой */}
            <div className="relative w-full  rounded-[16px] md:rounded-[24px] xl:rounded-[32px] overflow-hidden">
                
                {/* Контент */}
                <div className="relative flex items-center justify-between  min-h-[200px] md:min-h-[280px] xl:min-h-[320px]">
                    
                    {/* Левая часть: текст и кнопка */}
                    <div className="flex-1 max-w-[650px] z-10">
                        <h2 className="text-[18px] md:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-tight mb-1 md:mb-4">
                            НЕ ЗНАЕШЬ КАКОЙ<br />УХОД ПОДОЙДЁТ ТЕБЕ?
                        </h2>
                        
                        <p className="text-[7px] md:text-[12px] xl:text-[16px] font-semibold font-montserrat leading-snug text-black mb-3 md:mb-4">
                            Пройди тест и мы подберём средства,<br />которые подойдут именно тебе
                        </p>

                        {/* Кнопка с звездочкой */}
                        <div className="flex items-center gap-3 md:gap-4">
                            {/* Звездочка */}
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
                                href="/test"
                                className="inline-flex items-center gap-2 border-1 border-brand-purple text-brand-purple rounded-full px-2 md:px-3 xl:px-4 py-2 md:py-3 text-[12px] md:text-[14px] xl:text-[16px] font-medium font-montserrat uppercase tracking-wide hover:bg-brand-purple hover:text-white transition-all"
                            >
                                <span>ПРОЙТИ ТЕСТ</span>
                                <span className="text-[6px] md:text-[13px] xl:text-[20px]">&gt;</span>
                            </Link>
                        </div>
                    </div>

                    {/* Правая часть: картинка цветка */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[127px] h-[127px] md:w-[280px] md:h-[280px] xl:w-[350px] xl:h-[350px] z-0">
                        {/* Mobile */}
                        <Image
                            src="/home/flower_iphone.svg"
                            alt="Flower decoration"
                            fill
                            className="object-contain md:hidden"
                        />
                        {/* iPad */}
                        <Image
                            src="/home/flower_ipad.svg"
                            alt="Flower decoration"
                            fill
                            className="object-contain hidden md:block xl:hidden"
                        />
                        {/* Desktop */}
                        <Image
                            src="/home/flower_desktop.svg"
                            alt="Flower decoration"
                            fill
                            className="object-contain hidden xl:block"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
