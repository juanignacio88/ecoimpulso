import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IPuntoReciclaje, IReportaje, IUsuario } from 'src/app/interfaces/db.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: Storage) { 
  }

  async createStorage(){
    await this.storage.create();
  }

  setUsuarioActivo(usuario:IUsuario){
    this.storage.set("usuario_activo", usuario);
  }
  getUsuarioActivo(){
    return this.storage.get("usuario_activo");
  }

  logOut(){
    this.storage.set("usuario_activo", {});
  }

  //SECCION REPORTAJES
  async getReportajes(): Promise<IReportaje[]> {
    return await this.storage.get("reportajes");
  }

  //SECCION PUNTOS DE RECICLAJE
  async getPuntosReciclaje(): Promise<IPuntoReciclaje[]> {
    return await this.storage.get("puntos");
  }


}
