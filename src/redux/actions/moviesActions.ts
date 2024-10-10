import { Imovie } from "../../interfaces/MoviesInterface";

export const SET_TRENDING_MOVIES = "SET_TRENDING_MOVIES";

export const setTrendingMoviesAction = (movies: Imovie[]) => {
  return {
    type: SET_TRENDING_MOVIES,
    payload: movies,
  };
};
