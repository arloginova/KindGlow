import Image from 'next/image';
import Link from 'next/link';

export function HeroBanner() {
    return (
        <section className="relative w-full h-[293px] lg:h-[514px] xl:h-[726px] mx-auto overflow-hidden rounded-[16px] lg:rounded-[20px] xl:rounded-[30px] mt-4 xl:mt-2">
            {/* Задний фон */}
            <div className="absolute inset-0 z-0">
                {/* Mobile */}
                <Image
                    src="/home/main_screen_iphone.png"
                    alt="Background"
                    fill
                    className="object-cover lg:hidden"
                    priority
                />
                {/* iPad */}
                <Image
                    src="/home/main_screen_ipad.png"
                    alt="Background"
                    fill
                    className="object-cover hidden lg:block xl:hidden"
                />
                {/* Desktop */}
                <Image
                    src="/home/main_screen_desktop.png"
                    alt="Background"
                    fill
                    className="object-cover hidden xl:block"
                />
            </div>

            {/* Контент баннера */}
            <div className="relative h-full relative w-full max-w-[393px] lg:max-w-[1024px] xl:max-w-[1440px] mx-auto">
                
                {/* Текст сверху слева */}
                <div className="absolute top-[20.5px] lg:top-[44.5px] xl:top-[63.5px] left-[20px] lg:left-[119px] xl:left-[191px] z-10">
                    <p className="text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-3 lg:leading-4 xl:leading-5.5">
                        Твоё пространство
                    </p>
                    <p className="text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-3 lg:leading-4 xl:leading-5.5">
                        Осознанного макияжа
                    </p>
                </div>

                {/* GOOD VIBES - слева */}
                <div className="absolute top-[80px] lg:top-[151.5px] xl:top-[205px] left-[31px] lg:left-[55px] xl:left-[81px] z-10">
                    <h1 className="text-[35px] lg:text-[85px] xl:text-[120px] font-display text-black leading-none uppercase">
                        Ясность
                    </h1>
                </div>
                <div className="absolute top-[118px] lg:top-[239.5px] xl:top-[332px] left-[11px] lg:left-[22px] xl:left-[44px] z-10">
                    <h1 className="text-[35px] lg:text-[85px] xl:text-[120px] font-display text-black leading-none uppercase">
                        Внутри,
                    </h1>
                </div>

                {/* Цветок декорация 1 */}
                <div className="absolute bottom-[10px] lg:bottom-[29px] xl:bottom-[45px] left-[10px] lg:left-[15px] w-[166px] lg:w-[273px] xl:w-[437px] h-[144px] lg:h-[234px] xl:h-[375px] z-0">
                    <Image
                        src="/home/flower_background_1.png"
                        alt="Flower"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Цветок декорация 2 */}
                <div className="absolute top-[-11px] lg:top-[-23px] xl:top-[-29px] right-[21px] lg:right-[46px] xl:right-[58px] w-[144px] lg:w-[287px] xl:w-[373px] h-[138px] lg:h-[274px] xl:h-[358px] z-0">
                    <Image
                        src="/home/flower_background_2.png"
                        alt="Flower"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Цветок декорация 3 */}
                <div className="absolute bottom-[-44px] lg:bottom-[-86px] xl:bottom-[-106px] right-0 lg:right-[16px] xl:right-[19px] w-[89px] lg:w-[170px] xl:w-[215px] h-[204px] lg:h-[388px] xl:h-[490px] z-0 rotate-[30deg]">
                    <Image
                        src="/home/flower_background_3.png"
                        alt="Flower"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Фото девушки */}
                <div className="absolute top-[79px] lg:top-[83px] xl:top-[106px] right-[73px] lg:right-[274px] xl:right-auto xl:left-[706px] w-[91px] lg:w-[209px] xl:w-[302px] h-[114px] lg:h-[261px] xl:h-[377px] overflow-hidden rounded-[16px] lg:rounded-[30px] xl:rounded-[50px] rotate-[15.95deg] border-[0.5px] border-black lg:border-black lg:border shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <Image
                        src="/home/photo_girl.jpg"
                        alt="Model"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* GOOD MAKEUP - справа */}
                <div className="absolute top-[190px] lg:top-[320.5px] xl:top-[450px] right-[14.5px] lg:right-[20px] xl:right-[49px] z-10">
                    <h1 className="text-[35px] lg:text-[85px] xl:text-[120px] font-display text-black leading-none uppercase text-right">
                        Сияние
                    </h1>
                </div>
                <div className="absolute top-[228px] lg:top-[409px] xl:top-[577px] right-[34.5px] lg:right-[45px] xl:right-[83px] z-10">
                    <h1 className="text-[35px] lg:text-[85px] xl:text-[120px] font-display text-black leading-none uppercase text-right">
                        Снаружи
                    </h1>
                </div>

                {/* Кнопка "Уроки макияжа" */}
                <Link
                    href="/tutorials"
                    className="absolute bottom-[116px] lg:bottom-[202px] xl:bottom-[294px] left-[152px] lg:left-[391px] xl:left-[569px] inline-flex items-center gap-[5px] lg:gap-[5px] xl:gap-[9px] xl:gap-2 bg-brand-purple text-white rounded-full pl-2 lg:pl-2.5 xl:pl-4 pr-px lg:pr-1 xl:pr-1 py-px lg:py-1 xl:py-1 text-[7px] lg:text-[13px] xl:text-[16px] font-regular font-montserrat uppercase hover:opacity-90 transition-all z-10"
                >
                    <span>Уроки макияжа</span>
                    <div className="w-[23px] h-[23px] lg:w-[38px] lg:h-[38px] xl:w-[52px] xl:h-[52px] bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <svg width="28" height="28" viewBox="0 0 20 20" fill="none" className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 xl:w-6 xl:h-6">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </Link>

                {/* Текст снизу слева с бейджами */}
                <div className="absolute bottom-[19.5px] lg:bottom-[43.5px] xl:bottom-[64px] left-[20px] lg:left-[119px] xl:left-[191px] z-10">
                    <div className="flex flex-col gap-0">
                        <p className="text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-3 lg:leading-4 xl:leading-5.5">
                            Лучшие
                        </p>
                        <p className="text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-3 lg:leading-4 xl:leading-5.5">
                            Cruelty-free
                        </p>
                        <p className="text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-3 lg:leading-4 xl:leading-5.5">
                            Vegan
                        </p>
                        <p className="text-[10px] lg:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-3 lg:leading-4 xl:leading-5.5">
                            Zero-waste бренды
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
