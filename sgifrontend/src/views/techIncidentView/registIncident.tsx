import React, { useState } from 'react';
import './registIncident.css';
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
    IonTitle
} from '@ionic/react';
import { useEffect } from 'react';
import { AssingIncidentViewModel } from '../../viewModels/assingViewModel';
import UsersIncidencesViewModel from '../../viewModels/usersToAssingViewModel';
import { IonButton } from '@ionic/react';
import { RegistIncidentViewModel } from '../../viewModels/registIncidentViewModel';
import { FaCamera } from "react-icons/fa";
import IncidencesList from './incidenceList';
import { closeCircleOutline } from 'ionicons/icons';
import { IoMdArrowDropright } from "react-icons/io";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { IncidencesViewModel } from '../../viewModels/incidencesViewModel';
import { FaFire } from "react-icons/fa";
import Menu from '../separateComponents/menu';
import '../usersAssing.css';
const RegistIncidents: React.FC = () => {
    const {
        images,
        openCamera,
        formData,
        isOpen,
        handleCreate,
        setIsOpen,
        handleInputChange,
        setIsOpenTextError,
        isOpenTextError
    } = RegistIncidentViewModel();

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
        <IonContent fullscreen id="main-content">

            <Menu title='Registrar Incidencia' component={
                <>
                    <IonAlert
                        isOpen={isOpen}
                        header="¡Error!"
                        subHeader="Error durante el registro"
                        message="Intentelo de nuevo por favor..."
                        buttons={['Action']}
                        onDidDismiss={() => setIsOpen(false)}
                    ></IonAlert>
                    <IonToast
                        isOpen={isOpenTextError}
                        onDidDismiss={() => setIsOpenTextError(false)}
                        message="Algunos caracteres especiales no son permitidos"
                        duration={3000}
                        icon={closeCircleOutline}
                        id="ion-toast-text"
                    ></IonToast>

                    <div className='d-flex row justify-content-center mt-2 rounded m-1'>
                        <IonCard id="registCard" className='shadow-none'>
                            <IonCardHeader>
                                <IonCardTitle className='text-start fw-bold'></IonCardTitle>
                                <IonCardSubtitle><hr /></IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <div className='d-flex'>
                                    <div className='w-100'>
                                        <form onSubmit={handleCreate}>
                                            <IonInput
                                                type='text'
                                                required
                                                className="text-start mb-2"
                                                label="Nombre" labelPlacement="floating"
                                                fill="outline"
                                                onIonInput={handleInputChange}
                                                name="nombre"
                                                value={formData.nombre}
                                            ></IonInput>
                                            <IonInput
                                                className="text-start mb-2"
                                                label="Lugar"
                                                labelPlacement="floating"
                                                fill="outline"
                                                onIonInput={handleInputChange}
                                                name="lugarIncidencia"
                                                value={formData.lugarIncidencia}
                                            ></IonInput>
                                            <IonTextarea
                                                id="textArea"
                                                className='text-start mb-2'
                                                label="Descripción"
                                                labelPlacement="floating"
                                                fill="outline"
                                                onIonInput={handleInputChange}
                                                maxlength={150}
                                                name="descripcion"
                                                value={formData.descripcion}
                                            ></IonTextarea>

                                            <div className="d-flex justify-content-center">
                                                {images.map((image, index) => (
                                                    <img id="img" key={index} src={image} alt={`Captured image ${index + 1}`} />
                                                ))}
                                            </div>
                                            <div className='d-flex flex-row'>
                                                <IonButton
                                                    onClick={openCamera}
                                                    className='w-25'
                                                >
                                                    <FaCamera />
                                                </IonButton>

                                                <IonButton type='submit' className='w-75' id="button-incident" expand="block">Registrar Incidencia</IonButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </IonCardContent>
                        </IonCard>
                        <IncidencesList setOpenModal={setModalOpen} signal={0}></IncidencesList>

                    </div>

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

                </>
            }></Menu>


        </IonContent>
    )
}
export default RegistIncidents;