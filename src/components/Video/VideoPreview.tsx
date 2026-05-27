'use client';

import { useEffect, useRef, useState } from 'react';
import { getVideoStreamUrl } from '@/lib/videoUrls';

type VideoPreviewProps = {
    videoId: number;
    className?: string;
};

export function VideoPreview({ videoId, className }: VideoPreviewProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                const nextIsVisible = entry.isIntersecting;
                setIsVisible(nextIsVisible);

                if (nextIsVisible) {
                    setHasLoaded(true);
                }
            },
            {
                rootMargin: '300px 0px',
                threshold: 0.01,
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }

        if (isVisible && hasLoaded) {
            video.play().catch(() => undefined);
            return;
        }

        video.pause();
    }, [hasLoaded, isVisible]);

    return (
        <video
            ref={videoRef}
            src={hasLoaded ? getVideoStreamUrl(videoId) : undefined}
            className={className}
            autoPlay={isVisible}
            loop
            muted
            playsInline
            preload={hasLoaded ? 'metadata' : 'none'}
        />
    );
}
