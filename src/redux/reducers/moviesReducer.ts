import { ImovieState, MoviesAction } from "../../interfaces/MoviesInterface";
import {
  SET_MOVIE_CREDITS,
  SET_MOVIE_DETAILS,
  SET_SEARCHED_MOVIES,
  SET_SIMILAR_MOVIES,
  SET_TOP_RATED_MOVIES,
  SET_TRENDING_MOVIES,
} from "../actions/moviesActions";

const initialState: ImovieState = {
  trendingMovies: [],
  topRatedMovies: [],
  searchedMovies: [],
  movieDetails: null,
  movieCredits: null,
  similarMovies: [],
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
    case SET_SEARCHED_MOVIES:
      return {
        ...state,
        searchedMovies: action.payload,
      };
    case SET_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
      };
    case SET_MOVIE_CREDITS:
      return {
        ...state,
        movieCredits: action.payload,
      };
    case SET_SIMILAR_MOVIES:
      return {
        ...state,
        similarMovies: action.payload,
      };

    default:
      return state;
  }
};

export default movieReducer;
