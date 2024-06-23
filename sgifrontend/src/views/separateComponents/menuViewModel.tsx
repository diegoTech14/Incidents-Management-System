import { useState } from "react";
import { AuthService } from "../../services/AuthService";

export function MenuViewModel() {
     const [formDataUser, setFormData] = useState<{nombre:string, rol:number}>()

     const handleGetUsers = async () => {
        try{
            const decodedToken = await AuthService.decodeToken();
            setFormData(decodedToken)
        }catch(error){
           console.log(error)
        }
     }


     return {
        formDataUser,
        handleGetUsers
     }
}   

export default MenuViewModel;