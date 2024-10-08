import { DataRegistration } from "../../interfaces/UserInterfaces";
import { AppDispatch } from "../store/store";

export const GET_TOKEN_FROM_LOGIN="GET_TOKEN_FROM_LOGIN";
export const UPDATE_EMAIL_AFTER_REGISTRATION="UPDATE_EMAIL_AFTER_REGISTRATION";


export const registerUserFetch=(dataRegistration:DataRegistration)=>{
    return async(dispatch:AppDispatch)=>{
        try{
            const response=await fetch("http://localhost:3001/authorization/register",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(dataRegistration),
            });
            if(response.ok){
                const data=await response.json();
                console.log(data);
                dispatch(updateEmailAfterRegistrationAction(dataRegistration.email));
            }
        }catch(err){
            console.log(err);
            
        }
    };
};

export const getTokenFromLoginAction=(token:string)=>{
    return{
        type:GET_TOKEN_FROM_LOGIN,
        payload:token,
    }
}

export const updateEmailAfterRegistrationAction=(email:string)=>{
    return{
        type:UPDATE_EMAIL_AFTER_REGISTRATION,
        payload:email,
    }
}



