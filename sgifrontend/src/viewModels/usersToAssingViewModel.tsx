import { useState } from "react";
import { UsersService } from "../services/usersService";
import { userToAssing } from "../models/users";
import { hoursReport } from "../models/globalModels";

export function UsersIncidencesViewModel() {
     const [formDataUsers, setFormData] = useState<userToAssing[]>([])
     const [isOpen, setIsOpen] = useState(false);
     const [formDataReports, setFormDataReports] = useState<hoursReport[]>([]);

     const handleGetUsers = async () => {
        const usersService = new UsersService();
        try{
            const query = await usersService.getUserTech();
            setFormData(query)
        }catch(error){
            setIsOpen(true);
        }
     }

     const handleGetReport = async () => {
        const usersService = new UsersService();
        try{
            const query = await usersService.getHoursReport();
            setFormDataReports(query)
        }catch(error){
            setIsOpen(true);
        }
     }

     return {
        formDataUsers,
        isOpen,
        handleGetUsers,
        handleGetReport,
        formDataReports
     }
}   

export default UsersIncidencesViewModel;