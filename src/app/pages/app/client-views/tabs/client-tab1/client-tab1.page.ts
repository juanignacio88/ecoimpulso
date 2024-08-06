import { Component, OnInit } from '@angular/core';
import { IReportaje } from 'src/app/interfaces/db.interfaces';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-client-tab1',
  templateUrl: './client-tab1.page.html',
  styleUrls: ['./client-tab1.page.scss'],
})
export class ClientTab1Page implements OnInit {

  reportajes:IReportaje[] = [];
  reloadDisabled: boolean = false;

  constructor(private storage:LocalStorageService) { 
    this.readItems();
  }

  ngOnInit() {
  }

  readItems(){
    this.reloadDisabled = true;
    this.storage.getReportajes().then(r => this.reportajes = r);
    setInterval(()=>{
      this.reloadDisabled = false;
    },3000);
  }

}
