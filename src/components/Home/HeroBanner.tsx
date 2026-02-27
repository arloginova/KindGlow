import Image from 'next/image';
import Link from 'next/link';

export function HeroBanner() {
    return (
        <section className="relative w-full max-w-[377px] md:max-w-[992px] xl:max-w-[1400px] h-[293px] md:h-[514px] xl:h-[726px] mx-auto overflow-hidden rounded-[16px] md:rounded-[24px] xl:rounded-[32px]">
            {/* Задний фон */}
            <div className="absolute inset-0 z-0">
                {/* Mobile */}
                <Image
                    src="/home/main_screen_iphone.svg"
                    alt="Background"
                    fill
                    className="object-cover md:hidden"
                    priority
                />
                {/* iPad */}
                <Image
                    src="/home/main_screen_ipad.svg"
                    alt="Background"
                    fill
                    className="object-cover hidden md:block xl:hidden"
                    priority
                />
                {/* Desktop */}
                <Image
                    src="/home/main_screen_desktop.svg"
                    alt="Background"
                    fill
                    className="object-cover hidden xl:block"
                    priority
                />
            </div>

            {/* Контент баннера */}
            <div className="relative z-10 h-full">
                
                {/* Текст сверху слева */}
                <div className="absolute top-[20px] md:top-[44px] xl:top-[64px] left-[20px] md:left-[119px] xl:left-[185px]">
                    <p className="text-[10px] md:text-[13px] xl:text-[18px] font-montserrat text-black uppercase tracking-wider mb-1">
                        ТВОЁ ПРОСТРАНСТВО
                    </p>
                    <p className="text-[10px] md:text-[13px] xl:text-[18px] font-montserrat text-black uppercase tracking-wider">
                        ОСОЗНАННОГО МАКИЯЖА
                    </p>
                </div>

                {/* GOOD VIBES - слева */}
                <div className="absolute top-[79px] md:top-[132px] xl:top-[180px] left-[68px] md:left-[123px] xl:left-[190px]">
                    <h1 className="text-[32px] md:text-[80px] xl:text-[125px] font-tan-pearl text-black leading-none uppercase">
                        GOOD
                    </h1>
                </div>
                <div className="absolute top-[117px] md:top-[230px] xl:top-[330px] left-[25px] md:left-[32px] xl:left-[25px]">
                    <h1 className="text-[32px] md:text-[80px] xl:text-[125px] font-tan-pearl text-black leading-none uppercase">
                        VIBES,
                    </h1>
                </div>

                {/* Фото девушки */}
                <div className="absolute top-[18px] md:top-[31px] xl:top-[85px] left-[177px] md:left-[466px] xl:left-[600px] w-[91px] h-[114px] md:w-[209px] md:h-[300px] xl:w-[486px] xl:h-[420px]">
                    {/* Mobile */}
                    <Image
                        src="/home/photo_iphone.png"
                        alt="Model"
                        fill
                        className="object-contain md:hidden"
                        priority
                    />
                    {/* iPad */}
                    <Image
                        src="/home/photo_ipad.png"
                        alt="Model"
                        fill
                        className="object-contain hidden md:block xl:hidden"
                        priority
                    />
                    {/* Desktop */}
                    <Image
                        src="/home/photo_desktop.png"
                        alt="Model"
                        fill
                        className="object-contain hidden xl:block"
                        priority
                    />
                </div>

                {/* GOOD MAKEUP - справа */}
                <div className="absolute top-[190px] md:top-[309px] xl:top-[400px] right-[40px] md:right-[67px] xl:right-[100px]">
                    <h1 className="text-[30px] md:text-[80px] xl:text-[125px] font-tan-pearl text-black leading-none uppercase text-right">
                        GOOD
                    </h1>
                </div>
                <div className="absolute top-[230px] md:top-[403px] xl:top-[550px] right-[20px] md:right-[43px] xl:right-[40px]">
                    <h1 className="text-[30px] md:text-[80px] xl:text-[125px] font-tan-pearl text-black leading-none uppercase text-right">
                        MAKEUP
                    </h1>
                </div>

                {/* Кнопка "Уроки макияжа" */}
                <Link
                    href="/tutorials"
                    className="absolute bottom-[116px] md:bottom-[185px] xl:bottom-[294px] left-1/2 -translate-x-1/2 inline-flex items-center gap-2 md:gap-2 xl:gap-2 bg-brand-purple text-white rounded-full pl-2 md:pl-3 xl:pl-4 pr-1 md:pr-1 xl:pr-1 py-1 md:py-1 xl:py-1 text-[7px] md:text-[13px] xl:text-[16px] font-regular font-montserrat uppercase tracking-wide hover:opacity-90 transition-all"
                >
                    <span>УРОКИ МАКИЯЖА</span>
                    <div className="w-[20px] h-[20px] md:w-[38px] md:h-[38px] xl:w-[52px] xl:h-[52px] bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <svg width="28" height="28" viewBox="0 0 20 20" fill="none" className="w-2 h-2 md:w-4 md:h-4 xl:w-6 xl:h-6">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </Link>

                {/* Текст снизу слева с бейджами */}
                <div className="absolute bottom-[20px] md:bottom-[44px] xl:bottom-[60px] left-[20px] md:left-[119px] xl:left-[185px]">
                    <div className="flex flex-col gap-0">
                        <p className="text-[10px] md:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-tight ">
                            ЛУЧШИЕ
                        </p>
                        <p className="text-[10px] md:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-tight">
                            CRUELTY-FREE
                        </p>
                        <p className="text-[10px] md:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-tight">
                            VEGAN
                        </p>
                        <p className="text-[10px] md:text-[13px] xl:text-[18px] font-montserrat text-black uppercase leading-tight">
                            ZERO-WASTE БРЕНДЫ
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
