import { connect } from "http2";
import { prisma } from "../db.js";

export class IncidentsService {

    #response = false;
    async #generateIncidentCode() {
        const lastIncident = await prisma.t_Incidencias.findFirst({
            orderBy: {
                fechaRegistro: 'desc'
            }
        })

        return lastIncident.codigoIncidencia
    }

    async last() {
        const lastId = await this.#generateIncidentCode();
        let parts = lastId.split("-")
        let numbers = parseInt(parts[1])
        const nextNumber = numbers + 1
        const lenNumber = nextNumber.toString().length
        let newNumber = "";

        for (let i = 0; i <= (6 - (lenNumber + 1)); i++) {
            newNumber += "0"
        }

        return parts[0] + "-" + newNumber + nextNumber;
    }

    async lastDiagnoseId(){
        const lastId = await prisma.t_Diagnostico.findFirst({
            orderBy: {
                fechaDiagnostico:'desc'
            }
        })
        return lastId.codigoDiagnostico;
    }

    async createIncident(req) {
        try {
            await prisma.t_Incidencias.create({
                data: {
                    ...req.body,
                    codigoIncidencia: await this.last(),
                    fechaRegistro: new Date().toISOString()
                }
            })

            this.#response = true;
        } catch (error) {
            console.log(error)
            this.#response = false;
        }

        return this.#response;
    }

    async diagnoseIncidence(req) {
        try {
            await prisma.t_Diagnostico.create({
                data: {
                    ...req.body,
                    tiempoEstimado: parseInt(req.body.tiempoEstimado),
                    fechaDiagnostico: new Date().toISOString()
                }
            })
            this.#response = true;
        } catch (error) {
            console.log(error);
            this.#response = false;
        }
        return this.#response;
    }

    async getIncidences(req) {
        try {
            const incidences = await prisma.t_Incidencias.findMany(
                {
                    where: {
                        idUsuario: req.query.idUsuario
                    },
                    select: {
                        codigoIncidencia: true,
                        nombre: true,
                        Estado: true
                    },

                }
            );
            return incidences;
        } catch (error) {
            this.#response = false;
        }
    }

    async getAllIncidences(req) {
        try {
            let incidences = {};

            if (req.query.rol == 2) {
                incidences = await prisma.t_Incidencias.findMany(
                    {
                        where: {
                            idEstado: {
                                not: 10
                            }
                        },
                        select: {
                            codigoIncidencia: true,
                            nombre: true,
                            Estado: true
                        },

                    }
                );
            } else if (req.query.rol == 3) {
                incidences = await prisma.t_Incidencias.findMany(
                    {
                        select: {
                            codigoIncidencia: true,
                            nombre: true,
                            Estado: true
                        },
                    }
                );
                console.log(incidences)
            }

            return incidences;
        } catch (error) {
            this.#response = false;
        }
    }

    async saveCreatedImages(req) {
        const lastId = await this.#generateIncidentCode();
        try {
            await prisma.t_Imagenes.create(
                {
                    data: {
                        rutaImagen: `/images/${req.file.filename}`,
                        tipoImagen: false,
                        idIncidencia: lastId
                    }
                }
            )
            this.#response = true;
        } catch (error) {
            console.log(error)
            this.#response = false;
        }
        return this.#response;
    }

    async saveDiagnoseImages(req) {
        const lastId = await this.#generateIncidentCode();
        try {
            await prisma.t_Imagenes.create(
                {
                    data: {
                        rutaImagen: `/images/${req.file.filename}`,
                        tipoImagen: true,
                        idIncidencia: lastId,
                        idDiagnostico: await this.lastDiagnoseId()
                    }
                }
            )
            this.#response = true;
        } catch (error) {
            console.log(error)
            this.#response = false;
        }
        return this.#response;
    }

    async setIncidenceToTechnician(req) {

        try {
            console.log(req.body.idIncidencia)
            await prisma.t_Usuario_X_Incidencia.create(
                {
                    data: {
                        ...req.body,
                        fechaAsignacion: new Date().toISOString()
                    }
                }
            )
            this.#response = true;
        } catch (error) {
            console.log(error)
            this.#response = false;
        }
        return this.#response;
    }

    async getIncidence(req) {
        try {
            const incidence = await prisma.t_Incidencias.findFirst(
                {
                    where: {
                        codigoIncidencia: req.query.idIncidence
                    },
                    select: {
                        codigoIncidencia: true,
                        nombre: true,
                        Estado: true,
                        Prioridad: true,
                        Categoria: true,
                        Riesgo: true,
                        Afectacion: true,
                        fechaRegistro: true,
                        costo: true,
                        duracionGestion: true,
                        lugarIncidencia: true,
                        imagenes: true,
                        diagnostico: true
                    },

                }
            );
            return incidence;
        } catch (error) {
            return this.#response = false;
        }
    }

    async updateCategoriesIncidente(req){

        try{
            const updatedIncident = await prisma.t_Incidencias.update({
                where:{
                    codigoIncidencia:req.params.codigoIncidencia
                },
                data:{
                    idEstado:parseInt(req.body.idEstado),
                    idAfectacion:parseInt(req.body.idAfectacion),
                    idRiesgo:parseInt(req.body.idRiesgo),
                    idPrioridad:parseInt(req.body.idPrioridad),
                }
            })
            return updatedIncident;
        }catch(error){
            console.log(error)
            return this.#response = false;
        }
    }

}