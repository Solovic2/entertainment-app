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
  genres: Genre[];
  id: number;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title?: string;
  name?: string;
  original_name?: string;
  type?: string;
}

export interface Genre {
  id: number;
  name: string;
}
