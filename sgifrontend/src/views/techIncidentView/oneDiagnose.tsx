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
import './diagnoseIncidence.css';
import Menu from '../separateComponents/menu';
import { useEffect } from 'react';
import {
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent
} from '@ionic/react';
import { OneIncidenceViewModel } from '../../viewModels/oneIncidenceViewModel';
import './oneIncidence.css';
import { FaPeopleGroup } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { RiSignpostFill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { MdLowPriority } from "react-icons/md";

const OneDiagnose: React.FC = () => {
    const {
        formDataOne,
        handleGetDiagnose
    } = DiagnoseIncidentViewModel();

    useEffect(() => {
        handleGetDiagnose();
    }, [])

    return (
        <Menu title='Diagnostico' component={
            <>
                <div className='d-flex row justify-content-center mt-2 rounded m-1'>
                    <IonCard id="registCard" className='shadow-none'>
                        <IonCardHeader>
                            <IonCardTitle className='text-start d-flex flex-column aling-items-center justify-content-between'>
                                <div className='mb-2 fw-bold'>
                                    Diagnostico # {formDataOne.codigoDiagnostico}
                                </div>
                                <div className='d-flex flex-row justify-content-between align-items-center'>
                                    <div className='fs-6'>
                                        Fecha: {(formDataOne?.fechaDiagnostico) ? formDataOne?.fechaDiagnostico.split("T")[0] : ""}
                                    </div>

                                </div>

                            </IonCardTitle>
                            <IonCardSubtitle><hr /></IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <div className='d-flex'>
                                <div className='w-100'>
                                    <div className='mb-3'>

                                        <div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">

                                                {formDataOne?.imagenes.map((image, index) => (
                                                    (index === 0) ?
                                                        <div className="carousel-item active" key={index}>
                                                            <img src={`http://localhost:3000/${image.rutaImagen}`} className="d-block w-100" alt="..." />
                                                        </div> :
                                                        <div className="carousel-item" key={index}>
                                                            <img src={`http://localhost:3000/${image.rutaImagen}`} className="d-block w-100" alt="..." />
                                                        </div>

                                                ))}

                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>

                                    </div>
                                    <div>

                                        {/* metadata */}


                                        <div className='d-flex justify-content-between mt-2'>
                                            <div className='d-flex flex-row justify-content-center align-items-center mt-2'>
                                                <div className='text-dark fw-bold fs-6'>Compra: &nbsp;</div>
                                                <div>{
                                                    formDataOne.compra
                                                }</div>
                                            </div>
                                            <div className='d-flex flex-row justify-content-center align-items-center mt-2'>
                                                <div className='text-dark fw-bold fs-6'>Tiempo: &nbsp;</div>
                                                <div>{formDataOne.tiempoEstimado} H</div>
                                            </div>
                                        </div>
                                        {/* metadata */}
                                        <hr />
                                        {/* long data */}
                                        <div>
                                            <div className='d-flex flex-column justify-content-start mt-2'>
                                                <div className='text-dark fw-bold'>Diagnostico</div>
                                                <div className='mb-2'>
                                                    <IonTextarea
                                                        id="textarea"
                                                        labelPlacement="floating"

                                                        value={formDataOne.diagnostico}
                                                        readonly={true}
                                                        placeholder="Enter text"

                                                    ></IonTextarea>
                                                </div>
                                                <div className='text-dark fw-bold'>Observación</div>
                                                <div className='mb-2'>
                                                    <IonTextarea
                                                        id="textarea"
                                                        labelPlacement="floating"

                                                        value={formDataOne.observacion}
                                                        readonly={true}
                                                        placeholder="Enter text"
                                                    ></IonTextarea>
                                                </div>

                                            </div>
                                        </div>

                                        {/* long data */}
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </IonCardContent>
                    </IonCard>

                </div>
            </>

        } backRoute='/diagnose'>
        </Menu>
    )
}
export default OneDiagnose;