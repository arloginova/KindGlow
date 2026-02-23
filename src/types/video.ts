export interface Video {
    id: number;
    title: string;
    description: string;
    videoUrl: string; // Google Drive URL
    category: 'basics' | 'thematic' | 'reviews';
    thumbnail?: string; // Опционально, если есть превью
}

export type VideoCategory = {
    id: string;
    name: string;
    videos: Video[];
};
