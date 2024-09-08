import { Component, OnInit } from '@angular/core';
import { IProducto } from 'src/app/interfaces/db.interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-client-tab3',
  templateUrl: './client-tab3.page.html',
  styleUrls: ['./client-tab3.page.scss'],
})
export class ClientTab3Page implements OnInit {

  productos: IProducto[] = [];
  constructor(private firebase:FirebaseService,private auth:AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.readItems();
  }

  readItems(){
    this.firebase.getProductos().subscribe((p)=>{
      this.productos = p;
    });
  }

  logOut(){
    this.auth.confirmLogOut();
  }

}
