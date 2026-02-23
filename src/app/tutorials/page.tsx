'use client';

import { useState } from 'react';
import { videoCategories } from '@/data/videos';
import { Video } from '@/types/video';

export default function TutorialsPage() {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

    const openVideoModal = (video: Video) => {
        setSelectedVideo(video);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10 py-8 xl:py-12">
            

                {/* Категории видео */}
                {videoCategories.map((category) => (
                    <section key={category.id} className="mb-12 md:mb-16 xl:mb-20">
                        {/* Название категории */}
                        <h2 className="text-[20px] md:text-[28px] xl:text-[36px] font-montserrat font-medium text-black uppercase mb-6 md:mb-8 xl:mb-10">
                            {category.name}
                        </h2>

                        {/* Сетка видео */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                            {category.videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="relative cursor-pointer group"
                                    onClick={() => openVideoModal(video)}
                                    onMouseEnter={() => setHoveredVideo(video.id)}
                                    onMouseLeave={() => setHoveredVideo(null)}
                                >
                                    {/* Превью видео */}
                                    <div className="relative w-[185px] h-[253px] md:w-[320px] md:h-[425px] xl:w-[335px] xl:h-[470px] bg-gray-200 rounded-lg overflow-hidden">
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

                                        {/* Описание при наведении */}
                                        {hoveredVideo === video.id && (
                                            <div className="absolute inset-0 bg-black/90 p-4 md:p-6 flex flex-col justify-center transition-all duration-300">
                                                <h3 className="text-white text-[14px] md:text-[16px] xl:text-[18px] font-montserrat font-medium uppercase mb-3 md:mb-4">
                                                    {video.title}
                                                </h3>
                                                <p className="text-white text-[10px] md:text-[12px] xl:text-[14px] font-montserrat leading-relaxed whitespace-pre-line">
                                                    {video.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Модальное окно для видео */}
            {selectedVideo && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={closeVideoModal}
                >
                    <div 
                        className="relative w-full max-w-[1200px] bg-white rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Кнопка закрытия */}
                        <button
                            onClick={closeVideoModal}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all"
                        >
                            <svg 
                                className="w-6 h-6 text-black" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            </svg>
                        </button>

                        {/* Видео */}
                        <div className="relative w-full aspect-video bg-black">
                            {selectedVideo.videoUrl ? (
                                <iframe
                                    src={selectedVideo.videoUrl.includes('?') ? selectedVideo.videoUrl : `${selectedVideo.videoUrl}?embed=1`}
                                    className="w-full h-full"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                    frameBorder="0"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <p>Видео скоро будет добавлено</p>
                                </div>
                            )}
                        </div>

                        {/* Информация о видео */}
                        <div className="p-6 md:p-8">
                            <h3 className="text-[20px] md:text-[24px] xl:text-[28px] font-montserrat font-medium text-black uppercase mb-4">
                                {selectedVideo.title}
                            </h3>
                            <p className="text-[14px] md:text-[16px] text-black font-montserrat leading-relaxed whitespace-pre-line">
                                {selectedVideo.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
