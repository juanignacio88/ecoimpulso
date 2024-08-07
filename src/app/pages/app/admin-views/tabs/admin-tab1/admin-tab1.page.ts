import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IReportaje } from 'src/app/interfaces/db.interfaces';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-admin-tab1',
  templateUrl: './admin-tab1.page.html',
  styleUrls: ['./admin-tab1.page.scss'],
})
export class AdminTab1Page implements OnInit {

  reportajes:IReportaje[] = [];

  constructor(private storage:LocalStorageService, private alertController: AlertController) { 
    
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
          alertData.id = reportaje?.id || undefined;
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
    if(reportaje.id != undefined) {
      //MANEJA EL UPDATE
      this.storage.updateReportaje(reportaje).then(()=>{
        this.readItems();
      });
    }else{
      //MANEJA EL CREATE
      reportaje.date = new Date();
      this.storage.addReportaje(reportaje).then(()=>{
        this.readItems();
      });
    }
  }

  readItems(){
    this.storage.getReportajes().then(r => this.reportajes = r);
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
    this.storage.deleteReportajeById(reportaje.id).then(()=>{
      this.readItems();
    })
  }

}
