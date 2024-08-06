export interface IUsuario{
    id?: number,
    email: string,
    password: string,
    role: string
  }
  
  export interface IReportaje{
    id?: number,
    title: string,
    date: Date,
    content: string
  }
  
  export interface IPuntoReciclaje{
    id?: number,
    title: string,
    address: string,
    lat: number,
    lng: number,
    distance?: number
  }
  
  export interface IProducto{
    id?: number,
    title: string,
    description: string,
    value: number,
  }

  export interface ISequence{
    nextVal: number,
    incrementBy: number
  }