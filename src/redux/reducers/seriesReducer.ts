import { IseriesState, SeriesAction } from "../../interfaces/SeriesInterface";
import { SET_TOP_RATED_SERIES, SET_TRENDING_SERIES } from "../actions/seriesActions";

const initialState: IseriesState = {
  trendingSeries: [],
  topRatedSeries: [],
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
    default:
      return state;
  }
};

export default seriesReducer;
