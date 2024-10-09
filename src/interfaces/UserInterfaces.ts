import { UPDATE_EMAIL_AFTER_REGISTRATION } from "../redux/actions/userActions";

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

export interface RegistrationAction {
  type: typeof UPDATE_EMAIL_AFTER_REGISTRATION; // Il tipo dell'azione
  payload: string; // Il token ricevuto dal backend
}

export type UserAction = RegistrationAction;
