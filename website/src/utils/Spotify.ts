export const getSpotifyToken = async (): Promise<string> => {
    const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
    const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

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

    if (!response.ok) {
        throw new Error('Error refreshing token');
    }

    const data = await response.json();
    return data.access_token;
};