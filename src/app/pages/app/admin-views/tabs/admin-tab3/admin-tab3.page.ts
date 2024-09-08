import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { IProducto, IUsuario } from 'src/app/interfaces/db.interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-admin-tab3',
  templateUrl: './admin-tab3.page.html',
  styleUrls: ['./admin-tab3.page.scss'],
})
export class AdminTab3Page implements OnInit {
  public productos:IProducto[] = [];
  constructor(
    private alertController: AlertController,
    private firebase: FirebaseService,
    private modalController: ModalController,
    private auth:AuthService) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.readItems();
  }

  readItems(){
    this.firebase.getProductos().subscribe((p)=>{
      this.productos = p;
    });
  }

  async confirmAlert(producto:IProducto){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de realizar esta acción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Estoy seguro',
          role: 'confirm',
          handler: () => {
            this.deleteItem(producto);
          },
        },
      ]
    });

    await alert.present();
  }

  deleteItem(producto:IProducto){
    this.firebase.deleteProductoById(producto.pid as string);
  }


  async presentProductForm(producto?: IProducto) {
    const modal = await this.modalController.create({
      component: ProductFormComponent,
      componentProps: { producto: producto || {} }
    });
    return await modal.present();
  }
  
  logOut(){
    this.auth.confirmLogOut();
  }
}
