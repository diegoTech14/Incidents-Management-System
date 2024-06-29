import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenu, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonItem, 
  IonLabel, 
  IonList,
  IonMenuToggle
} from '@ionic/react';
import { menu } from '../../models/globalModels';
import './menu.css'
import { IonAvatar } from '@ionic/react';
import MenuViewModel from './menuViewModel';
import { useEffect } from 'react';
import { FaUsersCog } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
import { useHistory } from 'react-router';
import { useIonRouter } from '@ionic/react';
import { BsDoorClosed } from "react-icons/bs";

const Menu: React.FC<menu> = ({ title, component, backRoute }) => {

  const navigate = useIonRouter();
  
  const {
    formDataUser,
    handleGetUsers
  } = MenuViewModel();

  useEffect(() => {
    handleGetUsers();
  }, [])

  return (
    <>
      <IonMenu contentId="main-content" id="menu">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>
              <IonAvatar id="avatar">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                &nbsp; {formDataUser?.nombre}
              </IonAvatar>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonList>
      <IonItem>
        <IonLabel>
        <FaUsersCog id="icon"/>&nbsp; Administración de usuarios
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <AiFillThunderbolt id="icon"/> Incidencias
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
        <SiGoogledocs id="icon"/>&nbsp; Reportes
        </IonLabel>
      </IonItem>
      <IonMenuToggle>
      <IonItem onClick={() =>{
          navigate.push(backRoute, 'forward')
        }}>
        <IonLabel>
        <IoArrowBack id="icon"/>&nbsp; Volver
        </IonLabel>
      </IonItem>
      <IonItem onClick={() =>{
          navigate.push(backRoute, 'forward')
        }}>
        <IonLabel>
        <BsDoorClosed id="icon"/>&nbsp; Cerrar sesión
        </IonLabel>
      </IonItem>
      </IonMenuToggle>
    </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start" >
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader> 
        <IonContent className="ion-padding">
          {component}
        </IonContent>
      </IonPage>
    </>
  );
}
export default Menu;