import React from 'react'; import './registIncident.css';
import {
    IonCard,
    IonCardContent,
    IonInput,
    IonTextarea,
    IonAlert,
    IonToggle,
    IonToast,
} from '@ionic/react';
import { IonButton } from '@ionic/react';
import { DiagnoseIncidentViewModel } from '../../viewModels/diagnoseViewModel';
import { FaCamera } from "react-icons/fa";
import './diagnoseIncidence.css';
import { closeCircleOutline } from 'ionicons/icons';
import DiagnoseList from './diagnoseList';
import Menu from '../separateComponents/menu';
const DiagnoseIncident: React.FC = () => {
    const {
        images,
        setImages,
        openCamera,
        formData,
        isOpen,
        handleCreate,
        setIsOpen,
        isOpenTextError,
        setIsOpenTextError,
        handleInputChange,
        handleToggleChange
    } = DiagnoseIncidentViewModel();

    return (
        <Menu title='Diagnosticar Incidencias' component={
            
                <>
                    <IonAlert
                        isOpen={isOpen}
                        header="¡Unauthorized!"
                        subHeader="Email or password wrong"
                        message="Try again please"
                        buttons={['Action']}
                        onDidDismiss={() => setIsOpen(false)}
                    ></IonAlert>

                    <IonToast
                        isOpen={isOpenTextError}
                        onDidDismiss={() => setIsOpenTextError(false)}
                        message="No son permitidas las letras ni espacios en blanco"
                        duration={3000}
                        icon={closeCircleOutline}
                        id="ion-toast-text"
                    ></IonToast>

                    <IonCard id="registCard" className='shadow-none'>
                        <IonCardContent>
                            <div className='d-flex'>
                                <div className='w-100'>
                                    <form onSubmit={handleCreate}>
                                        <div className='d-flex justify-content-between align-items-center mb-2'>
                                            <IonInput
                                                required
                                                label='Tiempo estimado'
                                                labelPlacement="floating"
                                                fill="outline"
                                                placeholder="5"
                                                name='tiempoEstimado'
                                                value={formData.tiempoEstimado}
                                                onIonInput={handleInputChange}
                                            ></IonInput>
                                            <IonToggle
                                                className='mb-2 ms-2 fs-5'
                                                enableOnOffLabels={true}
                                                name='compra'
                                                checked={formData.compra}
                                                onIonChange={handleToggleChange}
                                            >Requiere compra
                                            </IonToggle>
                                        </div>
                                        <IonTextarea
                                            id="textArea"
                                            className='text-start mb-2'
                                            label="Diagnóstico"
                                            labelPlacement="floating"
                                            fill="outline"
                                            onIonInput={handleInputChange}
                                            maxlength={150}
                                            name="diagnostico"
                                            value={formData.diagnostico}
                                        ></IonTextarea>
                                        <IonTextarea
                                            id="textArea"
                                            className='text-start mb-2'
                                            label="Observaciones"
                                            labelPlacement="floating"
                                            fill="outline"
                                            onIonInput={handleInputChange}
                                            maxlength={150}
                                            name="observacion"
                                            value={formData.observacion}
                                        ></IonTextarea>
                                        <div className="d-flex justify-content-center">
                                            {images.map((image, index) => (
                                                <img id="img" key={index} src={image} alt={`Captured image ${index + 1}`} />
                                            ))}
                                        </div>

                                        <div className='d-flex flex-row'>
                                            <IonButton className='w-25' onClick={openCamera}>
                                                <FaCamera />
                                            </IonButton>
                                            <IonButton type='submit' className='w-75' id="button-incident" expand="block">Diagnosticar</IonButton>
                                        </div>

                                    </form>
                                </div>

                            </div>

                        </IonCardContent>
                    </IonCard>
                    <DiagnoseList></DiagnoseList>

                </>
           
        } backRoute='/regist'>
        </Menu>
    )
}
export default DiagnoseIncident;