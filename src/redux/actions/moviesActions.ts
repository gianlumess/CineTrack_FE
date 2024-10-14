import { Imovie, MovieDetails } from "../../interfaces/MoviesInterface";

export const SET_TRENDING_MOVIES = "SET_TRENDING_MOVIES";
export const SET_TOP_RATED_MOVIES = "SET_TOP_RATED_MOVIES";
export const SET_SEARCHED_MOVIES = "SET_SEARCHED_MOVIES";
export const SET_MOVIE_DETAILS = "SET_MOVIE_DETAILS";

export const setTrendingMoviesAction = (movies: Imovie[]) => {
  return {
    type: SET_TRENDING_MOVIES,
    payload: movies,
  };
};

export const setTopRatedMoviesAction = (movies: Imovie[]) => {
  return {
    type: SET_TOP_RATED_MOVIES,
    payload: movies,
  };
};

export const setSearchedMoviesAction = (movies: Imovie[]) => {
  return {
    type: SET_SEARCHED_MOVIES,
    payload: movies,
  };
};

export const setMovieDetailsAction = (details: MovieDetails) => {
  return {
    type: SET_MOVIE_DETAILS,
    payload: details,
  };
};
