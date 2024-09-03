import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IProducto } from 'src/app/interfaces/db.interfaces';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @Input() producto: IProducto = {
    title: '',
    description: '',
    price: 0,
    imageUrl: ''  // Inicializar la propiedad imageUrl
  };
  imageFile!: File;

  constructor(
    private modalController: ModalController,
    private firebase: FirebaseService
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  async onSubmit() {
    try {
      // Si no se ha seleccionado una nueva imagen, se mantendrá la URL de la imagen existente
      await this.firebase.addOrUpdateProducto(this.producto, this.imageFile);
      this.dismiss();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  }
}