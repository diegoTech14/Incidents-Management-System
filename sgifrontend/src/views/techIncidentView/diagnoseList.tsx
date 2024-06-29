import React from 'react'; import './registIncident.css';
import {

    IonIcon,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonList,
    IonItemSliding,
    IonNote,
    IonText,
    IonTitle,
    IonCardTitle,
    IonCardSubtitle,
    IonToolbar,
    IonCardHeader,
    IonModal,
    IonHeader,
    IonButtons,
    IonContent
} from '@ionic/react';
import { IoIosInformationCircle } from "react-icons/io";
import { chevronForward } from 'ionicons/icons';
import { IonButton } from '@ionic/react';
import './diagnoseIncidence.css';
import { OneIncidenceViewModel } from '../../viewModels/oneIncidenceViewModel';
import { useEffect,useState } from 'react';
import { IncidencesViewModel } from '../../viewModels/incidencesViewModel';
import { useIonRouter } from '@ionic/react';
import './registIncident.css';

const DiagnoseList: React.FC = () => {
    const navigate = useIonRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const {
        formData,
        isOpen,
        handleGetIncidence,
        setIsOpen
    } = OneIncidenceViewModel();

    const {
        handleLocalStorage
    } = IncidencesViewModel();

    useEffect(() => {
        handleGetIncidence();
    }, [])
    return (
        
        <div>
        
            <IonList inset={true} >
                <IonCardHeader>
                    <IonCardTitle className='text-start fw-bold'>Diagnosticos</IonCardTitle>
                    <IonCardSubtitle><hr /></IonCardSubtitle>
                </IonCardHeader>
                {formData?.diagnostico.map((diagnos, index) => (
                    <IonItemSliding key={index}>
                        <IonItem button={true} detail={false} key={index}>
                            <div className="unread-indicator-wrapper" slot="start">
                                <div className="unread-indicator"></div>
                            </div>
                            <IonLabel>

                                <IonNote color="medium" className="ion-text-wrap">
                                    Diagnostico #: &nbsp;{diagnos.codigoDiagnostico}
                                </IonNote>
                                <br />

                                <strong>{diagnos.diagnostico}</strong>
                            </IonLabel>
                            <div className="metadata-end-wrapper" slot="end">
                                <IonNote color="medium">{diagnos.fechaDiagnostico.split("T")[0]}</IonNote>
                                &nbsp;
                                <IonIcon color="medium" icon={chevronForward}></IonIcon>
                            </div>
                        </IonItem>
                        <IonItemOptions side='start'>
                            <IonItemOption className='rounded m-1 fs-5 ps-1 pe-1'
                                onClick={() => {
                                    handleLocalStorage('codigoDiagnostico', diagnos.codigoDiagnostico.toString())
                                    navigate.push('/diagnoseDetail', 'forward')
                                    
                                }}
                            >
                                <IoIosInformationCircle />
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                ))}


            </IonList>
            <IonModal isOpen={modalOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle className='fw-bold'>Asignar incidencia</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setModalOpen(false)}></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonList inset={true} className='rounded'>

                        </IonList>
                    </IonContent>
                </IonModal>
        </div>

    )
}

export default DiagnoseList;