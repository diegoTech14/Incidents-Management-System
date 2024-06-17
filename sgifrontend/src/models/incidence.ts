export interface Incidence { 
    nombre: string,
    descripcion: string,
    lugarIncidencia: string,
    justificacionCierre: string,
    costo: number,
    duracionGestion:number,
    idUsuario: string,
    idAfectacion:number,
    idCategoria:number,
	idPrioridad:number,
	idEstado:number,
	idRiesgo:number
}

export interface IndividualIncidence { 
    codigoIncidencia:string,
    nombre: string,
    Estado: {
        id:number,
        descripcion:string
    }
}

export interface oneIncidence { 
    codigoIncidencia:string,
    nombre:string,
    fechaRegistro:string,
    Estado:{
        id:number, 
        descripcion:string
    },
    Afectacion:{
        id:number,
        descripcion:string
    },
    Riesgo:{
        id:number,
        descripcion:string
    },
    Categoria:{
        id:number,
        descripcion:string
    },
    Prioridad:{
        id:number,
        descripcion:string
    },
    costo:number,
    duracionGestion:number,
    lugarIncidencia:string,
    imagenes:[
        {
            rutaImagen:string,
            tiempoImagen:boolean
        }
    ]
}