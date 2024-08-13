import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';
import { IUsuario } from 'src/app/interfaces/db.interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  //INDICA SI YA INTENTARON ENVIAR EL FORMULARIO
  submitted = false;

  //CONTIENE LOS CAMPOS DEL FORMULARIO EN OBJETO FORMGROUP
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private navController: NavController, //PERMITE LA NAVEGACION
    private alertController: AlertController, //MUESTRA LAS ALERTAS
    private authService:AuthService) { 
  }

  ngOnInit() {
    this.authService.logout();
  }

  //ALERTA PARA NOTIFICAR ERRORES
  async loginAlert(msg: any) {
    const alert = await this.alertController.create({
      header: msg.header,
      message: msg.message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  login() {
    this.submitted = true;
    if(this.loginForm.valid){

      //VALOR DEL CORREO EN NUEVA VARIABLE
      let email = this.loginForm.get("email")?.value?.toLowerCase() as string;
      //VALOR DE LA CONTRASEÑA EN NUEVA VARIABLE
      let password = this.loginForm.get("password")?.value as string;

      this.authService.login(email, password)
      .then((user:IUsuario) => {
        this.navigate(user.role);
      })
      .catch((error: FirebaseError) => {
        switch (error.code) {
          case 'auth/too-many-requests':
            this.loginAlert({
              header:'Bloqueo temporal',
              message:'Demaciados intentos fallidos, el usuario ha sido bloqueado temporalmente'
            });
            break;
          case 'auth/invalid-credential':
            this.loginAlert({
              header:'Error de login',
              message:'Correo o contraseña incorrecto'
            });
            break;
        }
      });
    }
  }

  //REDIRIGE AL USUARIO A DISTINTAS PARTES DE LA APP SEGUN SU ROL
  navigate(role: string){
    if (role === "admin") this.navController.navigateRoot('admin');
    if (role === "client") this.navController.navigateRoot('client');
  }

}
