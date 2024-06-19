export interface NewIncidence {
    nombre:string,
	descripcion:string,
	idUsuario:string,
    idEstado: Number,
	justificacionCierre:string,
    lugarIncidencia:string,
	costo:number,
	duracionGestion:number,
	idAfectacion:number,
	idRiesgo:number,
	idCategoria:number,
	idPrioridad:number
}

export interface NewAssingData {
	idUsuario:string,
	idIncidencia:string
}

export interface Categories {
	idIncidence:string, 
    idEstado:number,
    idAfectacion:number,
    idRiesgo:number,
    idPrioridad:number
}

export interface imagenes {
    rutaImagen:string,
    tipoImagen:boolean,
    idIncidencia:string
}