import { ImovieState, MoviesAction } from "../../interfaces/MoviesInterface";
import { SET_TRENDING_MOVIES } from "../actions/moviesActions";

const initialState: ImovieState = {
  trendingMovies: [],
};

const movieReducer = (state = initialState, action: MoviesAction) => {
  switch (action.type) {
    case SET_TRENDING_MOVIES:
      return {
        ...state,
        trendingMovies: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
