import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-showqr',
  templateUrl: './showqr.component.html',
  styleUrls: ['./showqr.component.scss'],
})
export class ShowqrComponent implements OnInit {

  @Input() content: string;
  @Input() clase: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

  public dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
