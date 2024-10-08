import { UserAction } from "../../interfaces/UserInterfaces";
import { GET_TOKEN_FROM_REGISTRATION } from "../actions/userActions";

interface IuserState{
        id:string;
        username:string;
        name:string;
        surname:string;
        email:string;
        password:string;
        avatar:string;
        creationDate:string;
        token:string;
}

const initialState:IuserState={
    id:"",
    username:"",
    name:"",
    surname:"",
    email:"",
    password:"",
    avatar:"",
    creationDate:"",
    token:"",
};

const userReducer=(state=initialState,action:UserAction)=>{
     switch(action.type){
        case GET_TOKEN_FROM_REGISTRATION:
            return{
                ...state,
                token:action.payload,
            };
     }   
};

export default userReducer;



