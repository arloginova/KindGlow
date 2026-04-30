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
        <section>

            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-6.5 lg:mb-8.75 xl:mb-12.5">
                <h2 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase">
                    УРОКИ И ОБЗОРЫ
                </h2>
                <Link
                    href="/tutorials"
                    className="hidden lg:inline-flex items-center gap-1 bg-brand-purple text-white rounded-full pl-2.75 xl:pl-4.5 pr-1.75 xl:pr-2.25 py-2.75 xl:py-3.5 text-[10px] xl:text-[14px] font-regular font-montserrat uppercase hover:opacity-90 transition-all ml-6 flex-shrink-0">
                    <span>СМОТРЕТЬ ВСЁ</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-4 h-4 xl:w-5 xl:h-5">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>
            </div>

            {/* Сетка видео */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 xl:gap-5">
                {featuredVideos.slice(0, 2).map((video) => {
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
                            <div className="relative w-full h-[253px] lg:h-[425px] xl:h-[470px] rounded-[16px] lg:rounded-[20px] xl:rounded-[30px] overflow-hidden">
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
                                <div className="absolute top-[-1.5px] lg:top-2.5 xl:top-4.5 left-2 lg:left-4 xl:left-5 z-20">
                                    <span className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat font-normal text-white drop-shadow-lg">
                                        /{String(videoNumber).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Длительность (справа вверху) */}
                                <div className="absolute top-2 lg:top-4 xl:top-5 right-2 lg:right-4 xl:right-5 bg-white px-[4.5px] lg:px-1.75 xl:px-2 py-1 xl:py-1.5 rounded-full z-20 inline-flex items-center">
                                    <span className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat text-black leading-none">
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
                                <div className="absolute bottom-2 lg:bottom-4 xl:bottom-5 right-2 lg:right-4 xl:right-5 w-6.75 lg:w-11.5 xl:w-12 h-6.75 lg:h-11.5 xl:h-12 rounded-full border-1 border-white flex items-center justify-center z-20">
                                    <svg className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    );
                })}
                
                {/* Третье видео - только на md и выше */}
                {featuredVideos.slice(2, 3).map((video) => {
                    const videoNumber = getVideoNumberInCategory(video.id);
                    const isHovered = hoveredVideo === video.id;

                    return (
                        <Link
                            key={video.id}
                            href={`/tutorials#video-${video.id}`}
                            className="hidden md:block relative cursor-pointer group"
                            onMouseEnter={() => setHoveredVideo(video.id)}
                            onMouseLeave={() => setHoveredVideo(null)}
                        >
                            {/* Карточка видео */}
                            <div className="relative w-full h-[253px] lg:h-[425px] xl:h-[470px] rounded-[16px] lg:rounded-[20px] xl:rounded-[30px] overflow-hidden">
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
                                <div className="absolute top-[-1.5px] lg:top-2.5 xl:top-4.5 left-2 lg:left-4 xl:left-5 z-20">
                                    <span className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat font-normal text-white drop-shadow-lg">
                                        /{String(videoNumber).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Длительность (справа вверху) */}
                                <div className="absolute top-2 lg:top-4 xl:top-5 right-2 lg:right-4 xl:right-5 bg-white px-[4.5px] lg:px-1.75 xl:px-2 py-1 xl:py-1.5 rounded-full z-20 inline-flex items-center">
                                    <span className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat text-black leading-none">
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
                                <div className="absolute bottom-2 lg:bottom-4 xl:bottom-5 right-2 lg:right-4 xl:right-5 w-6.75 lg:w-11.5 xl:w-12 h-6.75 lg:h-11.5 xl:h-12 rounded-full border-1 border-white flex items-center justify-center z-20">
                                    <svg className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {/* Четвёртое видео - только на xl и выше */}
                {featuredVideos.slice(3, 4).map((video) => {
                    const videoNumber = getVideoNumberInCategory(video.id);
                    const isHovered = hoveredVideo === video.id;

                    return (
                        <Link
                            key={video.id}
                            href={`/tutorials#video-${video.id}`}
                            className="hidden xl:block relative cursor-pointer group"
                            onMouseEnter={() => setHoveredVideo(video.id)}
                            onMouseLeave={() => setHoveredVideo(null)}
                        >
                            {/* Карточка видео */}
                            <div className="relative w-full h-[253px] lg:h-[425px] xl:h-[470px] rounded-[16px] lg:rounded-[20px] xl:rounded-[30px] overflow-hidden">
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
                                <div className="absolute top-[-1.5px] lg:top-2.5 xl:top-4.5 left-2 lg:left-4 xl:left-5 z-20">
                                    <span className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat font-normal text-white drop-shadow-lg">
                                        /{String(videoNumber).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Длительность (справа вверху) */}
                                <div className="absolute top-2 lg:top-4 xl:top-5 right-2 lg:right-4 xl:right-5 bg-white px-[4.5px] lg:px-1.75 xl:px-2 py-1 xl:py-1.5 rounded-full z-20 inline-flex items-center">
                                    <span className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat text-black leading-none">
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
                                <div className="absolute bottom-2 lg:bottom-4 xl:bottom-5 right-2 lg:right-4 xl:right-5 w-6.75 lg:w-11.5 xl:w-12 h-6.75 lg:h-11.5 xl:h-12 rounded-full border-1 border-white flex items-center justify-center z-20">
                                    <svg className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
