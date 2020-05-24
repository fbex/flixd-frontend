export interface Watchlist {
    id: number;
    items: WatchlistItem[];
}

export interface WatchlistItem {
    mediaId: string;
    title: string;
    originalTitle: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    posterPath: string;
}
