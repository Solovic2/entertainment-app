export interface User {
  name: string;
  email: string;
  password: string;
}

export interface HomeState {
  loading: boolean;
  trending: ApiMovie[];
  recommending: ApiMovie[];
  searchResults: ApiMovie[];
  trendingError: string;
  recommendingError: string;
  searchError: string;
}
export interface MovieState {
  loading: boolean;
  movieList: ApiMovie[];
  movieListError: string;
}

export interface ApiPayload {
  page: number;
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
}
export interface ApiMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date?: string;
  release_date?: string;
  title?: string;
  movie_type?: string;
  media_type?: string;
  video: false;
}
