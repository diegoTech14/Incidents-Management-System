import React, { useState, useEffect } from 'react';

import {
    IonList,
    IonItem,
    IonLabel,
    IonButton,
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
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonModal,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBadge
} from '@ionic/react';
import { IoIosInformationCircle } from "react-icons/io";
import { IncidencesViewModel } from '../../viewModels/incidencesViewModel';
import { FaTools } from "react-icons/fa";
import { useHistory } from 'react-router';
import { modalAssing } from '../../models/globalModels';
import { IoMdArrowDropright } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";

import './incidencesList.css';
const IncidencesList: React.FC<modalAssing> = ({ setOpenModal }) => {
    const history = useHistory();
    const {
        formData,
        isOpen,
        handleGetIncidences,
        handleLocalStorage
    } = IncidencesViewModel();

    useEffect(() => {
        handleGetIncidences();
    }, [])

    return (
        <IonList inset={true} className='rounded'>
            <IonCardHeader>
                <IonCardTitle className='text-start fw-bold'>Mis incidencias</IonCardTitle>
                <IonCardSubtitle><hr /></IonCardSubtitle>
            </IonCardHeader>
            {formData.map((incidence, index) => (
                <IonItemSliding key={index}>
                    <IonItem button={true}>
                        <IonBadge color="primary" className='ps-2 pe-2'>{index + 1}</IonBadge> &nbsp;
                        <IonLabel className='fw-bold'>{incidence.nombre}</IonLabel>

                        <IoMdArrowDropright className='fs-2 text-secondary' />
                    </IonItem>

                    <IonItemOptions side='start'>
                        <IonItemOption onClick={() => {
                            history.push("/incidence")
                            handleLocalStorage('codigoIncidencia', incidence.codigoIncidencia)
                        }} color="primary" className='rounded m-1 fs-5 ps-1 pe-1'><IoIosInformationCircle />
                        </IonItemOption>
                        <IonItemOption
                            onClick={() => {
                                history.push("/diagnose")
                                handleLocalStorage('codigoIncidencia', incidence.codigoIncidencia)
                            }}
                            color="warning" className='rounded m-1 fs-5 ps-1 pe-1'><FaTools />
                        </IonItemOption>
                        <IonItemOption
                            onClick={() => {
                                setOpenModal(true)
                                handleLocalStorage('codigoIncidencia', incidence.codigoIncidencia)
                            }}
                            color="success" className='rounded m-1 fs-5 ps-1 pe-1 text-light'><FaUserClock />
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            ))}
        </IonList>

    )
}
export default IncidencesList