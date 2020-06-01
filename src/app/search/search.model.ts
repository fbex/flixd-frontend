export interface SearchResults {
  results: SearchResult[];
}

export interface SearchResult {
  mediaId: string;
  title: string;
  originalTitle: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string;
}
