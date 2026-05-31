import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="w-full px-[8px] lg:px-[16px] xl:px-[20px] pb-[12.25px] lg:pb-[27px] xl:pb-[44px]">
            <div className="w-full max-w-[1400px] mx-auto relative bg-top bg-no-repeat h-[120px] lg:h-[326px] xl:h-[440px] flex flex-col p-[8px] lg:p-[16px] xl:p-[20px] rounded-[16px] lg:rounded-[20px] xl:rounded-[30px]" style={{ backgroundImage: "url('/background_footer.jpg')", backgroundSize: '100% 100%' }}>
                {/* Иконка Telegram */}
                <div className="absolute flex justify-between top-[8px] left-[8px] right-[8px] lg:top-[16px] lg:left-[16px] xl:top-[20px] xl:left-[20px] z-10">
                    <Link href="https://t.me/arshklgnv" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
                        <Image
                            src="/icon_telegram.svg"
                            alt="Telegram"
                            width={50}
                            height={50}
                            className="w-[16px] h-[16px] lg:w-[31px] lg:h-[31px] xl:w-[42px] xl:h-[42px]"
                        />
                    </Link>
                    <Link href="/faq" className="lg:hidden hover:text-brand-purple transition-colors text-[8px] lg:text-[14px] font-normal lowercase">задать вопрос</Link>
                </div>

                <div className="relative h-full w-full">
                    <h2 className="absolute top-[45px] lg:top-[110px] xl:top-[140px] left-0 text-[31px] lg:text-[100px] xl:text-[140px] font-display font-normal leading-none uppercase text-black">
                        Добрая
                    </h2>
                    <h2 className="absolute bottom-[-8px] lg:bottom-[-22px] xl:bottom-[-28px] left-[78px] lg:left-[125px] xl:left-[179px] text-[31px] lg:text-[100px] xl:text-[140px] font-display font-normal leading-none uppercase text-black">
                        Красота
                    </h2>

                    <div className="absolute top-[43px] lg:top-[103px] xl:top-[132px] right-[0px] lg:right-0 w-[215px] lg:w-[396px] xl:w-[500px] space-y-2.5 xl:space-y-3.5">
                        <h4 className="hidden lg:block text-[12px] xl:text-[16px] font-semibold text-black lowercase text-left">подпишись, чтобы узнать о новинках</h4>
                        <div className="flex items-center gap-0.75 lg:gap-2">
                            <div className="flex bg-white rounded-full border border-gray-100 h-[26px] lg:h-[38px] xl:h-[49px] w-full items-center px-2.25 lg:px-2.75 xl:px-3.75">
                                <input
                                    type="email"
                                    placeholder="Введите свою почту"
                                    className="bg-transparent border-none outline-none text-[8px] lg:text-[12px] xl:text-[16px] w-full normal-case placeholder:text-black font-montserrat"
                                />
                            </div>
                            <button className="bg-brand-purple text-white px-2.25 lg:px-3 xl:px-4 h-[26px] lg:h-[38px] xl:h-[49px] rounded-full text-[8px] lg:text-[10px] xl:text-[14px] font-medium hover:opacity-90 transition-opacity whitespace-nowrap uppercase cursor-pointer">
                                ПОДПИСАТЬСЯ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Нижняя часть: Копирайт и ссылки */}
                <div className="absolute bottom-[3.25px] lg:bottom-[12px] xl:bottom-[17.5px] left-[8px] right-[8px] lg:left-[16px] lg:right-[16px] xl:left-[20px] xl:right-[20px] flex justify-between">
                    <p className="text-[8px] lg:text-[12px] xl:text-[16px] font-normal text-black lowercase">
                        @ 2026 kindglow
                    </p>
                    <div className="hidden lg:flex gap-4 text-[12px] xl:text-[16px] font-normal lowercase">
                        <Link href="/faq" className="hover:text-brand-purple transition-colors">задать вопрос</Link>
                        <Link href="/rules" className="hover:text-brand-purple transition-colors">правила сообщества</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
