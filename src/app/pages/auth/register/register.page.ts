import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';
import { IUsuario } from 'src/app/interfaces/db.interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //INDICA SI YA INTENTARON ENVIAR EL FORMULARIO
  submitted = false;

  //CONTIENE LOS CAMPOS DEL FORMULARIO EN OBJETO FORMGROUP
  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    repeatPassword: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private storage:LocalStorageService, //OPERACIONES CRUD DE LA DB
    private alertController: AlertController, //MUESTRA LAS ALERTAS
    private navController: NavController,//PERMITE LA NAVEGACION
    private authService: AuthService) { } 

  ngOnInit() {}

  //ALERTA EN CASO DE QUE EL CORREO YA EXISTA
  async emailAlert() {
    const alert = await this.alertController.create({
      header: "ERROR",
      message: "Ya existe un usuario con este email",
      buttons: ['Ok'],
    });
    await alert.present();
  }

    //ALERTA PARA NOTIFICAR ERRORES
  async passwordAlert() {
    const alert = await this.alertController.create({
      header: "ERROR",
      message: "La contraseña es muy debil, mínimo 6 caracteres",
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async onSubmit(){
    this.submitted = true;

    //SI EL FORMULARIO CUMPLE LAS VALIDACIONES Y AMBAS CONTRASEÑAS SON CORRECTAS
    if(this.registerForm.valid && this.registerForm.get("password")?.value == this.registerForm.get("repeatPassword")?.value){
      //OBTIENE EL CORREO DEL FORMULARIO Y LO GUARDA EN NUEVA VARIABLE
      let email = this.registerForm.get("email")?.value?.toLowerCase() as string;
      //OBTIENE LA CONTRASEÑA DEL FORMULARIO Y LO GUARDA EN NUEVA VARIABLE
      let password = this.registerForm.get("password")?.value as string;
      //CREAMOS EL NUEVO OBJETO CON LOS DATOS DEL FORMULARIO Y ROL POR DEFECTO 'CLIENT'

      this.authService.register(email,password,'client')
      .then(r=>{
        this.navController.navigateRoot('auth/login');
      })
      .catch((e:FirebaseError)=>{
        switch (e.code){
          case 'auth/email-already-in-use':
            this.emailAlert();
            break;
          case 'auth/weak-password':
            this.passwordAlert();
            break;
        }
      })
    }
  }
}
