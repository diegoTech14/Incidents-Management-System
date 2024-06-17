import { useState } from "react";
import { useIonLoading } from "@ionic/react";
import { RegistService } from "../services/registService";
import { NewAssingData } from "../models/registIncident";


export function AssingIncidentViewModel(){
    const [show, dismiss] = useIonLoading();
    const [isOpenAssing, setIsOpenAssing] = useState(false);
    const [isOpenTextErrorAssing, setIsOpenTextErrorAssing] = useState(false);
    const [formDataAssing, setFormData] = useState({
        idUsuario:'',
        idIncidencia:''
    })

    const register = new RegistService();
    
    const handleAssing = async () => {

        try{
            const assign: NewAssingData = {...formDataAssing};
            assign.idIncidencia = (localStorage.getItem('codigoIncidencia')) || "";
            assign.idUsuario = (localStorage.getItem('idUsuario')) || "";
            await register.setIncidenceToTechnician(assign)
            
        }catch(error){
            setIsOpenAssing(true);
        }
    }
    return {
        formDataAssing,
        isOpenAssing,
        handleAssing,
        setIsOpenAssing,
        setIsOpenTextErrorAssing,
        isOpenTextErrorAssing
    }
}