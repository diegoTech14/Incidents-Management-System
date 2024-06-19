import React, { useState } from 'react';
import '../techIncidentView/registIncident.css';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonInput,
    IonTextarea,
    IonAlert,
    IonContent,
    IonToast,
    IonAvatar,
    IonIcon,
    IonItem,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonLabel,
    IonList,
    IonModal,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import { useEffect } from 'react';
import { AssingIncidentViewModel } from '../../viewModels/assingViewModel';
import UsersIncidencesViewModel from '../../viewModels/usersToAssingViewModel';
import { IonButton } from '@ionic/react';
import { RegistIncidentViewModel } from '../../viewModels/registIncidentViewModel';
import { FaCamera } from "react-icons/fa";
import IncidencesList from '../techIncidentView/incidenceList';
import { closeCircleOutline } from 'ionicons/icons';
import { IoMdArrowDropright } from "react-icons/io";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { IncidencesViewModel } from '../../viewModels/incidencesViewModel';
import { FaFire } from "react-icons/fa";

import '../usersAssing.css';
const ChargeView: React.FC = () => {

    const {
        formDataAssing,
        isOpenAssing,
        handleAssing,
        setIsOpenAssing,
        setIsOpenTextErrorAssing,
        isOpenTextErrorAssing,
        formDataCategories,
        setFormDataCategories,
        handleInputChange,
    } = AssingIncidentViewModel();

    const {
        handleLocalStorage
    } = IncidencesViewModel();

    const {
        formDataUsers,
        handleGetUsers
    } = UsersIncidencesViewModel();

    useEffect(() => {
        handleGetUsers();
    }, [])

    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [idUser, setIdUser] = useState("");
    return (
        <IonContent fullscreen>

            <div id="containerAll">

                <IonAlert
                    header="¿Seguro que desea asignar la incidencia?"
                    isOpen={confirmModalOpen}
                    buttons={[
                        {
                            text: 'Cancelar',
                            role: 'cancel'
                        },
                        {
                            text: 'Aceptar',
                            role: 'confirm',
                            handler: () => {
                                handleLocalStorage('idUsuario', idUser)
                                handleAssing()
                                setConfirmModalOpen(false)
                            },
                        },
                    ]}
                ></IonAlert>

                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Incidencias</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IncidencesList setOpenModal={setModalOpen} signal={1}></IncidencesList>
                </IonContent>

                <IonModal isOpen={modalOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle className='fw-bold'>Asignar incidencia</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setModalOpen(false)}><IoMdCloseCircle className='fs-4 text-danger me-3' /></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent className="ion-padding">
                        <form >
                            <IonSelect 
                                className="mb-3" 
                                label="Afectación" 
                                value={formDataCategories.idAfectacion}
                                name='idAfectacion'
                                onIonChange={handleInputChange}
                                interfaceOptions={{
                                header: 'Afectación',
                                subHeader: 'Seleccione un grado de afectación',
                            }}
                                interface="action-sheet"
                                placeholder="" fill="outline">
                                <IonSelectOption value="1">Bajo</IonSelectOption>
                                <IonSelectOption value="2">Medio</IonSelectOption>
                                <IonSelectOption value="3">Alto</IonSelectOption>
                            </IonSelect>

                            <IonSelect 
                                className="mb-3" 
                                label="Prioridad" 
                                value={formDataCategories.idPrioridad}
                                name='idPrioridad'
                                onIonChange={handleInputChange}
                                interfaceOptions={{
                                header: 'Prioridad',
                                subHeader: 'Seleccione un grado de prioridad',
                            }}
                                interface="action-sheet"
                                placeholder="" fill="outline">
                                <IonSelectOption value="1">Bajo</IonSelectOption>
                                <IonSelectOption value="2">Medio</IonSelectOption>
                                <IonSelectOption value="3">Alto</IonSelectOption>
                            </IonSelect>

                            <IonSelect 
                                className="mb-3" 
                                label="Riesgo" 
                                value={formDataCategories.idRiesgo}
                                name='idRiesgo'
                                onIonChange={handleInputChange}
                                interfaceOptions={{
                                header: 'Riesgo',
                                subHeader: 'Seleccione un grado de riesgo',

                            }}
                                interface="action-sheet"
                                placeholder="" fill="outline">
                                <IonSelectOption value="1">Bajo</IonSelectOption>
                                <IonSelectOption value="2">Medio</IonSelectOption>
                                <IonSelectOption value="3">Alto</IonSelectOption>
                            </IonSelect>
                           
                        </form>

                        <IonList inset={true} className='rounded'>
                            {formDataUsers.map((item, index) => (
                                <IonItemSliding key={index}
                                    disabled={parseInt(item.horas) >= 8} >
                                    <IonItem button={true}>
                                        <IonAvatar aria-hidden="true" slot="start">
                                            <div id="bubble" style={parseInt(item.horas) >= 8 ?
                                                { background: "gray", color: "black" } : { background: "#1b70d2a0", color: "#023b7b" }}>
                                                {item.nombre[0]}
                                            </div>
                                        </IonAvatar>
                                        <IonLabel
                                            className={parseInt(item.horas) >= 8 ? "text-secondary" : "text-normal fw-bold"}>{item.nombre}</IonLabel>
                                        {(parseInt(item.horas) >= 8) ? <FaFire style={{ color: "#E87F1D", fontSize: "18px" }} /> : < ></ >}
                                        {(parseInt(item.horas) >= 8) ? <></> : <IoMdArrowDropright className='fs-2 text-secondary' />}

                                    </IonItem>
                                    <IonItemOptions side='start'>
                                        <IonItemOption onClick={() => {
                                            setIdUser(item.cedula)
                                            setConfirmModalOpen(true);
                                        }} color="warning" className='rounded m-1'>
                                            <MdAssignmentTurnedIn className='fs-2 text-dark ms-1 me-1' />
                                        </IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                            ))}
                        </IonList>
                    </IonContent>
                </IonModal>
            </div>

        </IonContent>
    )
}
export default ChargeView;