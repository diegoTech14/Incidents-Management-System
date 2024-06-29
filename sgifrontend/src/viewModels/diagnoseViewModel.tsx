import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useIonLoading } from "@ionic/react";
import { DianoseService } from "../services/diagnoseService";
import { NewDiagnose, OneDiagnose } from "../models/diagnoseIncident";
import { AuthService } from "../services/AuthService";

export function DiagnoseIncidentViewModel() {
    const [images, setImages] = useState<string[]>([]);
    const [show, dismiss] = useIonLoading();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTextError, setIsOpenTextError] = useState(false);
    const register = new DianoseService();
    const [formData, setFormData] = useState({
        fechaDiagnostico: new Date(),
        diagnostico: '',
        tiempoEstimado: '',
        observacion: '',
        idUsuario: '',
        idIncidencia: '',
        compra: false
    })

    const [formDataOne, setFormDataOne] = useState({
        codigoDiagnostico:0,
        fechaDiagnostico: '',
        diagnostico: '',
        tiempoEstimado: '',
        observacion: '',
        compra: false,
        imagenes:[
            {
                rutaImagen:'',
                tipoImagen:true
            }
        ]
    })

    const openCamera = async () => {
        try {
            const response = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 100,
            });

            // Verificar si response.webPath es un string antes de actualizar el estado
            if (response.webPath) {
                setImages((prevImages: string[]) => [...prevImages, response.webPath as string]);
            }
        } catch (error) {
            console.error('Error taking photo', error);
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        const allowedAlternativeChars = /[a-zA-Z]/;

        if (name == "tiempoEstimado") {
            if (allowedAlternativeChars.test(value)) {
                setIsOpenTextError(true);
            }
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleToggleChange = (e: any) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked
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

    const handleGetDiagnose = async () => {
        try {
            const diagnose = await register.getDiagnose(parseInt(localStorage.getItem('codigoDiagnostico') || "0"));
            setFormDataOne(diagnose)
        } catch (error) {
            console.error('Error getting diagnose');
        }
    }

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
            const diagnose: NewDiagnose = { ...formData };
            diagnose.idUsuario = (await AuthService.decodeToken()).cedula
            diagnose.idIncidencia = (localStorage.getItem('codigoIncidencia')) || "";
            await register.diagnose(diagnose);
            await uploadImage();
            show({
                message: "Incidencia diagnosticada",
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
        formDataOne,
        isOpen,
        isOpenTextError,
        setIsOpenTextError,
        handleCreate,
        setIsOpen,
        handleInputChange,
        handleToggleChange,
        handleGetDiagnose
    }
}