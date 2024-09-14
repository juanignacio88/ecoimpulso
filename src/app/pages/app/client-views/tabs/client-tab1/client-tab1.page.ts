import { Component, OnInit } from '@angular/core';
import { IReportaje } from 'src/app/interfaces/db.interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-client-tab1',
  templateUrl: './client-tab1.page.html',
  styleUrls: ['./client-tab1.page.scss'],
})
export class ClientTab1Page implements OnInit {

  reportajes:IReportaje[] = [];
  reloadDisabled: boolean = false;
  searchTerm: string = '';
  filteredItems: IReportaje[] = [];

  constructor(private firebase:FirebaseService,private auth:AuthService) { 
    this.readItems();
  }

  ngOnInit() {
  }

  filterItems() {
    const term = this.searchTerm.toLowerCase();
    this.reportajes = this.reportajes.filter((item) =>
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
    this.firebase.getReportajes().subscribe((reportajes)=>{
      this.reportajes = reportajes;
    });
    setInterval(()=>{
      this.reloadDisabled = false;
    },3000);
  }

  logOut(){
    this.auth.confirmLogOut();
  }

}
