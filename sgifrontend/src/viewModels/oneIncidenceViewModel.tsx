import { useState } from "react";
import { IncidencesService } from "../services/incidencesService";
import { oneIncidence } from "../models/incidence";

export function OneIncidenceViewModel () {
    const [formData, setFormData] = useState <oneIncidence>();
    const [isOpen, setIsOpen] = useState(false);
    
    const handleGetIncidence = async () => {
        const incidences = new IncidencesService();
        try{
            const codigoIncidendia = localStorage.getItem('codigoIncidencia')
            const query = await incidences.getIncidence(codigoIncidendia || "");
            setFormData(query)
        }catch(error){
            setIsOpen(true);
        }
     }

     return {
        formData,
        isOpen,
        handleGetIncidence,
        setIsOpen
     }
}