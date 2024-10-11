import { Imovie } from "../../interfaces/MoviesInterface";

export const SET_TRENDING_MOVIES = "SET_TRENDING_MOVIES";
export const SET_TOP_RATED_MOVIES = "SET_TOP_RATED_MOVIES";

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
