
import { IonFooter, IonToolbar } from '@ionic/react';
import { AiFillThunderbolt } from "react-icons/ai";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from 'react-router';
import { returnValue } from '../../models/globalModels';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';

import './footer.css';
import React from 'react';
const Footer: React.FC = () => {
  const history = useHistory();
  const routes = [
    "/login",
    "/regist",
    "/diagnose",
    "/incidence"
  ];

   return (
    <React.Fragment>
      <IonTabButton tab="home" href="/regist">
        <AiFillThunderbolt id="barIcon" className='text-primary' />
      </IonTabButton>

      <IonTabButton tab="radio" href="/radio">
        <MdOutlineDocumentScanner/>
        <IonLabel>Radio</IonLabel>
      </IonTabButton>

      <IonTabButton tab="library" href="/library">
        <PiUsersFill/>
        <IonLabel>Library</IonLabel>
      </IonTabButton>

    </React.Fragment>
  )
}

export default Footer;