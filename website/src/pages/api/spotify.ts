/* 
    * API Route for getting sportify new access token
    Maybe in future store that token in local.storage on client could be an option
*/

import type { APIRoute } from 'astro';

const spotifyURL = 'https://accounts.spotify.com/api/token';

export const GET: APIRoute = async () => {
    try {
        const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
        const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
        const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

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

        if (!response.ok) {
            throw new Error('Error refreshing token');
        }

        const data = await response.json();
        return new Response(JSON.stringify({ access_token: data.access_token }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error searching for token...\nerror' + error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
