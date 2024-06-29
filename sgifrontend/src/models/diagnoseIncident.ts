export interface NewDiagnose { 
    fechaDiagnostico: Date,
    diagnostico: string,
    tiempoEstimado: string,
    observacion: string,
    idUsuario: string,
    idIncidencia: string,
    compra:boolean
}

export interface OneDiagnose { 
    fechaDiagnostico: string,
    diagnostico: string,
    tiempoEstimado: string,
    observacion: string,
    idUsuario: string,
    idIncidencia: string,
    compra:boolean,
    imagenes:[
        {
            rutaImagen:string,
            tipoImagen:boolean
        }
    ]
}

