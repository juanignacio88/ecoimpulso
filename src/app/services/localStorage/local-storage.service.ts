import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IProducto, IPuntoReciclaje, IReportaje, ISequence, IUsuario } from 'src/app/interfaces/db.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private usuarios!:IUsuario[];
  private reportajes!:IReportaje[];
  private productos!:IProducto[];
  private puntos!:IPuntoReciclaje[];
  private usuarioActivo!: IUsuario;

  private usuarioSeq!:ISequence;
  private reportajeSeq!:ISequence;
  private productoSeq!:ISequence;
  private puntoSeq!:ISequence;

  constructor(private storage: Storage) { 
  }

  async createStorage(){
    await this.storage.create();

    this.usuarios = await this.storage.get("usuarios");
    this.reportajes = await this.storage.get("reportajes");
    this.productos = await this.storage.get("productos");
    this.puntos = await this.storage.get("puntos");
    this.usuarioActivo = await this.storage.get("usuario_activo");

    this.usuarioSeq = await this.storage.get("usuarios_seq");
    this.reportajeSeq = await this.storage.get("reportajes_seq");
    this.productoSeq = await this.storage.get("productos_seq");
    this.puntoSeq = await this.storage.get("puntos_seq");

    if (this.usuarios == null) {
      this.storage.set("usuarios",[{
        id: 1,
        email: "admin@email.com",
        password: "12345678",
        role: "admin"
      }]);

    };
    if (this.reportajes == null) this.storage.set("reportajes",[]);
    if (this.productos == null) this.storage.set("productos",[]);
    if (this.puntos == null) this.storage.set("puntos",[]);
    if (this.usuarioActivo == null) this.storage.set("usuario_activo",{});

    if (this.usuarioSeq == null) this.storage.set("usuarios_seq",{nextVal: 2, incrementBy: 10});
    if (this.reportajeSeq == null) this.storage.set("reportajes_seq",{nextVal: 1, incrementBy: 10});
    if (this.productoSeq == null) this.storage.set("productos_seq",{nextVal: 1, incrementBy: 10});
    if (this.puntoSeq == null) this.storage.set("puntos_seq",{nextVal: 1, incrementBy: 10});

  }

  setUsuarioActivo(usuario:IUsuario){
    this.storage.set("usuario_activo", usuario);
  }

  logOut(){
    this.storage.set("usuario_activo", {});
  }

  async getProductos(): Promise<IProducto[]> {
    return await this.storage.get("productos");
  }

  //SECCION USUARIOS
  async getUsuarios(): Promise<IUsuario[]> {
    return await this.storage.get("usuarios");
  }

  async addUsuario(usuario:IUsuario){
    let seq: ISequence = await this.storage.get("usuarios_seq");
    usuario.id = seq.nextVal;
    seq.nextVal += seq.incrementBy;
    this.storage.set("usuarios_seq",seq);

    this.getUsuarios().then((u)=>{
      u.push(usuario);
      this.storage.set("usuarios", u);
    })
  }

  //SECCION REPORTAJES
  async getReportajes(): Promise<IReportaje[]> {
    return await this.storage.get("reportajes");
  }

  async addReportaje(reportaje:IReportaje): Promise<boolean>{
    let seq: ISequence = await this.storage.get("reportajes_seq");
    reportaje.id = seq.nextVal;
    seq.nextVal += seq.incrementBy;
    this.storage.set("reportajes_seq",seq);
    return this.getReportajes().then((r)=>{
      r.push(reportaje);
      this.storage.set("reportajes", r);
      return true;
    })
  }

  async updateReportaje(newReportaje:IReportaje): Promise<boolean>{
    //BUSCO TODOS LOS REPORTAJES
    return this.getReportajes().then((r)=>{
      //CREO UN NUEVO ARRAY SIN EL REPORTAJE ANTIGUO FILTRANDO POR ID
      const newRepArr = r.filter(rep => rep.id !== newReportaje.id);
      //AL NUEVO ARRAY LE AGREGO EL NUEVO REPORTAJE CON LOS DATOS ACTUALIZADOS
      newRepArr.push(newReportaje);
      //AÑADO EL NUEVO ARRAY AL STORAGE
      this.storage.set("reportajes", newRepArr);
      return true;
    });
  }

  async deleteReportajeById(id?:number): Promise<boolean>{
    return this.getReportajes().then((r)=>{
      //CREO UN NUEVO ARRAY SIN EL REPORTAJE ANTIGUO FILTRANDO POR ID
      const newRepArr = r.filter(rep => rep.id !== id);
      //AÑADO EL NUEVO ARRAY AL STORAGE
      this.storage.set("reportajes", newRepArr);
      return true;
    });
  }

  //SECCION PUNTOS DE RECICLAJE
  async getPuntosReciclaje(): Promise<IPuntoReciclaje[]> {
    return await this.storage.get("puntos");
  }

  async addPuntoReciclaje(punto:IPuntoReciclaje): Promise<boolean>{
    let seq: ISequence = await this.storage.get("puntos_seq");
    punto.id = seq.nextVal;
    seq.nextVal += seq.incrementBy;
    this.storage.set("puntos_seq",seq);
    return this.getPuntosReciclaje().then((r)=>{
      r.push(punto);
      this.storage.set("puntos", r);
      return true;
    })
  }

  async updatePuntoReciclaje(newPunto:IPuntoReciclaje): Promise<boolean>{
    //BUSCO TODOS LOS REPORTAJES
    return this.getPuntosReciclaje().then((p)=>{
      //CREO UN NUEVO ARRAY SIN EL REPORTAJE ANTIGUO FILTRANDO POR ID
      const newRepArr = p.filter(punto => punto.id !== newPunto.id);
      //AL NUEVO ARRAY LE AGREGO EL NUEVO REPORTAJE CON LOS DATOS ACTUALIZADOS
      newRepArr.push(newPunto);
      //AÑADO EL NUEVO ARRAY AL STORAGE
      this.storage.set("puntos", newRepArr);
      return true;
    });
  }

  async deletePuntoReciclajeById(id?:number): Promise<boolean>{
    return this.getPuntosReciclaje().then((p)=>{
      //CREO UN NUEVO ARRAY SIN EL REPORTAJE ANTIGUO FILTRANDO POR ID
      const newRepArr = p.filter(punto => punto.id !== id);
      //AÑADO EL NUEVO ARRAY AL STORAGE
      this.storage.set("puntos", newRepArr);
      return true;
    });
  }


}
