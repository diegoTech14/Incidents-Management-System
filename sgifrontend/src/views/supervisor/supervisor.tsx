import React, { useState } from 'react';
import '../techIncidentView/registIncident.css';
import {
    IonCard,
    IonCardContent,
    IonInput,
    IonAlert,
    IonContent,
    IonModal,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import { IonButton } from '@ionic/react';
import IncidencesList from '../techIncidentView/incidenceList';

import { IoMdCloseCircle } from "react-icons/io";
import { IncidencesViewModel } from '../../viewModels/incidencesViewModel';
import Menu from '../separateComponents/menu';
import '../usersAssing.css';
const SupervisorView: React.FC = () => {

    const {
        openCost,
        setOpenCost,
        formDataClose,
        handleInputIncidenceClose,
        handleChangeStatus,
        handleCloseIncidence,
        formDataStatus,
        handleInputChangeStatus,
    } = IncidencesViewModel();


    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    return (
        <Menu title="Incidencias" component={
            <div id="containerAll">
                <IonAlert
                    header="¿Seguro que desea cerrar la incidencia?"
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
                                handleCloseIncidence()
                                handleChangeStatus(10)
                                setConfirmModalOpen(false)
                            },
                        },
                    ]}
                ></IonAlert>
                <IonAlert
                    header="¿Seguro que desea cambiar el estado?"
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
                                
                                handleChangeStatus()
                                setConfirmModalOpen(false)
                            },
                        },
                    ]}
                ></IonAlert>
                <IonCard className='shadow-none'>
                    <IonCardContent className="ion-padding">
                        <IncidencesList setOpenModal={setModalOpen} setOpenCost={setOpenCost} signal={4}></IncidencesList>
                    </IonCardContent>
                </IonCard>

                <IonModal isOpen={openCost}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle className='fw-bold'>Gestión de incidencia</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setOpenCost(false)}><IoMdCloseCircle className='fs-4 text-danger me-3' /></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent className="ion-padding">
                        <form >
                        <IonSelect
                                className="mb-3"
                                label="Estado"
                                value={formDataStatus.estado}
                                name='estado'
                                onIonChange={(e) => {
                                    handleInputChangeStatus(e)
                                    setConfirmModalOpen(true);
                                }}
                                interfaceOptions={{
                                    header: 'Estado',
                                    subHeader: 'Seleccione el estado de la incidencia',
                                }}
                                interface="action-sheet"
                                placeholder="" fill="outline">
                                <IonSelectOption value="8">Aprobar</IonSelectOption>
                                <IonSelectOption value="9">Rechazar</IonSelectOption>
                            </IonSelect>
                            <IonInput
                                onIonInput={handleInputIncidenceClose}
                                label='Justificación de cierre'
                                className=''
                                name="close"
                                fill="outline"
                                labelPlacement="floating"
                                value={formDataClose.close}
                            >
                            </IonInput>
                            <IonButton onClick={() =>{
                                setConfirmModalOpen(true);
                            }} color='primary' className='w-100 mt-4'>CERRAR INCIDENCIA</IonButton>
                        </form>

                    </IonContent>

                </IonModal>


            </div>
        } backRoute='/supervisor'></Menu>
    )
}
export default SupervisorView;