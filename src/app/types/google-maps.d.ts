//DECLARACION DE TIPOS PERSONALIZADO PARA USAR CLASES Y FUNCIONES DE GOOGLE MAPS EN TS ESTRICTO
declare namespace google {
    export namespace maps {
        //API DE MAPS
        export class Map {
          constructor(element: HTMLElement, options: any);
          setCenter(latLng: LatLng): void;
        }

        //API DE GEOCODER
        export class Geocoder {
          geocode(request: any, callback: (results: any, status: any) => void): void;
        }

        //OBJETO CON LATITUD Y LONGITUD
        export class LatLng {
          constructor(lat: number, lng: number);
        }

        export class Point {
          constructor(x: number, y: number);
        }

        export class LatLngBounds {
          constructor();
          extend(latlng: LatLng): void;
        }

        //MARKER ANTIGUO
        export class Marker {
          constructor(options: any);
        }
        
        //BLOQUE DE TEXTO PERSONALIZADO PARA MARKERS
        export class InfoWindow {
          constructor(options?: any);
          open(map?: Map, anchor?: Marker): void;
        }

        //API PARA CALCULAR DISTANCIAS
        export class DistanceMatrixService {
          getDistanceMatrix(request: any, callback: (response: any, status: any) => void): void;
        }

        //MARKER AVANZADO (NUEVO)
        export namespace marker {
          export class AdvancedMarkerElement {
            constructor(options: any);
            position: LatLng;
            map: Map;
            title?: string;
          }
        }

        //API PLACES
        export namespace places {
          //FUNCION DE AUTO COMPLETADO
          export class AutocompleteService {
            constructor();
            getPlacePredictions(request: any, callback: (results: any, status: any) => void): void;
          }
        }

        export enum TravelMode {
          DRIVING,
          WALKING,
          BICYCLING,
          TRANSIT
        }
    
        export enum UnitSystem {
          METRIC,
          IMPERIAL
        }

        //TIPO DE MAPA
        export enum MapTypeId {
          ROADMAP,
          SATELLITE,
          HYBRID,
          TERRAIN
        }
    }
  }
  