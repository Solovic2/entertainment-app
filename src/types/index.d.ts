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
  searchLoading: boolean;
}
export interface MovieState {
  loading: boolean;
  movieList: ApiMovie[];
  searchResults: ApiMovie[];
  searchError: string;
  movieListError: string;
  page: number;
  searchLoading: boolean;
}

export interface ApiPayload {
  page: number;
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
}
// export interface DetailsApiPayload {
//   results: ApiDetail[];
// }
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

export interface ApiDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget?: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  created_by?: CreatedBy[];
  episode_run_time?: number[];
  first_air_date?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: LastEpisodeToAir;
  name?: string;
  next_episode_to_air?: any;
  networks?: Network[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_name?: string;
  seasons?: Season[];
  type?: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
