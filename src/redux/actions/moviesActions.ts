export const SET_TRENDING_MOVIES = "SET_TRENDING_MOVIES";

export const setTrendingMoviesAction = (movies: any[]) => {
  return {
    type: SET_TRENDING_MOVIES,
    payload: movies,
  };
};
