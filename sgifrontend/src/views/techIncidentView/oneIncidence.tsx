import React from 'react';
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
    IonSelect,
    IonSelectOption,
    IonLabel
} from '@ionic/react';
import { OneIncidenceViewModel } from '../../viewModels/oneIncidenceViewModel';
import './oneIncidence.css';
import { FaPeopleGroup } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { RiSignpostFill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { MdLowPriority } from "react-icons/md";
import { useEffect } from 'react';
import Menu from '../separateComponents/menu';
import { IncidencesViewModel } from '../../viewModels/incidencesViewModel';
import { useState } from 'react';

const OneIncidence: React.FC = () => {
    const {
        formData,
        isOpen,
        handleGetIncidence,
        setIsOpen
    } = OneIncidenceViewModel();
    const { 
        formDataStatus,
        handleInputChangeStatus,
        handleChangeStatus
    } = IncidencesViewModel();

    useEffect(() => {
        handleGetIncidence();
    }, [])

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    return (
        <Menu title='Información general' component={

            <div className='d-flex row justify-content-center mt-2 rounded m-1'>
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
                <IonCard id="registCard" className='shadow-none'>
                    <IonCardHeader>
                        <IonCardTitle className='text-start d-flex flex-column aling-items-center justify-content-between'>
                            <div className='mb-2 fw-bold'>
                                {formData?.nombre}
                            </div>
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <div className='fs-6'>
                                    {(formData?.fechaRegistro) ? formData?.fechaRegistro.split("T")[0] : ""}
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
                                            {formData?.imagenes.map((image, index) => (
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
                                    {/* Tags section */}
                                    <div className='d-flex flex-column text-dark justify-content-between'>
                                        <div className='d-flex justify-content-center justify-content-around'>
                                            <div className='d-flex flex-row align-items-center w-100'>
                                                <div className='w-100 bg-primary rounded text-white ps-3 pe-3 me-1' id="bar">

                                                    <div>
                                                        <MdLowPriority id="icon-bar" />
                                                    </div>
                                                    <div>
                                                        Prioridad: {formData?.Prioridad.descripcion}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-row align-items-center w-100'>
                                                <div className='w-100 bg-danger rounded text-white ps-3 pe-4 pb-5 ms-1' id="bar">
                                                    <div>
                                                        <IoIosWarning id="icon-bar" />
                                                    </div>
                                                    <div>
                                                        Riesgo: {formData?.Riesgo.descripcion}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex flex-row align-items-center mt-2'>
                                            <div className='d-flex align-items-center w-100 bg-secondary rounded text-white p-1 ps-2 mb-1' id="large-bar">
                                                <div>
                                                    <RiSignpostFill id="icon-bar" />
                                                </div>
                                                <div className='ms-2 mt-2'>
                                                    Afectación: {formData?.Afectacion.descripcion}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Tags section */}
                                    {/* metadata */}
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex flex-row justify-content-center align-items-center mt-2'>
                                            <div><FaPeopleGroup id="icon-incidence" /> &nbsp;</div>
                                            <div className='fs-6'>{formData?.lugarIncidencia}</div>
                                        </div>
                                        <div className='d-flex flex-row justify-content-center align-items-center mt-2'>
                                            <div><FaClock id="icon-incidence" /> &nbsp;</div>
                                            <div className='fs-6'>{formData?.duracionGestion} horas</div>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-between mt-2'>
                                        <div className='d-flex flex-row justify-content-center align-items-center mt-2'>
                                            <div className='text-dark fw-bold fs-6'>Categoría: &nbsp;</div>
                                            <div>{formData?.Categoria.descripcion}</div>
                                        </div>
                                        <div className='d-flex flex-row justify-content-center align-items-center mt-2'>
                                            <div className='text-dark fw-bold fs-6'>Costo: &nbsp;</div>
                                            <div>₡ {formData?.costo}</div>
                                        </div>
                                    </div>
                                    {/* metadata */}
                                    <hr />
                                    {/* long data */}
  
                                    <IonLabel className='fw-bold'>
                                        Estado de la incidencia
                                    </IonLabel>
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
                                        <IonSelectOption value="3">Revisión</IonSelectOption>
                                        <IonSelectOption value="4">En reparación</IonSelectOption>
                                        <IonSelectOption value="7">Terminado</IonSelectOption>
                                    </IonSelect>
                                    {/* long data */}
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </IonCardContent>
                </IonCard>

            </div>


        } backRoute='/regist'>

        </Menu>
    )
}
export default OneIncidence;