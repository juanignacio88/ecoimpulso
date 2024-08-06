export interface IMarker{
    position: {lat:number,lng:number},
    map: HTMLElement, 
    title: string,
    icon: string
}

export interface ILatLng{
    lat: number,
    lng: number
}