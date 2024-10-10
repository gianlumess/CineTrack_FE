import { IseriesState, SeriesAction } from "../../interfaces/SeriesInterface";
import { SET_TRENDING_SERIES } from "../actions/seriesActions";

const initialState: IseriesState = {
  trendingSeries: [],
};

const seriesReducer = (state = initialState, action: SeriesAction) => {
  switch (action.type) {
    case SET_TRENDING_SERIES:
      return {
        ...state,
        trendingSeries: action.payload,
      };
    default:
      return state;
  }
};

export default seriesReducer;
