import { GET_TOKEN_FROM_LOGIN, SAVE_USER_DATA, UPDATE_EMAIL_AFTER_REGISTRATION } from "../redux/actions/userActions";

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

export type UserAction = RegistrationAction | LoginAction | SaveUserDataAction;
