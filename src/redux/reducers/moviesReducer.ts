import { ImovieState, MoviesAction } from "../../interfaces/MoviesInterface";
import { SET_TOP_RATED_MOVIES, SET_TRENDING_MOVIES } from "../actions/moviesActions";

const initialState: ImovieState = {
  trendingMovies: [],
  topRatedMovies: [],
};

const movieReducer = (state = initialState, action: MoviesAction) => {
  switch (action.type) {
    case SET_TRENDING_MOVIES:
      return {
        ...state,
        trendingMovies: action.payload,
      };
    case SET_TOP_RATED_MOVIES:
      return {
        ...state,
        topRatedMovies: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
