import { DataRegistration } from "../../interfaces/UserInterfaces";
import { AppDispatch } from "../store/store";

export const GET_TOKEN_FROM_REGISTRATION="GET_TOKEN_FROM_REGISTRATION";


export const registerUser=(dataRegistration:DataRegistration)=>{
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
                dispatch(getTokenFromRegistrationAction(data))
            }
        }catch(err){
            console.log(err);
            
        }
    };
};

export const getTokenFromRegistrationAction=(token:string)=>{
    return{
        type:GET_TOKEN_FROM_REGISTRATION,
        payload:token,
    }
}

