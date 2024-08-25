import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private firebase: FirebaseService) { 
    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.readItems();
  }

  async alertForm(reportaje?:IReportaje){
    const alert = await this.alertController.create({
      header: "Reportaje",
      inputs: [{
          type: 'text',
          name: 'title',
          placeholder: 'Titulo',
          value: reportaje?.title || ''
        },
        {
          type: 'textarea',
          name: 'content',
          placeholder: 'Contenido (max 150)',
          value: reportaje?.content || '',
          attributes: {
            maxlength: 150,
          },
        },
      ],
      buttons: [{
        text:'Añadir',
        handler: (alertData)=>{
          alertData.rid = reportaje?.rid || '';
          alertData.date = reportaje?.date || undefined;
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

  async handleSubmit(reportaje:IReportaje){
    if(reportaje.rid != '') {
      //MANEJA EL UPDATE
      this.firebase.updateReportaje(reportaje.rid as string,reportaje);
    }else{
      //MANEJA EL CREATE
      reportaje.date = new Date();
      this.firebase.addReportaje(reportaje);
    }
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

  deleteItem(reportaje:IReportaje){
    this.firebase.deleteReportajeById(reportaje.rid as string);
  }

}
