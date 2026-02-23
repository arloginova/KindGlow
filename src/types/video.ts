export interface Video {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    category: 'basics' | 'thematic' | 'reviews';
    thumbnail?: string;
    duration?: string; // Длительность видео (например, "00:45")
}

export type VideoCategory = {
    id: string;
    name: string;
    videos: Video[];
};
