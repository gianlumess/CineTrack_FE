import { GET_TOKEN_FROM_LOGIN, UPDATE_EMAIL_AFTER_REGISTRATION } from "../redux/actions/userActions";

export interface IuserState {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar: string;
  creationDate: string;
  token: string;
}

export interface DataRegistration {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

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

export type UserAction = RegistrationAction | LoginAction;
