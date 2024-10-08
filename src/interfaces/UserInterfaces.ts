import { GET_TOKEN_FROM_REGISTRATION } from "../redux/actions/userActions";

export interface DataRegistration{
    username:string;
    password:string;
}

export interface RegistrationAction {
    type: typeof GET_TOKEN_FROM_REGISTRATION; // Il tipo dell'azione
    payload: string; // Il token ricevuto dal backend
}

export type UserAction=RegistrationAction