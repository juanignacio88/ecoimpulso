import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalStorageService } from './services/localStorage/local-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appReady:boolean = false;

  constructor(private storage:LocalStorageService, private platform: Platform) {
    this.platform.ready().then(()=>{
      this.storage.createStorage();
      this.appReady = true;
    });

    
  }
  /*
  async initApp(){
    this.platform.ready()
    .then(async ()=>{
      const info = await Device.getInfo()

      this.isWeb = info.platform == "web"; //ERROR

      this.database.init();
      this.database.dbReady.subscribe( load =>{
        this.load = load;
      });
    })
  }*/
}
