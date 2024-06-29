import axios from "axios";
import { NewDiagnose } from "../models/diagnoseIncident";

export class DianoseService{
    public async diagnose(diagnose: NewDiagnose){
        try{
            const response = await axios.post('http://localhost:3000/api/incidents/diagnose', diagnose)
            return response.data;
        }catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while diagnosing")
            }else{
                throw new Error("Server error")
            }
        }
    }

    public async sendImages(data: FormData) {
        try {
          const response = await axios.post(`http://localhost:3000/api/incidents/images/diagnose`, data);
          return response.data;

        } catch (error) {
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while registering images")
            }else{
                throw new Error("Server error")
            }
        }
      }

      public async getDiagnose(idDiagnose: number) {
        try{
            const diagnose = await axios.get(`http://localhost:3000/api/incidents/diagnose/one/${idDiagnose}`)
            return diagnose.data;
        }catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while diagnosing")
            }else{
                throw new Error("Server error")
            }
        }
      }
}