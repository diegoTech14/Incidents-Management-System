import axios from "axios";
import { UserLoginModel } from "../models/userLogin.model";
import { jwtDecode } from "jwt-decode";
import { UserTokenModel } from "../models/userLogin.model";
export class AuthService {
    
    private static token : string = "";
    
    // class method to decode the token from the server
    public static async decodeToken(){
        this.token = localStorage.getItem('token') || "";
        const tokenUser : UserTokenModel = {...jwtDecode(this.token)}
        return tokenUser
    }
    
    public async login(user: UserLoginModel){

        try{
            const response = await axios.post('http://localhost:3000/api/login', user);
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