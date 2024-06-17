import axios from "axios";
export class IncidencesService {
    public async getIncidences(userDNI:string){
        try{
            const response = await axios.get(`http://localhost:3000/api/incidents/all?idUsuario=${userDNI}`);
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


}