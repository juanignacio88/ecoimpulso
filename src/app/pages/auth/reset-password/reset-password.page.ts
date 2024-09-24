import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public submitted:boolean = false;
  public showMsg: boolean = false;
  public msg: string = 'Si el correo existe enviaremos un link para recuperar tu contraseña.';
  public form: FormGroup = new FormGroup({
    email: new FormControl(null,[
      Validators.required,
      Validators.email
    ])
  });
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }


  onSubmit(){
    this.submitted = true;
    this.showMsg = false;
    if(this.form.invalid) return;
    let email = this.form.get('email')?.value as string;
    this.authService.sendResetPasswordLink(email);
    this.showMsg = true;
  }

}
