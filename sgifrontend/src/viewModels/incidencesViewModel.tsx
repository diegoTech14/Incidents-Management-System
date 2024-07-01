import { useState } from "react";
import { IncidencesService } from "../services/incidencesService";
import { IndividualIncidence } from "../models/incidence";
import { AuthService } from "../services/AuthService";
import { useIonLoading } from "@ionic/react";


export function IncidencesViewModel() {
    const [formData, setFormData] = useState<IndividualIncidence[]>([])
    const [isOpen, setIsOpen] = useState(false);
    const [openCost, setOpenCost] = useState(false);
    const [show, dismiss] = useIonLoading();
    const [isOpenAssing, setIsOpenAssing] = useState(false);
    const [isOpenTextErrorAssing, setIsOpenTextErrorAssing] = useState(false);

    const [formDataCost, setFormDataCost] = useState({
        cost:0
    })
    const [formDataClose, setFormDataClose] = useState({
        close:""
    })
    const [formDataStatus, setFormDataStatus] = useState({
        estado:0
    })

    const incidences = new IncidencesService();
    const handleGetIncidences = async () => {

        try {
            const query = await incidences.getIncidences((await AuthService.decodeToken()).cedula);
            console.log(query)
            setFormData(query)
            
        } catch (error) {
            setIsOpen(true);
        }
    }

    const handleLocalStorage = (newKey: string, newValue: string) => {
        if (localStorage.getItem(newKey)) {
            localStorage.removeItem(newKey);
        }
        localStorage.setItem(newKey, newValue);
    }

    const handleChangeStatus = async (status?: number) => {
        try {
            if(status != null){
                await incidences.changeStatus(status, localStorage.getItem('codigoIncidencia') || "0");
            }else{
                await incidences.changeStatus(formDataStatus.estado, localStorage.getItem('codigoIncidencia') || "0");
            }
            
        } catch (error) {
            setIsOpen(true);
        }
    }
    
    const handleChangeCost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {            
            await incidences.changeCost(formDataCost.cost);
            show({
                message: "Asignando costo",
                duration: 3000
            });
        } catch (error) {
            setIsOpen(true);
        }
    }

    const handleCloseIncidence = async () => {
        try {            
            await incidences.closeIncidence(formDataClose.close);

        } catch (error) {
            setIsOpen(true);
        }
    }

    const handleInputIncidence = (e: any) => {
        const { name, value } = e.target;

        setFormDataCost(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    const handleInputIncidenceClose = (e: any) => {
        const { name, value } = e.target;

        setFormDataClose(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleInputChangeStatus = (e: any) => {
        const { name, value } = e.target;
        console.log(value);
        setFormDataStatus(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return {
        formData,
        isOpen,
        handleGetIncidences,
        handleLocalStorage,
        handleChangeStatus,
        openCost,
        setOpenCost,
        formDataCost,
        handleInputIncidence,
        setFormDataCost,
        handleCloseIncidence,
        formDataClose,
        handleInputIncidenceClose,
        handleChangeCost,
        isOpenAssing,
        formDataStatus,
        setFormDataStatus,
        setIsOpenAssing,
        setIsOpenTextErrorAssing,
        handleInputChangeStatus,
        isOpenTextErrorAssing
    }
}   