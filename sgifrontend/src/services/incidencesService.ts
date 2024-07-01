import axios from "axios";
import { AuthService } from "./AuthService";
export class IncidencesService {
    public async getIncidences(userDNI:string){
        try{
            const response = await axios.get(`http://localhost:3000/api/incidents/byUser?idUsuario=${userDNI}`);
            console.log(response.data)
            return response.data;

        }catch(error:any){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while login")
            }else{
                throw new Error("Server error")
            }
        }
    }

    public async getIncidence(idIncicende: string){
        try{
            const response = await axios.get(`http://localhost:3000/api/incidents/one?idIncidence=${idIncicende}`);
            return response.data;
        }catch(error:any){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while login")
            }else{
                throw new Error("Server error")
            }
        }
    }

    //get incidences for charge role
    public async getIncidenceChargeRol(rol: number){
        try{
            const response = await axios.get(`http://localhost:3000/api/incidents/all?rol=${rol}`);
            return response.data;
        }catch(error:any){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while login")
            }else{
                throw new Error("Server error")
            }
        }
    }

    public async changeStatus(status:number, codigoIncidencia:string) {
        try{
            const response = await axios.patch(`http://localhost:3000/api/incidents/changeStatus/${codigoIncidencia}`,{
               "idEstado":status,
               "idUsuario":(await AuthService.decodeToken()).cedula
            });
            return response.data;
        }catch(error:any){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while login")
            }else{
                throw new Error("Server error")
            }
        }
    }

    public async changeCost(cost:number) {
        try{
            const codigoIncidencia = localStorage.getItem('codigoIncidencia') || "0";
            const response = await axios.patch(`http://localhost:3000/api/incidents/changeCost/${codigoIncidencia}`,{
               "costo":cost
            });
            return response.data;
        }catch(error:any){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while login")
            }else{
                throw new Error("Server error")
            }
        }
    }

    
    public async closeIncidence(close:string) {
        try{
            const codigoIncidencia = localStorage.getItem('codigoIncidencia') || "0";
            const response = await axios.patch(`http://localhost:3000/api/incidents/close/${codigoIncidencia}`,{
               "close":close
            });
            return response.data;
        }catch(error:any){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while login")
            }else{
                throw new Error("Server error")
            }
        }
    }


}