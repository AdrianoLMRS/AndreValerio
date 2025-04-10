import type { AlbumResponse } from '@types/albumTypes'; 

const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

export const getSpotifyToken = async (): Promise<string> => {

    // console.debug({ CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN });
    // console.debug(import.meta.env)

    const spotifyURL = 'https://accounts.spotify.com/api/token';

    const response = await fetch(spotifyURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN,
        }),
    });

    if (!response.ok) throw new Error('Error refreshing token');

    const data = await response.json();
    return data.access_token;
};

export const fetchOEmbedData = async (URL: string) => {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('Failed to fetch oEmbed data from Spotify');
    return await response.json();
};

export const fetchAlbums = async (ALBUM_URL: string): Promise<AlbumResponse> => {
    const response = await fetch(ALBUM_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${await getSpotifyToken()}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized - Token may be expired or invalid. Please check your authentication.');
        } else throw new Error('Error searching albums');
    };

    return await response.json(); // Response
};