'use client';

import { useState } from 'react';
import Link from 'next/link';
import { videos } from '@/data/videos';

// Пока используем первые видео, потом можно будет указать конкретные ID
const FEATURED_VIDEO_IDS = [1, 2, 3, 4]; // Можно изменить на нужные ID

export function VideosSection() {
    const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
    
    // Получаем избранные видео
    const featuredVideos = videos.filter(v => FEATURED_VIDEO_IDS.includes(v.id));

    return (
        <section className="py-8 md:py-12 xl:py-16">
            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-6 md:mb-8 xl:mb-10">
                <h2 className="text-[24px] md:text-[36px] xl:text-[48px] font-montserrat font-medium text-black uppercase">
                    УРОКИ И ОБЗОРЫ
                </h2>

                <Link
                    href="/tutorials"
                    className="hidden md:inline-flex items-center gap-2 bg-brand-purple text-white rounded-full px-6 xl:px-5 py-2 xl:py-3 text-[12px] xl:text-[14px] font-regular font-montserrat uppercase tracking-wide hover:opacity-90 transition-all ml-6 flex-shrink-0"
                >
                    <span>СМОТРЕТЬ ВСЁ</span>
                    <span className="text-[16px] xl:text-[20px]">&gt;</span>
                </Link>
            </div>

            {/* Сетка видео */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                {featuredVideos.map((video) => (
                    <Link
                        key={video.id}
                        href={`/tutorials#video-${video.id}`}
                        className="relative cursor-pointer group"
                        onMouseEnter={() => setHoveredVideo(video.id)}
                        onMouseLeave={() => setHoveredVideo(null)}
                    >
                        {/* Превью видео */}
                        <div className="relative w-full h-[253px] md:h-[425px] xl:h-[470px] bg-gray-200 rounded-lg overflow-hidden">
                            {/* Placeholder для превью */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-purple/20 to-brand-purple/5">
                                <svg 
                                    className="w-12 h-12 md:w-16 md:h-16 text-brand-purple"
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>

                            {/* ID видео в углу */}
                            <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                                <span className="text-[10px] md:text-[12px] font-montserrat font-medium text-black">
                                    {String(video.id).padStart(2, '0')}
                                </span>
                            </div>

                            {/* Длительность в углу (placeholder) */}
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                                <span className="text-[10px] md:text-[12px] font-montserrat text-white">
                                    00:00
                                </span>
                            </div>

                            {/* Название при наведении */}
                            {hoveredVideo === video.id && (
                                <div className="absolute inset-0 bg-black/90 p-4 md:p-6 flex flex-col justify-center transition-all duration-300">
                                    <h3 className="text-white text-[12px] md:text-[14px] xl:text-[16px] font-montserrat font-medium uppercase mb-2 md:mb-3">
                                        {video.title}
                                    </h3>
                                    <p className="text-white text-[10px] md:text-[12px] xl:text-[14px] font-montserrat leading-relaxed line-clamp-4">
                                        {video.description.split('\n')[0]}
                                    </p>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
