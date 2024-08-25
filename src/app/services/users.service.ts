import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUsuario } from '../interfaces/db.interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usuarios$!: Observable<IUsuario[]>;
  private usuariosCollection = this.firestore.collection<IUsuario>('usuarios');
  constructor(private firestore: AngularFirestore) { }

  getUsuarios(): Observable<IUsuario[]> {
    return this.usuarios$ = this.usuariosCollection.valueChanges();
  }

}
