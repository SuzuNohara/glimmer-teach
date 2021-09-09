import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Horario } from 'src/app/model/horario';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.scss'],
})
export class CreateclassComponent implements OnInit {

  public hor: Horario;
  public nombre: string;

  public url: string;

  constructor(private alert: AlertService, private backend: BackendService, private route: Router, private modalController: ModalController) {
    this.hor = new Horario();
    this.nombre = '';
    this.url = '';
  }

  ngOnInit() {
  }

  public guardar(){
    if(this.nombre.length < 5){
      this.alert.simpleAlert('Error', 'Elige un nombre mas largo para tu salon de clases');
    }else{
      this.backend.saveClass(this.nombre, this.url, this.hor).then((data) => {
        this.alert.simpleAlert(this.nombre, 'Tu grupo ha sido creado exitosamente, comienza a gestionar tus actividades y periodos');
        this.dismiss();
      }).catch((error) => {
        this.alert.simpleAlert('Error', 'Ocurrio un error al guardar tus datos, intentalo mas tarde');
      });
    }
  }

  public back(){
    this.route.navigate(['home']);
  }

  public dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
