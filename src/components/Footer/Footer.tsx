import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="w-full px-[8px] md:px-[16px] lg:px-[16px] xl:px-[20px] pb-[20px] xl:pb-[44px]">
            <div
                className="w-full max-w-[1400px] mx-auto relative bg-top bg-no-repeat h-[120px] lg:h-[326px] xl:h-[440px] flex flex-col p-[8px] lg:p-[16px] xl:p-[20px]"
                style={{ backgroundImage: "url('/background_footer.svg')", backgroundSize: '100% 100%' }}
            >
                {/* Иконка Telegram */}
                <div className="absolute top-[8px] left-[8px] lg:top-[20px] lg:left-[16px] xl:top-[20px] xl:left-[20px] z-10">
                    <Link href="https://t.me/arshklgnv" target="_blank" className="hover:scale-110 transition-transform block">
                        <Image
                            src="/icon_telegram.svg"
                            alt="Telegram"
                            width={50}
                            height={50}
                            className="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] xl:w-[50px] xl:h-[50px]"
                        />
                    </Link>
                </div>

                <div className="relative h-full w-full">
                    <h2 className="absolute top-[35px] lg:top-[115px] xl:top-[130px] left-0 text-[28px] md:text-[80px] lg:text-[80px] xl:text-[125px] font-tan-pearl font-normal leading-none uppercase text-black">
                        KIND
                    </h2>
                    <h2 className="absolute bottom-[5px] lg:bottom-0 left-[75px] lg:left-[140px] xl:left-[175px] text-[28px] md:text-[80px] lg:text-[80px] xl:text-[125px] font-tan-pearl font-normal leading-none uppercase text-black">
                        BEAUTY
                    </h2>

                    <div className="absolute top-[8px] lg:top-[100px] xl:top-[131px] right-[8px] lg:right-0 w-[240px] lg:w-full lg:max-w-[400px] xl:max-w-[550px] space-y-2 lg:space-y-4">
                        <h4 className="text-[9px] lg:text-[12px] xl:text-[16px] font-bold tracking-tight text-black lowercase text-left">подпишись, чтобы узнать о новинках</h4>
                        <div className="flex items-center gap-2 xl:gap-3">
                            <div className="flex bg-white rounded-full border border-gray-100 h-[28px] lg:h-[38px] xl:h-[49px] w-full items-center px-3 xl:px-5">
                                <input
                                    type="email"
                                    placeholder="Введите вашу почту"
                                    className="bg-transparent border-none outline-none text-[9px] lg:text-[12px] xl:text-[14px] w-full normal-case placeholder:text-black font-montserrat"
                                />
                            </div>
                            <button className="bg-brand-purple text-white px-3 xl:px-5 h-[28px] lg:h-[38px] xl:h-[49px] rounded-full text-[8px] xl:text-[14px] font-normal tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap uppercase">
                                ПОДПИСАТЬСЯ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Нижняя часть: Копирайт и ссылки */}
                <div className="absolute bottom-[8px] left-[8px] right-[8px] lg:bottom-[16px] lg:left-[16px] lg:right-[16px] xl:bottom-[20px] xl:left-[20px] xl:right-[20px] flex justify-between items-end">
                    <p className="text-[8px] lg:text-[14px] font-normal text-black lowercase">
                        @ 2025 kindglow
                    </p>
                    <div className="flex gap-4 lg:gap-12 text-[8px] lg:text-[14px] font-normal lowercase">
                        <Link href="/faq" className="hover:text-brand-purple transition-colors">задать вопрос</Link>
                        <Link href="/rules" className="hidden lg:block hover:text-brand-purple transition-colors">правила сообщества</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
