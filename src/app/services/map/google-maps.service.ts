import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IPuntoReciclaje } from 'src/app/interfaces/db.interfaces';
import { mapStyle } from 'src/app/services/map/map-style';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private geocoder = new google.maps.Geocoder(); // ASIGNAMOS GEOCODER A VARIABLE DE CLASE
  private GPSMarker!: any;
  private marker!: any;
  private map!: any;
  private mapDefaultZoom: number = 14;

  constructor(private zone:NgZone) { }


  //AQUI INICIAN LAS FUNCIONES DE GOOGLE MAPS
  async loadMap(mapContainer:HTMLElement) {
    try {
      //OBTIENE LAS COORDENADAS POR GEOLOCALIZACION @CAPACITOR/GEOLOCATION
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true, //ACTIVAMOS PRECISION ALTA PARA LA GEOLOCALIZACION
      });

      //LATITUD Y LONGITUD
      const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //MAP OPTIONS CONTIENE LA POSICION INICIAL DEL MAPA POR COORDENADAS, NIVEL DE ZOOM, TIPO DE MAPA Y ESTILO PERSONALIZADO
      const mapOptions = {
        center: latLng, //POSICION CENTRICA DEL MAPA
        zoom: this.mapDefaultZoom, //ZOOM DEL MAPA
        mapTypeId: google.maps.MapTypeId.ROADMAP, //TIPO DE MAPA
        styles: mapStyle, //APLICA ESTILO PERSONALIZADO PARA QUE SOLO SE VEAN LOS NOMBRES DE LAS CALLES
        mapTypeControl: false, // DESHABILITAR BOTONES "Map" y "Satellite"
        fullscreenControl: false, // DESHABILITAR BOTON "Expand"
        streetViewControl: false, // DESHABILITAR STREET VIEW
      };

      //OBTIENE EL ELEMENTO DIV PARA MOSTRAR EL MAPA
      const mapElement = mapContainer; //OBTENEMOS ELEMENTO DIV DEL DOM PARA MOSTRAR EL MAPA
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, mapOptions); //ASIGNAMOS EL MAPA A VARIABLE DE CLASE
        
        this.GPSMarker = new google.maps.Marker({
          position: latLng, //POSICION IGUAL A LA UBICACION POR GPS
          map: this.map, //ELEMENTO DIV ASIGANDO COMO MAPA PRINCIPAL
          title: 'Ubicación Actual',
          icon: "/assets/maps/gps-icon.png" //ICONO PERSONALIZADO
        });
      } else {
        console.error('Map element not found'); //PARA DEBUG EN CASO DE QUE EL MAPA NO SE OBTENGA
      }
    } catch (error) {
      console.error('Error getting location', error); //PARA DEBUF EN CASO DE QUE LA GEOLOCALIZACION NO FUNCIONE
    }
    return this.GPSMarker;
  }

  getMarker(){
    return this.marker;
  }

  addMarker(markerParam: IPuntoReciclaje) {

    if(this.marker != undefined) this.removeMarker(); //SOLO EN CASO DE QUE HAYA UN MARCADOR EN EL MAPA SE EJECUTA
    
    const marker = new google.maps.Marker({ //CREA UN NUEVO MARCADOR EN EL MAPA
      position: {lat: markerParam.lat , lng: markerParam.lng},
      map: this.map,
      title: markerParam.title,
      icon: "/assets/maps/recycle-point.png" //ICONO PERSONALIZADO
    });
    this.marker = marker;
    this.adjustMapBounds(this.marker);
  }

  removeMarker() {
    this.marker.setMap(null); //ELIMINA EL MARCADOR DEL MAPA
    this.resetMapView(); //REINICIA POSICION Y ZOOM DEL MAPA
  }
  
  //REINICIA POSICION Y ZOOM DEL MAPA
  resetMapView(){
    this.map.setCenter(this.GPSMarker.getPosition()); //CENTRA EL MAPA CON LAS COORDENADAS ORIGINALES DEL GPS
    this.map.setZoom(this.mapDefaultZoom); // REINICIA EL ZOOM ORIGINAL
  }

  async getPlaces(query:string): Promise<IPuntoReciclaje[]>{
    //OBTENEMOS EL SERVICIO DE AUTOCOMPLETADO DE GOOGLE MAPS
    let service = new google.maps.places.AutocompleteService();

    return new Promise((resolve)=>{
      //LA FUNCION GET PREDICTIONS TOMA POR PARAMETRO LA QUERY Y UNA FUNCION CALLBACK QUE RETORNA LOS RESULTADOS
      service.getPlacePredictions({
          input: query, //QUERY OBTENIDA DEL INPUT
          componentRestrictions: { country: 'cl' } //AQUI AÑADIMOS UN FILTRO PARA SOLO BUSCAR EN CHILE
        }, (predictions)=>{
          let autoCompleteItems: any[] = []; //ESTE ARRAY LO USAREMOS DE PLACEHOLDER PARA LOS RESULTADOS
          return this.zone.run(()=>{ //ESTA CALSE DE ANGULAR PERMITE EJECUTAR FUNCIONES ASINCRONAS FUERA DEL "AMBIENTE ANGULAR" PARA MEJOR RENDIMIENTO
            if(predictions != null){ //SI HAY PREDICCIONES ENTRA AL IF
              predictions.forEach(async (prediction:any) => { //AQUI SE APLICA UN FOREACH PARA OBTENER EL OBJETO COMPLETO DE CADA PREDICCION
                //ESTA VARIABLE GUARDA LA LATITUD Y LONGITUD
                let latLng: any = await this.geocodeAddress(prediction.description);
                //LA VARIABLE PLACES CONTIENE EL OBJETO COMPLETO
                const place = {
                  title: prediction.structured_formatting.main_text,
                  address: prediction.description,
                  lat:latLng.lat,
                  lng: latLng.lng,
                }
                //SE GUARDAN LOS RESULTADOS EN VARIABLE LOCAL
                autoCompleteItems.push(place);
              });
              //SE PASAN LOS NUEVOS RESULTADOS A VARIABLE DE CLASE
              resolve(autoCompleteItems);
            }
            resolve([]);
          });
      });
    });
  }

  //ESTA FUNCION OBTIENE LAS COORDENADAS USANDO LA API DE GOOGLE MAPS GEOCODER
  geocodeAddress(address:string) {
    //ESTE OBJETO SE USA DE MAPPING PARA LAS COORDENADAS
    let latLng = {lat: '',lng: ''};
    return new Promise((resolve)=>{
      //LA FUNCION GEOCODE OBTIENE LAS COORDENADAS
      this.geocoder.geocode({ address: address }, (results:any) => {
        latLng.lat = results[0].geometry.location.lat();
        latLng.lng = results[0].geometry.location.lng();
        //RESOLVE ACTUA COMO RETURN EN UNA CLASE PROMISE, REGRESA LAS COORDENADAS
        resolve(latLng);
      });
    }) 
  }

  haversineDistance(punto:IPuntoReciclaje): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(punto.lat - this.GPSMarker.position.lat());
    const dLng = this.deg2rad(punto.lng - this.GPSMarker.position.lng());
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.GPSMarker.position.lat())) * Math.cos(this.deg2rad(punto.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en km
    return parseFloat(distance.toFixed(2));
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  //AJUSTA EL ZOOM DEL MAPA AL AÑADIR UN MARCADOR NUEVO
  adjustMapBounds(marker:google.maps.Marker) {
    const markersArray = [this.GPSMarker, marker];
    const bounds = new google.maps.LatLngBounds();
      markersArray.forEach(marker => {
      bounds.extend(marker.getPosition());
    });
    this.map.fitBounds(bounds);
  }
}
