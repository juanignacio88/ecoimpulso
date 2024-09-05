import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, lastValueFrom, map, Observable} from 'rxjs';
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
 
  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) {}

  getReportajes(): Observable<IReportaje[]> {
    return this.reportajes$ = this.reportajesCollection.valueChanges().pipe(
      map((reportajes: IReportaje[]) => {
        return reportajes.map(reportaje => ({
          ...reportaje,
          //date: reportaje.date instanceof Timestamp ? reportaje.date.toDate() : reportaje.date
        }));
      })
    );
  }
  // Método para subir la imagen y obtener la URL
  private async uploadImageReportaje(file: File, reportajeId: string): Promise<string> {
    const filePath = `reportajes/${reportajeId}`;  // Usar el ID del producto como nombre de archivo
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    // Esperar a que la imagen se suba completamente y obtener la URL
    await lastValueFrom(uploadTask.snapshotChanges().pipe(
      finalize(() => lastValueFrom(fileRef.getDownloadURL()))
    ));

    // Obtener la URL de descarga
    return await lastValueFrom(fileRef.getDownloadURL());
  }

  async addOrUpdateReportaje(reportaje: IReportaje, imageFile?: File): Promise<void> {
    try {
      let reportajeId = reportaje.rid;
      let imageUrl: string | null = reportaje.imageUrl || null;

      if (!reportajeId) {
        // Si no hay ID, es un nuevo producto
        const reportajeRef = await this.firestore.collection('reportajes').add({});
        reportajeId = reportajeRef.id;
      }

      if (imageFile) {
        // Subir la nueva imagen usando el ID del producto como nombre de archivo y obtener la URL
        imageUrl = await this.uploadImageReportaje(imageFile, reportajeId);
      }

      // Actualizar el documento del producto con todos los datos y la URL de la imagen
      const reportajeConId = {
        ...reportaje,
        rid: reportajeId,
        imageUrl: imageUrl
      };

      await this.firestore.collection('reportajes').doc(reportajeId).set(reportajeConId);
    } catch (error) {
      console.error('Error al añadir o actualizar el producto:', error);
      throw error;
    }
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
  // Método para subir la imagen y obtener la URL
  private async uploadImage(file: File, productId: string): Promise<string> {
    const filePath = `productos/${productId}`;  // Usar el ID del producto como nombre de archivo
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    // Esperar a que la imagen se suba completamente y obtener la URL
    await lastValueFrom(uploadTask.snapshotChanges().pipe(
      finalize(() => lastValueFrom(fileRef.getDownloadURL()))
    ));

    // Obtener la URL de descarga
    return await lastValueFrom(fileRef.getDownloadURL());
  }

  // Método para añadir o actualizar el producto
  async addOrUpdateProducto(producto: IProducto, imageFile?: File): Promise<void> {
    try {
      let productId = producto.pid;
      let imageUrl: string | null = producto.imageUrl || null;

      if (!productId) {
        // Si no hay ID, es un nuevo producto
        const productRef = await this.firestore.collection('productos').add({});
        productId = productRef.id;
      }

      if (imageFile) {
        // Subir la nueva imagen usando el ID del producto como nombre de archivo y obtener la URL
        imageUrl = await this.uploadImage(imageFile, productId);
      }

      // Actualizar el documento del producto con todos los datos y la URL de la imagen
      const productoConId = {
        ...producto,
        pid: productId,
        imageUrl: imageUrl
      };

      await this.firestore.collection('productos').doc(productId).set(productoConId);
    } catch (error) {
      console.error('Error al añadir o actualizar el producto:', error);
      throw error;
    }
  }

  // Método para eliminar el producto por ID y su imagen asociada
  async deleteProductoById(id: string): Promise<void> {
    try {
      // Obtener el documento del producto
      const productDoc = await lastValueFrom(this.productosCollection.doc(id).get());

      if (productDoc.exists) {
        const productData = productDoc.data();
        const imageUrl = productData?.imageUrl;

        // Si existe una imagen asociada, eliminarla de Firebase Storage
        if (imageUrl) {
          const storageRef = this.storage.refFromURL(imageUrl);
          await lastValueFrom(storageRef.delete());
        }

        // Eliminar el documento del producto en Firestore
        await this.productosCollection.doc(id).delete();
      } else {
        console.error('Producto no encontrado en Firestore.');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  }
}
