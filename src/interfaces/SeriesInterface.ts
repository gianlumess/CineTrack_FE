import { SET_SEARCHED_SERIES, SET_TOP_RATED_SERIES, SET_TRENDING_SERIES } from "../redux/actions/seriesActions";

export interface IseriesState {
  trendingSeries: Iseries[];
  topRatedSeries: Iseries[];
  searchedSeries: Iseries[];
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

export type SeriesAction = SetTrendingSeriesAction | SetTopRatedSeriesAction | SetSearchedSeriesAction;
