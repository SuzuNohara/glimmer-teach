import { Component } from '@angular/core';
import { DataService } from '../services/firebase/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private data: DataService) {
    
  }

  public async getData(){
    let data = await this.data.getCities();
    console.log(data);
  }

}
