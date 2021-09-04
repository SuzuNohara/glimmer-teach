import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Salon } from '../model/salon';
import { BackendService } from '../services/backend.service';
import { ModalController } from '@ionic/angular';
import { ShowqrComponent } from '../components/showqr/showqr.component';
import { CreateclassComponent } from '../components/createclass/createclass.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public salones: Salon[];
  public loading: boolean;
  public nombre: string;
  public uuid: string;

  constructor(private route: Router, private backend: BackendService, private modalController: ModalController) {
    this.loading = true;
  }

  ngOnInit() {
    this.backend.authState();
    setTimeout(() => {
      this.backend.getUserInfo().then((data) => {
        this.nombre = data.nombre;
        this.uuid = data.uuid;
        this.getClass();
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    }, 300);
  }

  public navigateClass(){
    this.route.navigate(['classroom']);
  }

  public createClassRoom(){
    this.route.navigate(['createclass']);
  }

  public logout(){
    this.backend.logout();
  }

  private getClass(){
    this.backend.getClasses().then((data) => {
      this.salones = data;
    })
  }

  async presentModal(clase, content) {
    const modal = await this.modalController.create({
      component: ShowqrComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'content': content,
        'clase': clase
      }
    });
    return await modal.present();
  }

  async createClass() {
    const modal = await this.modalController.create({
      component: CreateclassComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'uuid': this.uuid
      }
    });
    modal.onWillDismiss().then(data => {
      this.getClass();
    });
    return await modal.present();
  }
}
