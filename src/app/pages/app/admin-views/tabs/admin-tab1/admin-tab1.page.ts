import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ReportFormComponent } from 'src/app/components/report-form/report-form.component';
import { IReportaje } from 'src/app/interfaces/db.interfaces';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-admin-tab1',
  templateUrl: './admin-tab1.page.html',
  styleUrls: ['./admin-tab1.page.scss'],
})
export class AdminTab1Page implements OnInit {

  reportajes:IReportaje[] = [];

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private firebase: FirebaseService) { 
    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.readItems();
  }

  readItems(){
    this.firebase.getReportajes().subscribe((reportajes)=>{
      this.reportajes = reportajes;
    });
  }

  async confirmAlert(reportaje:IReportaje){
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
            this.deleteItem(reportaje);
          },
        },
      ]
    });

    await alert.present();
  }

  async presentReportajeForm(reportaje?: IReportaje) {
    const modal = await this.modalController.create({
      component: ReportFormComponent,
      componentProps: { reportaje: reportaje || {} }
    });
    return await modal.present();
  }

  deleteItem(reportaje:IReportaje){
    this.firebase.deleteReportajeById(reportaje.rid as string);
  }

}
