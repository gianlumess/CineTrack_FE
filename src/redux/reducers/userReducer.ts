import { IuserState, UserAction } from "../../interfaces/UserInterfaces";
import { GET_TOKEN_FROM_LOGIN, UPDATE_EMAIL_AFTER_REGISTRATION } from "../actions/userActions";

const initialState: IuserState = {
  id: "",
  username: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  avatar: "",
  creationDate: "",
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
    default:
      return state;
  }
};

export default userReducer;
