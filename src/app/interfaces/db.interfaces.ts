export interface IUsuario{
  uid: string,
  email: string,
  role: string
}

export interface IReportaje{
  rid?: string,
  title: string,
  date: Date,
  content: string
}

export interface IFirebasePuntoReciclaje{
  pid?: string,
  title: string,
  address: string,
  lat: number,
  lng: number,
}

export interface IPuntoReciclaje{
  pid?: string,
  title: string,
  address: string,
  lat: number,
  lng: number,
  distance?: number
}

export interface IProducto{
  pid?: number,
  title: string,
  description: string,
  value: number,
}