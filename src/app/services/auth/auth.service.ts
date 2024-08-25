import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { IUsuario } from 'src/app/interfaces/db.interfaces';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage:LocalStorageService
  ) {}

  async register(email: string, password: string, role: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const uid = credential.user?.uid;
    if (uid) {
      return this.firestore.doc(`usuarios/${uid}`).set({
        uid,
        role,
        email
      });
    }
  }

  async login(email: string, password: string): Promise<IUsuario> {

    return new Promise(async (resolve,reject)=>{

      this.afAuth.signInWithEmailAndPassword(email, password)
      .then( async (credential) => {

        const uid = credential.user?.uid;

        if (uid) {
          // Obtener el documento del usuario desde Firestore utilizando await
          const userDoc = await lastValueFrom(this.firestore.collection('usuarios').doc(uid).get())
          if (userDoc.exists) {
            // Extraer el rol del documento del usuario
            const userData:any = userDoc.data();
            const role = userData?.role;
  
            const user = {
              email: credential.user?.email as string,
              uid: credential.user?.uid as string,
              role: role,
              refreshToken:credential.user?.refreshToken
            };
  
            this.storage.setUsuarioActivo(user);
            resolve(user);
          } else {
            reject('No se encontró el documento del usuario en Firestore.') 
          }
        } else {
          reject('No se pudo obtener el UID del usuario.') 
        }
      })
      .catch((error:FirebaseError)=>{
        reject(error);
      })
    });
  }

  async logout() {
    await this.afAuth.signOut();
    this.storage.logOut();
  }

}
