import { UserAction, UserInitialState } from "../../interfaces/UserInterfaces";
import {
  GET_MOVIES_IN_LIST,
  GET_MY_COMMENT,
  GET_TOKEN_FROM_LOGIN,
  SAVE_USER_DATA,
  UPDATE_EMAIL_AFTER_REGISTRATION,
} from "../actions/userActions";

const initialState: UserInitialState = {
  user: { id: "", username: "", name: "", surname: "", email: "", password: "", avatar: "", creationDate: "" },
  moviesList: [],
  myComment: null,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UPDATE_EMAIL_AFTER_REGISTRATION:
      return {
        ...state,
        email: action.payload,
      };
    case GET_TOKEN_FROM_LOGIN:
      return {
        ...state,
        token: action.payload,
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case GET_MOVIES_IN_LIST:
      return {
        ...state,
        moviesList: action.payload,
      };
    case GET_MY_COMMENT:
      return {
        ...state,
        myComment: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
