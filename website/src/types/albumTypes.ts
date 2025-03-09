// Album types
interface Album {
    id: string
    name: string
    release_date: string
    images: { url: string }[]
}

interface AlbumResponse {
    items: Album[]  
}

export type { Album, AlbumResponse };