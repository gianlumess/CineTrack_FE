import { IseriesState, SeriesAction } from "../../interfaces/SeriesInterface";
import {
  SET_SEARCHED_SERIES,
  SET_SERIES_CREDITS,
  SET_SERIES_DETAILS,
  SET_SIMILAR_SERIES,
  SET_TOP_RATED_SERIES,
  SET_TRENDING_SERIES,
} from "../actions/seriesActions";

const initialState: IseriesState = {
  trendingSeries: [],
  topRatedSeries: [],
  searchedSeries: [],
  seriesDetails: null,
  seriesCredits: null,
  similarSeries: [],
};

const seriesReducer = (state = initialState, action: SeriesAction) => {
  switch (action.type) {
    case SET_TRENDING_SERIES:
      return {
        ...state,
        trendingSeries: action.payload,
      };
    case SET_TOP_RATED_SERIES:
      return {
        ...state,
        topRatedSeries: action.payload,
      };
    case SET_SEARCHED_SERIES:
      return {
        ...state,
        searchedSeries: action.payload,
      };
    case SET_SERIES_DETAILS:
      return {
        ...state,
        seriesDetails: action.payload,
      };
    case SET_SERIES_CREDITS:
      return {
        ...state,
        seriesCredits: action.payload,
      };
    case SET_SIMILAR_SERIES:
      return {
        ...state,
        similarSeries: action.payload,
      };
    default:
      return state;
  }
};

export default seriesReducer;
