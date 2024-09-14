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
  reloadDisabled: boolean = false;
  searchTerm: string = '';
  filteredItems: IProducto[] = [];
  constructor(private firebase:FirebaseService,private auth:AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.readItems();
  }

  filterItems() {
    const term = this.searchTerm.toLowerCase();
    this.productos = this.productos.filter((item) =>
      this.normalizeString(item.title).includes(term)
    );
  }

  // Función para normalizar cadenas: convierte a minúsculas y elimina tildes
  normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD') // Descompone los caracteres acentuados
      .replace(/[\u0300-\u036f]/g, ''); // Elimina los signos diacríticos (tildes)
  }

  readItems(){
    this.reloadDisabled = true;
    this.searchTerm = '';
    this.firebase.getProductos().subscribe((p)=>{
      this.productos = p;
    });
    setInterval(()=>{
      this.reloadDisabled = false;
    },3000);
  }

  logOut(){
    this.auth.confirmLogOut();
  }

}
