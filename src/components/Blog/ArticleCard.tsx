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
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E8E0F0] via-[#D4C8E8] to-[#C8D8E8]" />
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
                {/* Бейджи */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 xl:top-5 xl:left-5 flex flex-col items-start gap-1">
                    {article.badges.map((badge) => (
                        <span
                            key={badge}
                            className="text-[8px] md:text-[10px] xl:text-[16px] font-regular font-montserrat leading-tight bg-white px-2 py-1 rounded-full"
                        >
                            #{badge}
                        </span>
                    ))}
                </div>

                {/* Квадратная картинка справа вверху */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 xl:top-5 xl:right-5 w-[53px] h-[53px] md:w-[103px] md:h-[103px] xl:w-[146px] xl:h-[146px] rounded-[25px] overflow-hidden shadow-md">
                    {article.squareImage ? (
                        <Image
                            src={article.squareImage}
                            alt=""
                            fill
                            className="object-cover"
                        />
                    ) : (
                        /* Заглушка квадратной картинки */
                        <div className="w-full h-full bg-gradient-to-br from-[#D4C8E8] to-[#C8D8E8] flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/40" />
                        </div>
                    )}
                </div>

                {/* Контент снизу */}
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 lg:p-5">

                    {/* Название и описание + кнопка */}
                    <div className="flex items-end justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-[8px] md:text-[12px] xl:text-[16px] font-bold text-black font-montserrat leading-tight line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="text-[8px] md:text-[12px] xl:text-[16px] text-black font-montserrat font-normal mt-0.5 line-clamp-1 normal-case">
                                {article.description}
                            </p>
                        </div>

                        {/* Кнопка читать — только на десктопе */}
                        <button className="hidden xl:flex flex-shrink-0 items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-black rounded-full px-7 py-1 text-[16px] font-medium font-montserrat text-black whitespace-nowrap transition-all duration-200 group-hover:bg-black group-hover:text-white">
                            читать
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            >
                                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
