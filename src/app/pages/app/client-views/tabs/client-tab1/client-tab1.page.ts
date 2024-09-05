import { Component, OnInit } from '@angular/core';
import { IReportaje } from 'src/app/interfaces/db.interfaces';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-client-tab1',
  templateUrl: './client-tab1.page.html',
  styleUrls: ['./client-tab1.page.scss'],
})
export class ClientTab1Page implements OnInit {

  reportajes:IReportaje[] = [];
  reloadDisabled: boolean = false;

  constructor(private firebase:FirebaseService) { 
    this.readItems();
  }

  ngOnInit() {
  }

  readItems(){
    this.reloadDisabled = true;

    this.firebase.getReportajes().subscribe((reportajes)=>{
      console.log(reportajes);
      this.reportajes = reportajes;
    });

    setInterval(()=>{
      this.reloadDisabled = false;
    },3000);
  }

}
