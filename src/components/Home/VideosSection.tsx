'use client';

import { useState } from 'react';
import Link from 'next/link';
import { videos, videoCategories } from '@/data/videos';

const FEATURED_VIDEO_IDS = [1, 2, 3, 4];

export function VideosSection() {
    const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
    
    const featuredVideos = videos.filter(v => FEATURED_VIDEO_IDS.includes(v.id));

    // Функция для получения номера видео в категории
    const getVideoNumberInCategory = (videoId: number) => {
        const video = videos.find(v => v.id === videoId);
        if (!video) return 1;
        
        const category = videoCategories.find(cat => cat.id === video.category);
        if (!category) return 1;
        
        const index = category.videos.findIndex(v => v.id === videoId);
        return index + 1;
    };

    return (
        <section className="py-8 md:py-[60px] xl:py-[76px]">
            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-6 md:mb-8 xl:mb-10">
                <h2 className="text-[24px] md:text-[36px] xl:text-[48px] font-montserrat font-medium text-black uppercase">
                    УРОКИ И ОБЗОРЫ
                </h2>

                <Link
                    href="/tutorials"
                    className="hidden md:inline-flex items-center gap-2 bg-brand-purple text-white rounded-full px-5 py-3 text-[14px] font-regular font-montserrat uppercase tracking-wide hover:opacity-90 transition-all ml-6 flex-shrink-0"
                >
                    <span>СМОТРЕТЬ ВСЁ</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>
            </div>

            {/* Сетка видео */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                {featuredVideos.map((video) => {
                    const videoNumber = getVideoNumberInCategory(video.id);
                    const isHovered = hoveredVideo === video.id;

                    return (
                        <Link
                            key={video.id}
                            href={`/tutorials#video-${video.id}`}
                            className="relative cursor-pointer group"
                            onMouseEnter={() => setHoveredVideo(video.id)}
                            onMouseLeave={() => setHoveredVideo(null)}
                        >
                            {/* Карточка видео */}
                            <div className="relative w-full h-[253px] md:h-[425px] xl:h-[470px] rounded-[16px] md:rounded-[24px] overflow-hidden">
                                {/* Видео превью */}
                                {video.videoUrl ? (
                                    <video
                                        src={video.videoUrl}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        muted
                                        playsInline
                                        preload="metadata"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-200" />
                                )}

                                {/* Номер видео (слева вверху) */}
                                <div className="absolute top-3 md:top-4 xl:top-5 left-3 md:left-4 xl:left-5 z-20">
                                    <span className="text-[12px] md:text-[16px] xl:text-[18px] font-montserrat font-normal text-white drop-shadow-lg">
                                        /{String(videoNumber).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Длительность (справа вверху) */}
                                <div className="absolute top-3 md:top-4 xl:top-5 right-3 md:right-4 xl:right-5 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-0.5 md:py-1 z-20">
                                    <span className="text-[10px] md:text-[12px] xl:text-[14px] font-montserrat font-medium text-black">
                                        {video.duration || '00:00'}
                                    </span>
                                </div>

                                {/* Hover overlay - только на md и выше */}
                                <div className={`hidden md:block absolute inset-0 bg-brand-purple/70 backdrop-blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} z-10 pt-24 md:pt-28 xl:pt-32`}>
                                    <div className="px-4 md:px-6 xl:px-8 space-y-2 md:space-y-3 text-left">
                                        <h3 className="text-white text-[14px] md:text-[18px] xl:text-[22px] font-montserrat font-medium">
                                            {video.title}
                                        </h3>
                                        <p className="text-white text-[10px] md:text-[12px] xl:text-[14px] font-montserrat leading-relaxed line-clamp-5">
                                            {video.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Кнопка с белым бордером */}
                                <div className="absolute bottom-4 md:bottom-6 xl:bottom-8 right-4 md:right-6 xl:right-8 w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 rounded-full border-1 border-white flex items-center justify-center z-20">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 xl:w-7 xl:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
