import axios from "axios";
import { NewIncidence, NewAssingData, Categories } from "../models/registIncident";

export class RegistService { 
    public async create(incidence : NewIncidence){
        try{
            const response = await axios.post('http://localhost:3000/api/incidents/create',incidence)
            return response.data;
        }catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while registering incidences")
            }else{
                throw new Error("Server error")
            }
        }
    }

    public async sendImages(data: FormData) {
        try {
    
          const response = await axios.post(`http://localhost:3000/api/incidents/images`, data);
          return response.data;

        } catch (error) {
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while registering images")
            }else{
                throw new Error("Server error")
            }
        }
      }

      public async setIncidenceToTechnician(registData: NewAssingData){
        try{
            const response = await axios.post(`http://localhost:3000/api/incidents/assign`,registData)
            return response.data;
        }catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while registering images")
            }else{
                throw new Error("Server error")
            }
        }
    }

    public async setAssingCategories(categories: Categories){
        try{
            const response = await axios.patch(`http://localhost:3000/api/incidents/updateCategories/${categories.idIncidence}`,categories)
            return response.data;
        }catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.error || "Error while registering images")
            }else{
                throw new Error("Server error")
            }
        }
    }
}