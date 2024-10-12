import { Iseries } from "../../interfaces/SeriesInterface";

export const SET_TRENDING_SERIES = "SET_TRENDING_SERIES";
export const SET_TOP_RATED_SERIES = "SET_TOP_RATED_SERIES";
export const SET_SEARCHED_SERIES = "SET_SEARCHED_SERIES";

export const setTrendingSeriesAction = (series: Iseries[]) => {
  return {
    type: SET_TRENDING_SERIES,
    payload: series,
  };
};

export const setTopRatedSeriesAction = (series: Iseries[]) => {
  return {
    type: SET_TOP_RATED_SERIES,
    payload: series,
  };
};

export const setSearchedSeriesAction = (series: Iseries[]) => {
  return {
    type: SET_SEARCHED_SERIES,
    payload: series,
  };
};
