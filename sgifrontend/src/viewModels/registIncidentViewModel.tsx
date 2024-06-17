import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import { useIonLoading } from "@ionic/react";
import { RegistService } from '../services/registService';
import { NewIncidence } from '../models/registIncident';
import { AuthService } from '../services/AuthService';

export function RegistIncidentViewModel() {

    const [images, setImages] = useState<string[]>([]);
    const [show, dismiss] = useIonLoading();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTextError, setIsOpenTextError] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        lugarIncidencia: '',
        idUsuario: "",
        idEstado: 1,
	    justificacionCierre:"",
	    costo:0,
	    duracionGestion:0,
	    idAfectacion:1,
	    idRiesgo:1,
	    idCategoria:1,
	    idPrioridad:1
    })
    const register = new RegistService();

    const openCamera = async () => {
        try {
            const response = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 100,
            });
            const blob = await fetch(response.webPath || "").then(r => r.blob());

            if (response.webPath) {
                setImages((prevImages) => [...prevImages, response.webPath as string]);
            }
        } catch (error) {
            console.error('Error taking photo', error);
        }
    };



    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        const allowedAlternativeChars = /[^a-zA-Z,.#-_]/;
        if(name === "nombre" || name === "lugarIncidencia"){
            if(allowedAlternativeChars.test(value)) {
                setIsOpenTextError(true);
            }
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const uploadImage = async () => {
        try {
            for (const imageUri of images) {
                const response = await fetch(imageUri)
                const blob = await response.blob();

                const formData = new FormData();
                formData.append('file', blob, 'image.jpg'); // El nombre del campo debe ser 'file'

                await register.sendImages(formData);
                console.log('Imagen subida con éxito:');
            }

        } catch (error) {
            console.error('Error al subir las imágenes:', error);
        }
    }

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
            const incidence: NewIncidence = { ...formData };
            incidence.idUsuario = (await AuthService.decodeToken()).cedula;
            await register.create(incidence);
            await uploadImage();
            show({
                message: "Registrando incidencia",
                duration: 3000
            });
        } catch (error) {
            setIsOpen(true);
        }
    }



    return {
        images,
        setImages,
        openCamera,
        formData,
        isOpen,
        handleCreate,
        setIsOpen,
        handleInputChange,
        setIsOpenTextError,
        isOpenTextError
    }
}