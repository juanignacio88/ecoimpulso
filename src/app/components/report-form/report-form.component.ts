import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IReportaje } from 'src/app/interfaces/db.interfaces';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent {
  @Input() reportaje: IReportaje = {
    title: '',
    content: '',
    link: '',
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
      await this.firebase.addOrUpdateReportaje(this.reportaje, this.imageFile);
      this.dismiss();
    } catch (error) {
      console.error('Error al guardar el reportaje:', error);
    }
  }
}
