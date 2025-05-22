import { error } from "console";

export type Video = {
    id: string
    title: string
  }
  
export async function getLatestVideos(channelId: string, apiKey: string, max: number): Promise<Video[]> {
    const url = 'https://www.googleapis.com/youtube/v3/search?' +
      new URLSearchParams({
          key: apiKey,
          channelId,
          part: 'snippet',
          order: 'date',
          maxResults: String(max),
          type: 'video'
      });
    const res = await fetch(url);
    if (!res.ok) throw new Error('YouTube API error' + error + '\nstatus: ' + res.status);
    const json = await res.json();
    // console.debug(json.items[0].snippet);
    return json.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title
    }));
}
  