import { NextRequest } from 'next/server';
import { videos } from '@/data/videos';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

function copyHeader(source: Headers, target: Headers, name: string) {
    const value = source.get(name);
    if (value) {
        target.set(name, value);
    }
}

async function streamVideo(request: NextRequest, context: RouteContext) {
    const { id } = await context.params;
    const video = videos.find((item) => item.id === Number(id));

    if (!video?.videoUrl) {
        return new Response('Video not found', { status: 404 });
    }

    const range = request.headers.get('range');
    const upstream = await fetch(video.videoUrl, {
        headers: range ? { Range: range } : undefined,
        cache: 'no-store',
        redirect: 'follow',
    });

    if (!upstream.ok && upstream.status !== 206) {
        return new Response('Video unavailable', { status: upstream.status });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'video/mp4');
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Cache-Control', 'public, max-age=3600');

    copyHeader(upstream.headers, headers, 'content-length');
    copyHeader(upstream.headers, headers, 'content-range');
    copyHeader(upstream.headers, headers, 'etag');
    copyHeader(upstream.headers, headers, 'last-modified');

    return new Response(upstream.body, {
        status: upstream.status,
        headers,
    });
}

export async function GET(request: NextRequest, context: RouteContext) {
    return streamVideo(request, context);
}

export async function HEAD(request: NextRequest, context: RouteContext) {
    const response = await streamVideo(request, context);
    return new Response(null, {
        status: response.status,
        headers: response.headers,
    });
}
