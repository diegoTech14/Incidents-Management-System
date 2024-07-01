import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { UserLoginModel } from "../models/userLogin.model";
import { useIonLoading } from "@ionic/react";
import { useHistory } from "react-router";
export function userLogin() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [show, dismiss] = useIonLoading();
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  })
  const routes = ["/regist","/charge","/supervisor","/administrator"]
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const auth = new AuthService();
    
    e.preventDefault();
    try {
      const user: UserLoginModel = { ...formData };
      const query = await auth.login(user);
      show({
        message: "Iniciando sesión...",
        duration: 3000,
      });
      localStorage.setItem("token", query);
      const rol = (await AuthService.decodeToken()).rol
      setTimeout(() => {
        dismiss();
      
        if(rol == 1 || rol == 3) {
          history.push("/regist");
        }else if(rol == 2){
          history.push("/charge")
        }else if(rol == 4){
          history.push("/supervisor")
        }else if(rol==5){
          history.push("/administrador")
        }

        localStorage.setItem('rol', rol.toString())
      }, 3000);

    } catch (error) {
      setIsOpen(true);
    }
  }

  return {
    formData,
    isOpen,
    handleInputChange,
    handleLogin,
    setIsOpen
  }
}