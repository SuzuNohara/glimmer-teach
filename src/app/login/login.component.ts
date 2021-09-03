import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/firebase/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public email: string;
  public contra: string;

  constructor(private auth: AuthService, private route: Router, private alert: AlertService) { }

  ngOnInit() {
    this.auth.authState();
    this.email = '';
    this.contra = '';
    
  }

  public register(){
    this.route.navigate(['register']);
  }

  public login(){
    this.auth.login(this.email, this.contra).then((userCredential) => {
      this.email = '';
      this.contra = '';
    }).catch((error) => {
      this.alert.simpleAlert('Error', 'Ocurrio un error al iniciar sesion, verifica tus datos de acceso');
    });
  }
}
