import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IUsuario } from 'src/app/interfaces/db.interfaces';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

interface IMsg{
  header: string,
  subtitle?: string,
  message: string
}

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

  //ARRAY PARA GUARDAR LOS USUARIOS Y VALIDAR LOGIN
  private users!: IUsuario[];

  constructor(
    private navController: NavController, //PERMITE LA NAVEGACION
    private alertController: AlertController, //MUESTRA LAS ALERTAS
    private storage:LocalStorageService) { //OPERACIONES CRUD DE LA DB
  }

  ngOnInit() {
    this.storage.logOut();
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


  onSubmit() : void{
    this.submitted = true;

    //SOLO INGRESA SI EL FORMULARIO ES VALIDO
    if(this.loginForm.valid){

      //VALOR DEL CORREO EN NUEVA VARIABLE
      let email = this.loginForm.get("email")?.value?.toLowerCase() as string;
      //VALOR DE LA CONTRASEÑA EN NUEVA VARIABLE
      let password = this.loginForm.get("password")?.value as string;

      //OBTIENE LOS USUARIOS DE LA DB
      this.storage.getUsuarios().then(u=>{
        this.users = u;
        //RECORRE LOS USUARIOS
        let user = this.users.find(u => {
          //SI ENCUENTRA UN USUARIO POR EMAIL ENTONCES LO RETORNA
          if(u.email.toLowerCase() == email) return u;
          //EN CASO DE NO ENCONTRAR NINGUNO RETORNA 'UNDEFINED'
          return undefined;
        })
        //SI EL USUARIO ES DISTINTO DE 'UNDEFINED'
        if (user != undefined){
          //SI LAS CONTRASEÑAS SON CORRECTAS
          if (user.password === password){
            //AÑADE EL USUARIO ACTIVO AL STORAGE
            this.storage.setUsuarioActivo(user);
            //INICIAMOS SESIÓN
            this.navigate(user);
          }else{
            //EN CASO DE CONTRASEÑA INCORRECTA SE MUESTRA MENSAJE
            let msg: IMsg = {
              header: "Login invalido",
              message: "Contraseña incorrecta"
            }
            this.loginAlert(msg);
          }
        }else{
          //EN CASO DE QUE EL CORREO NO EXISTA SE MUESTRA MENSAJE
          let msg: IMsg = {
            header: "Login invalido",
            message: "El usuario no existe"
          }
          this.loginAlert(msg);
        }
      });
    }
  }

  //REDIRIGE AL USUARIO A DISTINTAS PARTES DE LA APP SEGUN SU ROL
  navigate(user: IUsuario){
    if (user.role === "admin") this.navController.navigateRoot('admin');
    if (user.role === "client") this.navController.navigateRoot('client');
  }

}
