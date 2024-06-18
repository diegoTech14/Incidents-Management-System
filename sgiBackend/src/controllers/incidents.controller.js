import { IncidentsService } from "../services/incidentsService.js";

    export class IncidentsController{
        //Global variable for return a response
        #response;

        constructor(){
            this.service = new IncidentsService();
        }

        createIncident = async (req, res) => {
            const incidentCreated = await this.service.createIncident(req)
            return (incidentCreated) ? this.#response = res.status(200).json(incidentCreated) : this.#response = res.status(500).json({})
        }

        createDiagnose = async (req, res) => {
            const diagnoseCreated = await this.service.diagnoseIncidence(req)
            return (diagnoseCreated) ? this.#response = res.status(200).json(diagnoseCreated) : this.#response = res.status(500).json({})
        }

        getIncidences = async (req, res) => {
            const allIncidences = await this.service.getIncidences(req);
            return (allIncidences) ? this.#response = res.status(200).json(allIncidences) : this.#response = res.status(200).json([])
        }

        saveImageCreated = async(req, res) => {
            const saveImage = await this.service.saveCreatedImages(req);
            return (saveImage) ? this.#response = res.status(200).json(saveImage) : this.#response = res.status(500).json([])
        }

        saveImageDiagnose = async(req, res) => {
            const diagnoseImage = await this.service.saveDiagnoseImages(req);
            return (diagnoseImage) ? this.#response = res.status(200).json(diagnoseImage) : this.#response = res.status(500).json([])
        }
        
        getIncidence = async(req, res) => {
            const incidence = await this.service.getIncidence(req);
            return (incidence) ? this.#response = res.status(200).json(incidence) : this.#response = res.status(200).json([])
        }

        assignIncidence = async(req, res) => {
            const assigned = await this.service.setIncidenceToTechnician(req);
            return (assigned) ? this.#response = res.status(200).json(assigned) : this.#response = res.status(500).json([])    
        }

        getAllIncidences = async(req, res) => {
            const incidences = await this.service.getAllIncidences(req);
            console.log(incidences)
            return (incidences) ? this.#response = res.status(200).json(incidences) : this.#response = res.status(200).json([])    
        }

        updateCategories = async(req, res) => {
            const updatedCategories = await this.service.updateCategoriesIncidente(req);
            return (updatedCategories) ? this.#response = res.status(200).json(updatedCategories) : this.#response = res.status(500).json([])
        }
    }