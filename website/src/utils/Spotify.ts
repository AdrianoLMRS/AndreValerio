import { api } from "@data/api"
const endpoint = api.spotify.accessToken; // My API endpoint

// Gets spotify access token using endpoint
export const getSpotifyToken = async (baseURL: string): Promise<string> => {
    if (!baseURL) throw new Error("BaseURL is undefined!");

    const fullURL = new URL(endpoint, baseURL).href;
    console.log("Fetching token from:", fullURL);

    const response = await fetch(fullURL);

    if (!response.ok) throw new Error(`Error searching token: ${response.statusText}`);

    const data = await response.json();
    return data.access_token;
};
