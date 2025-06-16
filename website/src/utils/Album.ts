import type { AlbumResponse } from '@types/albumTypes';
import { author } from '@data/constants/author';

export function formatArtistName(names: string[]): string {
    const fullArtistName = names.join(', ');
  
    const hasAuthor = names.some(name =>
        name.toLowerCase().includes(author.name.toLowerCase())
    );
  
    return hasAuthor
        ? fullArtistName
        : fullArtistName
            ? `${fullArtistName}, ${author.name}`
            : author.name;
}
  

export function formatAlbums(albums: AlbumResponse, disallowed: string[], ) {
    return albums.items
        .filter((album) => !disallowed.includes(album.id))
        .map((album) => {
            const artists = formatArtistName(album.artists.map((artist) => artist.name));
  
            return {
                '@type': album.album_type === 'single' || album.album_type === 'album' ? 'MusicAlbum' : 'CreativeWork',
                name: album.name,
                url: album.external_urls.spotify,
                datePublished: album.release_date,
                image: album.images?.[0]?.url,
                genre: author.musicGenre,
                numTracks: album.total_tracks,
                albumReleaseType: album.album_type,
                byArtist: {
                    '@type': 'Person',
                    name: artists,
                },
            };
        });
}
  