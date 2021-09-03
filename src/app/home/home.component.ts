import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public loading: boolean;
  public nombre: string;
  public salones: any;

  constructor(private route: Router, private backend: BackendService) {
    this.loading = true;
  }

  ngOnInit() {
    this.backend.authState();
    setTimeout(() => {
      this.backend.getUserInfo().then((data) => {
        console.log(data);
        this.loading = false;
      }).catch((error) => {
        console.log(error);
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
}
