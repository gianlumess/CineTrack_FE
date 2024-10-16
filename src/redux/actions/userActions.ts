import { DataRegistration, MyComment, UserDataResponse, UserMovie } from "../../interfaces/UserInterfaces";
import { AppDispatch } from "../store/store";

export const GET_TOKEN_FROM_LOGIN = "GET_TOKEN_FROM_LOGIN";
export const UPDATE_EMAIL_AFTER_REGISTRATION = "UPDATE_EMAIL_AFTER_REGISTRATION";
export const SAVE_USER_DATA = "SAVE_USER_DATA";
export const GET_MOVIES_IN_LIST = "GET_MOVIES_IN_LIST";
export const GET_MY_COMMENT = "GET_MY_COMMENT";

export const registerUserFetch = (dataRegistration: DataRegistration) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("http://localhost:3001/authorization/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRegistration),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(updateEmailAfterRegistrationAction(dataRegistration.email));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const saveUserDataAction = (userData: UserDataResponse) => {
  return {
    type: SAVE_USER_DATA,
    payload: userData,
  };
};

export const getTokenFromLoginAction = (token: string) => {
  return {
    type: GET_TOKEN_FROM_LOGIN,
    payload: token,
  };
};

export const updateEmailAfterRegistrationAction = (email: string) => {
  return {
    type: UPDATE_EMAIL_AFTER_REGISTRATION,
    payload: email,
  };
};

export const getMoviesInListAction = (moviesInMyList: UserMovie[]) => {
  return {
    type: GET_MOVIES_IN_LIST,
    payload: moviesInMyList,
  };
};

export const getMyCommentAction = (comment: MyComment) => {
  return {
    type: GET_MY_COMMENT,
    payload: comment,
  };
};
