import { Component, OnInit } from '@angular/core';
import { IPuntoReciclaje } from 'src/app/interfaces/db.interfaces';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { GoogleMapsService } from 'src/app/services/map/google-maps.service';

@Component({
  selector: 'app-client-tab2',
  templateUrl: './client-tab2.page.html',
  styleUrls: ['./client-tab2.page.scss'],
})
export class ClientTab2Page implements OnInit {

  map: any;
  puntos:IPuntoReciclaje[] = [];
  cantidadResultados!: number;

  constructor(private storage:LocalStorageService, private gmapService:GoogleMapsService) { }

  ngOnInit() {
  }

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

  addMarkerToMap(punto:IPuntoReciclaje){
    this.gmapService.addMarker(punto);//AÑADE UN NUEVO PUNTO AL STORAGE
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

    this.puntos = this.puntos.slice(0, 5);
    this.cantidadResultados = this.puntos.length;
  }

  resetMapView(){
    this.gmapService.resetMapView();
  }

}
