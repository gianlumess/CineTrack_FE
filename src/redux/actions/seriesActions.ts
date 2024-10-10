import { Iseries } from "../../interfaces/SeriesInterface";

export const SET_TRENDING_SERIES = "SET_TRENDING_SERIES";

export const setTrendingSeriesAction = (series: Iseries[]) => {
  return {
    type: SET_TRENDING_SERIES,
    payload: series,
  };
};
