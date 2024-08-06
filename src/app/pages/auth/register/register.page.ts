import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IUsuario } from 'src/app/interfaces/db.interfaces';
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
    private navController: NavController) { } //PERMITE LA NAVEGACION

  ngOnInit() {}

  //ALERTA EN CASO DE QUE EL CORREO YA EXISTA
  async presentAlert() {
    const alert = await this.alertController.create({
      header: "ERROR",
      message: "Ya existe un usuario con este email",
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
      let newUser:IUsuario = {
        email: email,
        password: password,
        role: "client"
      }

      //BUSCA TODOS LOS USUARIOS EN LA DB
      this.storage.getUsuarios().then((usuarios)=>{
        //FILTRA BUSCA SI UN USUARIO YA EXISTE POR EMAIL
        let u = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
        //COMPARA LOS CORREOS DEL USUARIO ENCONTRADO Y EL CORREO INGRESADO
        if(u?.email.toLowerCase() != email.toLowerCase()){
          //SI EL CORREO NO EXISTE ENTONCES REGISTRA EL USUARIO
          this.storage.addUsuario(newUser);
          this.navController.navigateBack('/auth/login'); //DESPUES DEL REGISTRO REDIRIGE AL LOGIN
        }else{
          //SI EL USUARIO EXISTE ENTONCES MUESTRA UNA ALERTA
          this.presentAlert();
        }
      })
    }
  }
}
