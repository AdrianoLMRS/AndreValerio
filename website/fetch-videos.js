import fs from 'fs/promises';

// * Read the .env file and set environment variables
const envRaw = await fs.readFile('./.env', 'utf-8');
envRaw.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        process.env[key.trim()] = value.trim();
    }
});

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCwk5prbrBn1NyQFSAbzCrag';
const url = 'https://www.googleapis.com/youtube/v3/search?' +
    new URLSearchParams({
        key: API_KEY,
        channelId: CHANNEL_ID,
        part: 'snippet',
        order: 'date',
        maxResults: '5',
        type: 'video'
    });

const res = await fetch(url);
const json = await res.json();
// console.log(json);
const videos = json.items.map(i => ({
    id: i.id.videoId,
    title: i.snippet.title
}));

await fs.writeFile('./src/data/videos.json', JSON.stringify(videos, null, 2));

console.log('\x1b[32m' + 'Videos fetched and saved to src/data/videos.json');