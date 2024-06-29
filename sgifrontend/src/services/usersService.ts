import axios from "axios";
import { userToAssing } from "../models/users";

export class UsersService { 
    public async getUserTech(){
        try{
            const response = await axios.get(`http://localhost:3000/api/users/usersroles`);
            return response.data;

        }catch(error:any){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while login")
            }else{
                throw new Error("Server error")
            }
        }
    }     
    
    public async getHoursReport() { 
        try{
            const response = await axios.get(`http://localhost:3000/api/incidents/report`);
            return response.data;

        }catch(error:any){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while login")
            }else{
                throw new Error("Server error")
            }
        }
    }
}