import React, { useEffect } from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import Menu from '../separateComponents/menu';
import { RiShieldUserFill } from "react-icons/ri";
import { GiTimeDynamite } from "react-icons/gi";
import { IoTimeSharp } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import "./hoursReport.css";
import UsersIncidencesViewModel from '../../viewModels/usersToAssingViewModel';

const HoursReport: React.FC = () => {


    const {
        formDataReports,
        handleGetReport
    } = UsersIncidencesViewModel();

    useEffect(()=>{
        handleGetReport();
    },[])
    return (
        <Menu title='Reporte de cargas de trabajo' component={
            <>
                {formDataReports.map((report, index) => (
                    <IonItem key={index}>
                        <IonLabel >
                            <h1 className='mb-3'><RiShieldUserFill id="iconReportMain"></RiShieldUserFill> &nbsp; {report.nombre}</h1>
                            <p className='mb-2'><IoTimeSharp id="iconReport"></IoTimeSharp> &nbsp; {report.horasTerminadas} Horas finalizadas</p>
                            <p className='mb-2'><GiTimeDynamite id="iconReport"></GiTimeDynamite> &nbsp; {report.horasPendientes} Horas pendientes</p>
                            <p className='mb-2' id="category"> &nbsp; {report.descripcion} </p>
                        </IonLabel>
                    </IonItem>
    ))}


            </>
        } backRoute='/hoursReport'>

        </Menu>
    );
}
export default HoursReport;