import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IPuntoReciclaje } from 'src/app/interfaces/db.interfaces';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { GoogleMapsService } from 'src/app/services/map/google-maps.service';

@Component({
  selector: 'app-admin-tab2',
  templateUrl: './admin-tab2.page.html',
  styleUrls: ['./admin-tab2.page.scss'],
})
export class AdminTab2Page implements OnInit, AfterViewInit {
  map: any;
  puntos:IPuntoReciclaje[] = [];
  searchPlaces:IPuntoReciclaje[] = [];

  constructor(private storage:LocalStorageService, private gmapService:GoogleMapsService) { 

  }

  ngOnInit() {}


  async ngAfterViewInit() {
  }

  //DESPUES DE CARGAR LA VISTA COMPLETA SE CARGA EL MAPA, 
  //ESTO ES PARA EVITAR ERROR AL INTENTAR OBTENER EL DIV#MAP ANTES DE QUE EXISTA EN EL HTML
  async ionViewDidEnter(){
    this.map = document.getElementById('map') as HTMLElement; //OBTIENE EL MAPA DEL DOM
    await this.gmapService.loadMap(this.map); //ENVIA EL MAPA AL SERVICIO DE GOOGLE MAPS
    this.readPuntos(); //CARGA LOS PUNTOS DE RECICLAJE A LA VISTA
    // CALCULA LAS DISTANCIAS, SE AÑADE SET-TIMEOUT PARA MANEJAR LA EJECUCION Y ASINCRONIA
    setTimeout(()=> this.calculateDistances(),2000);
  }

  readPuntos(){
    this.storage.getPuntosReciclaje().then(p => this.puntos = p); //BUSCA LOS PUNTOS DE RECICLAJE DEL STORAGE
  }

  createPunto(punto:IPuntoReciclaje){
    this.storage.addPuntoReciclaje(punto).then(()=>{
      this.readPuntos(); //BUSCA LOS PUNTOS DE RECICLAJE DEL STORAGE PARA ACTUALIZAR LA VISTA
      // CALCULA LAS DISTANCIAS, SE AÑADE SET-TIMEOUT PARA MANEJAR LA EJECUCION Y ASINCRONIA
      setTimeout(()=> this.calculateDistances(),2000);
    });
    this.searchPlaces = []; //ELIMINA LAS SUGERENCIAS DE BUSQUEDA
  }

  deletePunto(punto:IPuntoReciclaje){
    this.gmapService.removeMarker(); //ELIMINA EL MARCADOR DEL MAPA Y REINICIA LA POSICION DEL MAPA
    this.storage.deletePuntoReciclajeById(punto.id).then(()=>{
      this.readPuntos(); // ACTUALIZA LOS PUNTOS
      // CALCULA LAS DISTANCIAS, SE AÑADE SET-TIMEOUT PARA MANEJAR LA EJECUCION Y ASINCRONIA
      setTimeout(()=> this.calculateDistances(),2000);
    });
  }

  addMarkerToMap(punto:IPuntoReciclaje){
    this.gmapService.addMarker(punto);//AÑADE UN NUEVO PUNTO AL STORAGE
  }

  //OBTIENE EL VALOR DEL SEACH INPUT EN TIEMPO REAL
  async onSearchChange(event:CustomEvent){
    let query = event.detail.value; //OBTENEMOS EL VALOR DEL INPUT PARA OBTENER PREDICCIONES Y COORDENADAS
    if(query.length > 0) { //SI LA CONSULTA TIENE AL MENOS 1 CARACTER ENTONCES BUSCA PREDICCIONES
      this.searchPlaces = await this.gmapService.getPlaces(query); //BUSCA PREDICCIONES CON LA QUERY
    }else{
      this.searchPlaces = []; //EN CASO DE QUE EL INPUT QUEDE VACIO SE ELIMINAN LAS SUGERENCIAS
    }
  }

  async calculateDistances() {
    for (let punto of this.puntos) { //RECORRE TODOS LOS ELEMENTOS DEL ARRAY PARA CALCULAR LA DISTANCIA ENTRE ORIGEN Y DESTINO
      try {
        const distance = this.gmapService.haversineDistance(punto); //CACULA LA DISTANCIA
        punto.distance = distance; // AGREGA LAS DISTANCIAS A LOS PUNTOS
      } catch (error) {
        console.error(error);
      }
    }
    this.puntos.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)); //ORDENA LOS PUNTOS POR DISTANCIA DE MENOR A MAYOR
  }

}
