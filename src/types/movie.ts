
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  runtime: number;
  popularity: number;
  critic_score?: number;
  mood?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieFilter {
  year?: number | null;
  genre?: number | null;
  rating?: [number, number];
  sortBy?: 'popularity' | 'vote_average' | 'release_date';
  sortDirection?: 'asc' | 'desc';
  moods?: string[] | null;
}

export type RatingType = 'user' | 'critic' | 'both';
