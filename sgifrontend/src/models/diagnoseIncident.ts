export interface NewDiagnose { 
    fechaDiagnostico: Date,
    diagnostico: string,
    tiempoEstimado: string,
    observacion: string,
    idUsuario: string,
    idIncidencia: string,
    compra:boolean
}