import {
  GET_MOVIES_IN_LIST,
  GET_MY_COMMENT,
  GET_MY_RATING,
  GET_TOKEN_FROM_LOGIN,
  SAVE_USER_DATA,
  UPDATE_EMAIL_AFTER_REGISTRATION,
} from "../redux/actions/userActions";

export interface UserInitialState {
  user: IuserState;
  moviesList: UserMovie[];
  myComment: MyComment | null;
  myRating: MyRating | null;
}

export interface MyRating {
  id: string;
  rating: number;
  showId: number;
  userId: string;
  dateRating: Date;
}
export interface MyComment {
  id: string;
  content: string;
  showId: number;
  userId: string;
  dateComment: Date;
}

export interface UserMovie {
  id: string;
  showStatus: string;
  userId: string;
  movieId: number;
  dateAddedToList: string;
}

export interface UserMovieDTO {
  showStatus: string;
  movieId: number;
}
//INTERFACE CHE RISPECCHIA LO STATO DELL'USER NELLO STORE
export interface IuserState {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar: string;
  creationDate: string;
}

export interface UserDataResponse {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  creationDate: string;
}

//INTERFACE PER I DATI DA IMMETTERE PER LA REGISTRAZIONE DI UN UTENTE
export interface DataRegistration {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}
//INTERFACE PER I DATI DA IMMETTERE PER IL LOGIN DI UN UTENTE
export interface DataLogin {
  email: string;
  password: string;
}

export interface RegistrationAction {
  type: typeof UPDATE_EMAIL_AFTER_REGISTRATION; // Il tipo dell'azione
  payload: string;
}

export interface LoginAction {
  type: typeof GET_TOKEN_FROM_LOGIN;
  payload: string;
}

export interface SaveUserDataAction {
  type: typeof SAVE_USER_DATA;
  payload: UserDataResponse;
}

export interface GetMoviesInListAction {
  type: typeof GET_MOVIES_IN_LIST;
  payload: UserMovie[];
}

export interface GetMyCommentAction {
  type: typeof GET_MY_COMMENT;
  payload: MyComment;
}

export interface GetMyRatingAction {
  type: typeof GET_MY_RATING;
  payload: MyRating;
}

export type UserAction =
  | RegistrationAction
  | LoginAction
  | SaveUserDataAction
  | GetMoviesInListAction
  | GetMyCommentAction
  | GetMyRatingAction;
