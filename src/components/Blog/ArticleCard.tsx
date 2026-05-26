'use client';

import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link href={`/blog/${article.id}`} className="block group">
            <div
                className="relative overflow-hidden rounded-[16px] w-full aspect-[453/273]"
            >
                {/* Фоновое изображение */}
                <div className="absolute inset-0">
                    {article.backgroundImage ? (
                        <Image
                            src={article.backgroundImage}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E8E0F0] via-[#D4C8E8] to-[#C8D8E8]" />
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
                {/* Бейджи */}
                <div className="absolute top-2 left-2 lg:top-4 lg:left-4 xl:top-5 xl:left-5 flex flex-col items-start gap-0.5 lg:gap-0.25 xl:gap-1">
                    {article.badges.map((badge) => (
                        <span
                            key={badge}
                            className="text-[8px] lg:text-[12px] xl:text-[16px] font-regular font-montserrat leading-tight bg-white px-1.25 lg:px-1.5 xl:px-2 py-0.75 lg:py-1.5 rounded-full"
                        >
                            #{badge}
                        </span>
                    ))}
                </div>

                {/* Квадратная картинка справа вверху */}
                <div className="absolute top-2 right-2 lg:top-4 lg:right-4 xl:top-5 xl:right-5 w-[53px] h-[53px] lg:w-[103px] lg:h-[103px] xl:w-[146px] xl:h-[146px] rounded-[10px] lg:rounded-[20px] xl:rounded-[24px] overflow-hidden shadow-md">
                    {article.squareImage ? (
                        <Image
                            src={article.squareImage}
                            alt=""
                            fill
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        /* Заглушка квадратной картинки */
                        <div className="w-full h-full bg-gradient-to-br from-[#D4C8E8] to-[#C8D8E8] flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/40" />
                        </div>
                    )}
                </div>

                {/* Контент снизу */}
                <div className="absolute bottom-0 left-0 right-0 px-2.25 lg:px-4 xl:px-5 py-1.75 lg:py-3.25 xl:py-4.5">

                    {/* Название и описание + кнопка */}
                    <div className="flex items-end justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-[9px] lg:text-[12px] xl:text-[16px] font-semibold text-black font-montserrat line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="text-[9px] lg:text-[12px] xl:text-[16px] text-black font-montserrat font-normal line-clamp-1 normal-case">
                                {article.description}
                            </p>
                        </div>

                        {/* Кнопка читать — только на десктопе */}
                        <button className="hidden xl:flex flex-shrink-0 items-center gap-3 bg-white border border-black rounded-full px-7.75 py-1 text-[16px] font-montserrat text-black whitespace-nowrap transition-all duration-200 group-hover:bg-gray-200 group-hover:border-gray-400 mb-0.5 cursor-pointer">
                            читать
                            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" className="mt-0.75">
                                <path d="M0.499813 0.498911H6.25019M6.25019 0.498911V6.22378M6.25019 0.498911L0.499813 6.22378" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
