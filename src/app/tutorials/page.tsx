'use client';

import { useState, useRef, useEffect } from 'react';
import { videoCategories } from '@/data/videos';
import { Video } from '@/types/video';

export default function TutorialsPage() {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

    const openVideoModal = (video: Video) => {
        setSelectedVideo(video);
        setIsDescriptionExpanded(false);
        setIsPlaying(true);
        setVolume(1);
        setShowVolumeSlider(false);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
        setIsDescriptionExpanded(false);
        setIsPlaying(true);
        setShowVolumeSlider(false);
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            videoRef.current.muted = newVolume === 0;
        }
    };

    // Функция для получения номера видео в категории
    const getVideoNumberInCategory = (video: Video) => {
        const category = videoCategories.find(cat => cat.id === video.category);
        if (!category) return 1;
        const index = category.videos.findIndex(v => v.id === video.id);
        return index + 1;
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1440px] mx-auto px-[8px] md:px-[16px] xl:px-[20px] py-8 md:py-12 xl:py-16">
                {/* Категории видео */}
                {videoCategories.map((category) => (
                    <section key={category.id} className="mb-12 md:mb-16 xl:mb-20">
                        {/* Название категории */}
                        <h2 className="text-[20px] md:text-[28px] xl:text-[36px] font-montserrat font-medium text-black uppercase mb-6 md:mb-8 xl:mb-10">
                            {category.name}
                        </h2>

                        {/* Сетка видео */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                            {category.videos.map((video) => {
                                const videoNumber = getVideoNumberInCategory(video);
                                const isHovered = hoveredVideo === video.id;

                                return (
                                    <div
                                        key={video.id}
                                        className="relative cursor-pointer group"
                                        onClick={() => openVideoModal(video)}
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
                                            <div className="absolute top-3 md:top-4 xl:top-5 right-3 md:right-4 xl:right-5 bg-white/90 backdrop-blur-sm rounded-full px-3 md:px-4 py-1 md:py-1.5 z-20">
                                                <span className="text-[10px] md:text-[12px] xl:text-[14px] font-montserrat font-medium text-black">
                                                    {video.duration || '00:00'}
                                                </span>
                                            </div>

                                            {/* Фиолетовая плашка с описанием при наведении */}
                                            <div className={`absolute inset-0 bg-brand-purple/70 backdrop-blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} z-10 p-4 md:p-6 xl:p-8 flex flex-col justify-center`}>
                                                {/* Контент в центре */}
                                                <div className="space-y-3 md:space-y-4">
                                                    {/* Заголовок */}
                                                    <h3 className="text-white text-[14px] md:text-[18px] xl:text-[20px] font-montserrat font-medium">
                                                        {video.title}
                                                    </h3>

                                                    {/* Описание */}
                                                    <p className="text-white text-[10px] md:text-[12px] xl:text-[14px] font-montserrat leading-relaxed whitespace-pre-line">
                                                        {video.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Кнопка перехода (справа внизу) */}
                                            <div className={`absolute bottom-4 md:bottom-6 xl:bottom-8 right-4 md:right-6 xl:right-8 w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${isHovered ? 'bg-white' : 'bg-brand-purple/80'}`}>
                                                <svg className={`w-5 h-5 md:w-6 md:h-6 xl:w-7 xl:h-7 transition-colors duration-300 ${isHovered ? 'text-brand-purple' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>

            {/* Модальное окно для видео (как Reels) */}
            {selectedVideo && (
                <div 
                    className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 md:p-8"
                    onClick={closeVideoModal}
                >
                    <div 
                        className="relative w-full max-w-[400px] md:max-w-[450px] xl:max-w-[500px] aspect-[9/16]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Кнопка закрытия */}
                        <button
                            onClick={closeVideoModal}
                            className="absolute -top-12 right-0 z-50 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                        >
                            <svg 
                                className="w-6 h-6 text-white" 
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

                        {/* Вертикальное видео */}
                        <div className="relative w-full h-full rounded-[16px] md:rounded-[24px] overflow-hidden bg-black">
                            {selectedVideo.videoUrl ? (
                                <>
                                    {selectedVideo.videoUrl.includes('dropbox') ? (
                                        <video
                                            ref={videoRef}
                                            src={selectedVideo.videoUrl}
                                            className="w-full h-full object-cover cursor-pointer"
                                            autoPlay
                                            loop
                                            playsInline
                                            onClick={togglePlayPause}
                                        />
                                    ) : (
                                        <iframe
                                            src={`${selectedVideo.videoUrl}?autoplay=1&loop=1&autopause=0`}
                                            className="w-full h-full"
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            allowFullScreen
                                            frameBorder="0"
                                        />
                                    )}

                                    {/* Иконка Play/Pause при клике */}
                                    {!isPlaying && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Кнопка звука справа с слайдером */}
                                    <div 
                                        className="absolute top-4 right-4 z-30 flex items-center gap-2"
                                        onMouseEnter={() => setShowVolumeSlider(true)}
                                        onMouseLeave={() => setShowVolumeSlider(false)}
                                    >
                                        {/* Слайдер громкости */}
                                        <div className={`transition-all duration-300 ${showVolumeSlider ? 'opacity-100 w-20 md:w-24' : 'opacity-0 w-0'}`}>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                            />
                                        </div>

                                        {/* Иконка звука */}
                                        <button
                                            className="w-10 h-10 md:w-12 md:h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-all flex-shrink-0"
                                        >
                                            {volume === 0 ? (
                                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                                </svg>
                                            ) : volume < 0.5 ? (
                                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m-9.95-1.536H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <p>Видео скоро будет добавлено</p>
                                </div>
                            )}

                            {/* Описание снизу (как в Reels) */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-6 pointer-events-none">
                                <div className="max-h-[200px] overflow-hidden pointer-events-auto">
                                    <h3 className="text-white text-[16px] md:text-[18px] font-montserrat font-medium mb-2">
                                        {selectedVideo.title}
                                    </h3>
                                    <p 
                                        className={`text-white text-[12px] md:text-[14px] font-montserrat leading-relaxed whitespace-pre-line transition-all duration-300 ${isDescriptionExpanded ? 'line-clamp-none' : 'line-clamp-3'}`}
                                    >
                                        {selectedVideo.description}
                                    </p>
                                    {selectedVideo.description.length > 100 && (
                                        <button
                                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                            className="text-white/80 text-[12px] md:text-[14px] font-montserrat mt-2 hover:text-white transition-colors"
                                        >
                                            {isDescriptionExpanded ? 'Свернуть' : 'Ещё...'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
