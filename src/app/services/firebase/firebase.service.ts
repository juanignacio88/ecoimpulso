import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable} from 'rxjs';
import { IFirebasePuntoReciclaje, IProducto, IPuntoReciclaje, IReportaje } from 'src/app/interfaces/db.interfaces';
import { Timestamp } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private reportajes$!: Observable<IReportaje[]>;
  private productos$!: Observable<IProducto[]>;
  private puntosReciclaje$!: Observable<IFirebasePuntoReciclaje[]>;
  private reportajesCollection = this.firestore.collection<IReportaje>('reportajes');
  private productosCollection = this.firestore.collection<IProducto>('productos');
  private puntosReciclajeCollection = this.firestore.collection<IFirebasePuntoReciclaje>('puntos_reciclaje');
 
  constructor(private firestore: AngularFirestore) {}

  getReportajes(): Observable<IReportaje[]> {
    return this.reportajes$ = this.reportajesCollection.valueChanges().pipe(
      map((reportajes: IReportaje[]) => {
        return reportajes.map(reportaje => ({
          ...reportaje,
          date: reportaje.date instanceof Timestamp ? reportaje.date.toDate() : reportaje.date
        }));
      })
    );
  }
  addReportaje(reportaje: IReportaje): Promise<void> {
    // Add a new document with an autogenerated ID
    return this.reportajesCollection.add(reportaje)
      .then(docRef => {
        // Update the document with the autogenerated ID
        const updatedReportaje = {
          ...reportaje,
          rid: docRef.id // Adding the document ID to the reportaje object
        };

        // Update the document with the new rid field
        return docRef.update(updatedReportaje);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  }
  updateReportaje(id: string, updatedData: Partial<IReportaje>): Promise<void> {
    return this.reportajesCollection.doc(id).update(updatedData);
  }
  deleteReportajeById(id:string): Promise<void>{
    return this.reportajesCollection.doc(id).delete();
  }

  getPuntosReciclaje(): Observable<IFirebasePuntoReciclaje[]> {
    //OBTENEMOS LOS PUNTOS DE RECICLAJE Y LO MAPEAMOS AL OBSERVABLE
    return this.puntosReciclaje$ = this.puntosReciclajeCollection.valueChanges();
  }
  addPuntoReciclaje(puntoReciclaje:IPuntoReciclaje): Promise<void>{
    // AÑADIMOS UN NUEVO ELEMENTO A LA COLECCION Y GENERAMOS EL ID AUTOMATICO
    return this.puntosReciclajeCollection.add(puntoReciclaje)
      .then(docRef => {
        // ACTUALIZAMOS EL ITEM AÑADIENDO EL ID A LOS CAMPOS
        const updatedPunto = {
          ...puntoReciclaje,
          pid: docRef.id //
        };

        // ACTUALIZAMOS EL ELEMENTO AÑADIENDO EL ID
        return docRef.update(updatedPunto);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  }
  deletePuntoReciclajeById(id:string): Promise<void> {
    return this.puntosReciclajeCollection.doc(id).delete();
  }


  getProductos(): Observable<IProducto[]> {
    //OBTENEMOS LOS PUNTOS DE RECICLAJE Y LO MAPEAMOS AL OBSERVABLE
    return this.productos$ = this.productosCollection.valueChanges();
  }
  addProducto(producto:IProducto): Promise<void>{
    // AÑADIMOS UN NUEVO ELEMENTO A LA COLECCION Y GENERAMOS EL ID AUTOMATICO
    return this.productosCollection.add(producto)
      .then(docRef => {
        // ACTUALIZAMOS EL ITEM AÑADIENDO EL ID A LOS CAMPOS
        const updatedProducto = {
          ...producto,
          pid: docRef.id //
        };

        // ACTUALIZAMOS EL ELEMENTO AÑADIENDO EL ID
        return docRef.update(updatedProducto);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  }
  updateProducto(id: string, updatedData: Partial<IProducto>): Promise<void> {
    return this.productosCollection.doc(id).update(updatedData);
  }
  deleteProductoById(id:string): Promise<void> {
    return this.productosCollection.doc(id).delete();
  }
}
