import {
  SET_MOVIE_DETAILS,
  SET_SEARCHED_MOVIES,
  SET_TOP_RATED_MOVIES,
  SET_TRENDING_MOVIES,
} from "../redux/actions/moviesActions";
import { Iseries } from "./SeriesInterface";

export interface ImovieState {
  trendingMovies: Imovie[];
  topRatedMovies: Imovie[];
  searchedMovies: Imovie[];
  movieDetails: MovieDetails | null;
}

export interface Imovie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: string;
}
//INTERFACCE PER MOVIE DETAILS
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
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
export interface MovieCarouselProps {
  content: Imovie[] | Iseries[];
}

//ACTIONS
export interface SetTrendingMoviesAction {
  type: typeof SET_TRENDING_MOVIES;
  payload: Imovie[];
}

export interface SetTopRatedMoviesAction {
  type: typeof SET_TOP_RATED_MOVIES;
  payload: Imovie[];
}

export interface SetSearchedMoviesAction {
  type: typeof SET_SEARCHED_MOVIES;
  payload: Imovie[];
}

export interface SetMovieDetailsAction {
  type: typeof SET_MOVIE_DETAILS;
  payload: MovieDetails;
}

export type MoviesAction =
  | SetTrendingMoviesAction
  | SetTopRatedMoviesAction
  | SetSearchedMoviesAction
  | SetMovieDetailsAction;
