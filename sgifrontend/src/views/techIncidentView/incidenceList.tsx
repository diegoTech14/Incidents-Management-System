import React, { useState, useEffect } from 'react';

import {
    IonList,
    IonItem,
    IonLabel,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonBadge
} from '@ionic/react';
import { IoIosInformationCircle } from "react-icons/io";
import { IncidencesViewModel } from '../../viewModels/incidencesViewModel';
import { FaTools } from "react-icons/fa";
import { useIonRouter } from '@ionic/react';
import { modalAssing } from '../../models/globalModels';
import { IoMdArrowDropright } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { HiLockClosed } from "react-icons/hi";
import './incidencesList.css';

const IncidencesList: React.FC<modalAssing> = ({ setOpenModal, signal, setOpenCost }) => {
    const navigate = useIonRouter();
    const {
        formData,
        handleGetIncidences,
        handleLocalStorage,
    } = IncidencesViewModel();

    useEffect(() => {
        handleGetIncidences();
        console.log(formData)
    }, [])

    return (
        <IonList inset={true} className='rounded'>
            {(signal == 0) ? <IonCardHeader>
                <IonCardTitle className='text-start fw-bold'>Mis incidencias</IonCardTitle>
                <IonCardSubtitle><hr /></IonCardSubtitle>
            </IonCardHeader> : <> </>}
            {formData.map((incidence, index) => (
                <IonItemSliding key={index}>
                    <IonItem button={true}>
                        <IonBadge color="primary" className='ps-2 pe-2'>{index + 1}</IonBadge> &nbsp;
                        <IonLabel>&nbsp;{incidence.codigoIncidencia}
                            <br />
                            <span className='fw-bold'>
                                &nbsp;{incidence.nombre}
                            </span>
                        </IonLabel>

                        <IoMdArrowDropright className='fs-2 text-secondary' />
                    </IonItem>

                    <IonItemOptions side='start'>
                        <IonItemOption onClick={() => {
                            handleLocalStorage('codigoIncidencia', incidence.codigoIncidencia)
                            navigate.push('/incidence', 'forward')
                        }} color="primary" className='rounded m-1 fs-5 ps-1 pe-1'><IoIosInformationCircle />
                        </IonItemOption>

                        {(signal == 4) ? <IonItemOption
                            onClick={() => {
                                handleLocalStorage('codigoIncidencia', incidence.codigoIncidencia)
                                if (setOpenCost != null) {
                                    setOpenCost(true)
                                }

                            }}
                            className='rounded m-1 fs-5 ps-1 pe-1 text-dark bg-warning'><HiLockClosed />
                        </IonItemOption> : <></>}

                        {(signal == 2) ? <IonItemOption
                            onClick={() => {
                                handleLocalStorage('codigoIncidencia', incidence.codigoIncidencia)
                                if (setOpenCost != null) {
                                    setOpenCost(true)
                                }
                            }}
                            className='rounded m-1 fs-5 ps-1 pe-1 text-light bg-dark'><AiFillDollarCircle />
                        </IonItemOption> : <></>}
                        {(signal == 1) ? <IonItemOption
                            onClick={() => {
                                handleLocalStorage('codigoIncidencia', incidence.codigoIncidencia)
                                setOpenModal(true)
                            }}
                            className='rounded m-1 fs-5 ps-1 pe-1 text-light bg-success'><FaUserClock />
                        </IonItemOption> : <></>}
                        {(signal == 1) ? <IonItemOption
                            onClick={() => {
                                navigate.push('/diagnose', 'forward')
                                handleLocalStorage('codigoIncidencia', incidence.codigoIncidencia)
                            }}
                            color="warning" className='rounded m-1 fs-5 ps-1 pe-1'><FaTools />
                        </IonItemOption> : <></>}

                    </IonItemOptions>
                </IonItemSliding>
            ))}
        </IonList>

    )
}
export default IncidencesList