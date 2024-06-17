import { useState } from "react";
import { IncidencesService } from "../services/incidencesService";
import { IndividualIncidence } from "../models/incidence";
import { AuthService } from "../services/AuthService";
export function IncidencesViewModel() {
     const [formData, setFormData] = useState<IndividualIncidence[]>([])
     const [isOpen, setIsOpen] = useState(false);

     const handleGetIncidences = async () => {
        const incidences = new IncidencesService();
        try{
            const query = await incidences.getIncidences((await AuthService.decodeToken()).cedula);
            setFormData(query)
        }catch(error){
            setIsOpen(true);
        }
     }
 
     const handleLocalStorage = (newKey: string, newValue : string) => {
        if(localStorage.getItem(newKey)){
            localStorage.removeItem(newKey);
        }
        localStorage.setItem(newKey, newValue);
     }

     return {
        formData,
        isOpen,
        handleGetIncidences,
        handleLocalStorage
     }
}   