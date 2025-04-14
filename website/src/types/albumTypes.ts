interface SpotifyImage {
    url: string
    height?: number
    width?: number
}

interface SpotifyArtist {
    name: string
    id: string
    type: string
    uri: string
    external_urls: {
        spotify: string
    }
}

interface Album {
    id: string
    name: string
    href: string
    release_date: string
    release_date_precision: 'year' | 'month' | 'day'
    images: SpotifyImage[]
    external_urls: {
        spotify: string
    }
    album_type: 'album' | 'single' | 'compilation'
    album_group: 'album' | 'single' | 'appears_on' | 'compilation'
    artists: SpotifyArtist[]
    total_tracks: number
}

interface AlbumResponse {
    items: Album[]
}
  
export type { Album, AlbumResponse, SpotifyArtist, SpotifyImage };
  