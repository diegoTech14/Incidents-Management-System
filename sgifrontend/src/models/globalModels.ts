export interface returnValue{
    route:string
}

export interface modalAssing {
    setOpenModal:React.Dispatch<React.SetStateAction<boolean>>;
    setOpenCost?:React.Dispatch<React.SetStateAction<boolean>>;
    signal:number
}

export interface menu {
    title:string,
    component: React.ReactNode,
    backRoute:string
}

export interface hoursReport {
    nombre:string,
    horasPendientes:string,
    horasTerminadas:string,
    descripcion:string
}

