import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent implements OnInit {

  @Input() id: string;
  @Input() nombre: string;
  @Input() solicitudes: any[];

  public sol: any[];

  constructor(private alert: AlertService, private backend: BackendService, private route: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.sol = [];
    for(let solic of this.solicitudes){
      this.backend.getDoc(solic.usuario).then((data) => {
        this.sol.push(data.data());
        console.log(this.sol);
      });
    }
  }

  public dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
