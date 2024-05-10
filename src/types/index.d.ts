export interface User {
  name: string;
  email: string;
  password: string;
}

export interface fetchParams {
  searchQuery: string;
  page: number;
  type: "movie" | "tv" | "multi";
}

export default interface SearchParams {
  page: number;
  q: string;
}
export interface Media {
  id: number;
  media_type: string;
  backdrop_path: string;
  poster_path?: string;
  release_date: string;
  first_air_date: string;
  adult: boolean;
  title: string;
  name: string;
  original_name?: string;
  original_title?: string;
}
export type MediaCardProp = Pick<Media, "id" | "media_type"> & {
  adult: string;
  date: string;
  image: string;
  title: string;
  cardLink: string;
};
export interface ApiPayload {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}

export interface Results {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  media_type?: string;
}

export interface ApiDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: unknown;
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
  next_episode_to_air?: unknown;
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
