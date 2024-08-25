import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IProducto, IUsuario } from 'src/app/interfaces/db.interfaces';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-admin-tab3',
  templateUrl: './admin-tab3.page.html',
  styleUrls: ['./admin-tab3.page.scss'],
})
export class AdminTab3Page implements OnInit {
  public productos:IProducto[] = [];
  constructor(private alertController: AlertController,private firebase: FirebaseService) { }

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

  async alertForm(producto?:IProducto){
    const alert = await this.alertController.create({
      header: "Reportaje",
      inputs: [{
          type: 'text',
          name: 'title',
          placeholder: 'Nombre producto',
          value: producto?.title || ''
        },
        {
          type: 'number',
          name: 'price',
          placeholder: 'Precio',
          value: producto?.price || null
        },
        {
          type: 'textarea',
          name: 'description',
          placeholder: 'Descripcion (max 150)',
          value: producto?.description || '',
          attributes: {
            maxlength: 150,
          },
        },
      ],
      buttons: [{
        text:'Añadir',
        handler: (alertData)=>{
          alertData.pid = producto?.pid || '';
          this.handleSubmit(alertData)
        }
      },
      {
        text:'Cancelar',
        role:'cancel'
      }],
    });

    await alert.present();
  }

  async handleSubmit(producto:IProducto){
    if(producto.pid != '') {
      //MANEJA EL UPDATE
      this.firebase.updateProducto(producto.pid as string,producto);
    }else{
      //MANEJA EL CREATE
      this.firebase.addProducto(producto);
    }
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

}
