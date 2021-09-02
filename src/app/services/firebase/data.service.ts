import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  constructor() {}

  // Get a list of cities from your database
  public async getCities() {
    const dataCol = collection(this.db, 'salon');
    let snap = await getDocs(dataCol);
    const data = snap.docs.map(doc => doc.data());
    return data;
  }

}
