import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public nombre: string;
  public email: string;
  public contra: string;

  constructor(private route: Router, private alert: AlertService, private backend: BackendService) { }

  ngOnInit() {
    this.nombre = '';
    this.email = '';
    this.contra = '';
  }
  
  public back(){
    this.route.navigate(['']);
  }

  public register(){
    if(this.nombre.length >= 7){
      if(this.email.length > 10 && this.email.indexOf('@') && this.email.indexOf('@') < this.email.lastIndexOf('.')){
        if(this.contra.length >= 8){
          this.backend.signUp(this.nombre, this.email, this.contra);
          console.log('creando usuario');
        }else{
          this.alert.simpleAlert('Error', 'Tu contrasena debe contener al menos 8 caracteres');
        }
      }else{
        this.alert.simpleAlert('Error', 'Hay un problema con tu correo, verifica nuevamente');
      }
    }else{
      this.alert.simpleAlert('Error', 'Asegurate de haber ingresado tu nombre completo, de otra forma tus profesores no podran identificarte');
    }
  }

}
