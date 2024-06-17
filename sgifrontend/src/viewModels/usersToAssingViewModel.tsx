import { useState } from "react";
import { UsersService } from "../services/usersService";
import { userToAssing } from "../models/users";

export function UsersIncidencesViewModel() {
     const [formDataUsers, setFormData] = useState<userToAssing[]>([])
     const [isOpen, setIsOpen] = useState(false);

     const handleGetUsers = async () => {
        const usersService = new UsersService();
        try{
            const query = await usersService.getUserTech();
            setFormData(query)
        }catch(error){
            setIsOpen(true);
        }
     }


     return {
        formDataUsers,
        isOpen,
        handleGetUsers,
     }
}   

export default UsersIncidencesViewModel;