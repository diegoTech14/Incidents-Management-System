import './login.css';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { userLogin } from '../../viewModels/LoginViewModel';
import { AuthService } from '../../services/AuthService';
import {
    IonButton,
    IonInput,
    IonItem,
    IonList,
    IonAlert
} from '@ionic/react';

const LoginView: React.FC = () => {
    const {
        formData,
        isOpen,
        handleInputChange,
        handleLogin,
        setIsOpen
    } = userLogin();
return (

<div id="container" className='d-flex row justify-content-center p-5'>
    <IonAlert
        isOpen={isOpen}
        header="No autorizado"
        subHeader="Correo o contraseña inválidos"
        message="Por favor intentelo de nuevo..."
        buttons={['Action']}
        onDidDismiss={() => setIsOpen(false)}
    ></IonAlert>

    <div className='mb-2'>
        <img id="logo" src="/sgi2.png" alt="" />
    </div>
    <form onSubmit={handleLogin}>
        <div className="input-group flex-nowrap mb-3 mt-5 w-100">
            <IonList className='w-100'>
                <IonItem>
                    <MdEmail id="icon-login" />
                    <IonInput
                        onIonInput={handleInputChange}
                        placeholder='Correo electrónico'
                        className='ps-3'
                        name="correo"
                        value={formData.correo}
                    >
                    </IonInput>
                </IonItem>
            </IonList>
        </div>

        <IonList className='w-100'>
            <IonItem>
                <RiLockPasswordFill id="icon-login" />
                <IonInput
                    onIonInput={handleInputChange}
                    type="password"
                    placeholder='Contraseña'
                    className='ps-3'
                    name="contrasena"
                    value={formData.contrasena}>
                </IonInput>
            </IonItem>
        </IonList>
        <IonButton type='submit' color='primary' className='w-100 mt-4'>INICIAR SESIÓN</IonButton>
    </form>

</div>
);
};

export default LoginView;
