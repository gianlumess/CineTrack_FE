import {
  SET_SEARCHED_SERIES,
  SET_SERIES_CREDITS,
  SET_SERIES_DETAILS,
  SET_SIMILAR_SERIES,
  SET_TOP_RATED_SERIES,
  SET_TRENDING_SERIES,
} from "../redux/actions/seriesActions";

export interface IseriesState {
  trendingSeries: Iseries[];
  topRatedSeries: Iseries[];
  searchedSeries: Iseries[];
  seriesDetails: SeriesDetails | null;
  seriesCredits: SeriesCredits | null;
  similarSeries: Iseries[];
}

export interface Iseries {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: string;
  origin_country: string[];
}

//INTERFACCE PER SERIES DETAILS
export interface SeriesCredits {
  cast: Cast[];
  crew: Cast[];
  id: number;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

export interface SeriesDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: [];
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: TEpisodeToAir;
  name: string;
  next_episode_to_air: TEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: null | string;
}

export interface Network {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

//ACTIONS
export interface SetTrendingSeriesAction {
  type: typeof SET_TRENDING_SERIES;
  payload: Iseries[];
}

export interface SetTopRatedSeriesAction {
  type: typeof SET_TOP_RATED_SERIES;
  payload: Iseries[];
}

export interface SetSearchedSeriesAction {
  type: typeof SET_SEARCHED_SERIES;
  payload: Iseries[];
}

export interface SetSeriesDetailsAction {
  type: typeof SET_SERIES_DETAILS;
  payload: SeriesDetails;
}

export interface SetSeriesCreditsAction {
  type: typeof SET_SERIES_CREDITS;
  payload: SeriesCredits;
}

export interface SetSimilarSeriesAction {
  type: typeof SET_SIMILAR_SERIES;
  payload: Iseries[];
}

export type SeriesAction =
  | SetTrendingSeriesAction
  | SetTopRatedSeriesAction
  | SetSearchedSeriesAction
  | SetSeriesDetailsAction
  | SetSeriesCreditsAction
  | SetSimilarSeriesAction;
