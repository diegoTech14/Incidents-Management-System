import { useState } from "react";
import { useIonLoading } from "@ionic/react";
import { RegistService } from "../services/registService";
import { NewAssingData, Categories } from "../models/registIncident";


export function AssingIncidentViewModel(){
    const [show, dismiss] = useIonLoading();
    const [isOpenAssing, setIsOpenAssing] = useState(false);
    const [isOpenTextErrorAssing, setIsOpenTextErrorAssing] = useState(false);
    const [formDataAssing, setFormData] = useState({
        idUsuario:'',
        idIncidencia:''
    })
    const [formDataCategories, setFormDataCategories] = useState({
        idIncidence:"",
        idEstado:2,
        idAfectacion:0,
        idRiesgo:0,
        idPrioridad:0
    })

    const register = new RegistService();
    const handleCategories = async () => {
        try{
            const categories: Categories = {...formDataCategories};
            categories.idIncidence = (localStorage.getItem('codigoIncidencia')) || "";
            await register.setAssingCategories(categories);
        }catch(error){
            setIsOpenAssing(true);
        }
    }
    const handleAssing = async () => {

        try{
            const assign: NewAssingData = {...formDataAssing};
            assign.idIncidencia = (localStorage.getItem('codigoIncidencia')) || "";
            assign.idUsuario = (localStorage.getItem('idUsuario')) || "";
            await register.setIncidenceToTechnician(assign);
            await handleCategories();
            
        }catch(error){
            setIsOpenAssing(true);
        }
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormDataCategories(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return {
        formDataAssing,
        formDataCategories,
        setFormDataCategories,
        handleInputChange,
        isOpenAssing,
        handleAssing,
        setIsOpenAssing,
        setIsOpenTextErrorAssing,
        isOpenTextErrorAssing
    }
}