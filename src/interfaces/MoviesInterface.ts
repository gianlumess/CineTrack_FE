import { SET_TRENDING_MOVIES } from "../redux/actions/moviesActions";

export interface ImovieState {
  trendingMovies: Imovie[];
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

//ACTIONS
export interface SetTrendingMoviesAction {
  type: typeof SET_TRENDING_MOVIES;
  payload: Imovie[];
}

export type MoviesAction = SetTrendingMoviesAction;
