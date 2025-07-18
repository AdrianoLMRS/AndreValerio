/*
    Astro integration to fetch the latest videos from a YouTube channel
    before build and save them to a JSON file.
*/

import type { AstroIntegration } from 'astro';
import { config } from 'dotenv'; // * Import dotenv to load environment variables
import fs from 'fs/promises';
import { log } from './utils.ts';

import { author } from '../data/constants/author.js';

import path from 'path';
import { fileURLToPath } from 'url';
const PATH = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../data/json/videos.json'
);

interface APIItem {
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: { high: { url: string } };
      publishedAt: string;
      channelTitle: string;
      channelId: string;
    };
};

export type Video = {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
    channelTitle: string;
    channelId: string;
};

async function fetchVideos(): Promise<Video[]> {
    const CHANNEL_ID = `${author.youtubeId}`;
    if (!CHANNEL_ID) throw new Error('Missing youtubeId in author data');
    const API_KEY = import.meta.env.YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY;
    if (!API_KEY) throw new Error('Missing YOUTUBE_API_KEY in .env');
    const params = new URLSearchParams({
        key: API_KEY,
        channelId: 'UCwk5prbrBn1NyQFSAbzCrag',
        part: 'snippet',
        order: 'date',
        maxResults: '5',
        type: 'video',
    });
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
    const data = (await res.json()) as APIItem[];
    return data.items.map((item: APIItem): Video => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
    }));
};

async function run() {
    try {
        config(); // Load environment variables from .env file
        const videos = await fetchVideos();
        await fs.writeFile(`${PATH}`, JSON.stringify(videos, null, 2));
        console.log(
            `\x1b[90m%s\x1b[0m \x1b[32m✔️ Videos fetched and saved to ${PATH}\x1b[0m`,
            new Date().toLocaleTimeString(undefined, { hour12: false })
        );
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        console.error(
            '\x1b[90m%s\x1b[0m \x1b[31m❌ Error: %s\x1b[0m',
            new Date().toLocaleTimeString(undefined, { hour12: false }),
            errorMessage
        );
        process.exit(1);
    };
};

export default function YTfetchIntegration(): AstroIntegration {
    return {
        name: 'astro-fetch-videos',
        hooks: {
            'astro:build:start': async () => {
                log('fetch-videos', 'Fetching videos from YouTube...');
                await run()
                    .then(() => log('fetch-videos', 'Videos fetched successfully!', 'success'))
                    .catch((e) => {
                        log('fetch-videos', `Error fetching videos: ${e.message}`, 'error');
                        throw e;
                    });
            }
        }
    };
}
