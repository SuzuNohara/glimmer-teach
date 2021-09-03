import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore, collection, getDocs, setDoc, addDoc, doc} from 'firebase/firestore/lite';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from './auth.service';
import { BackendService } from '../backend.service';

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

  public async saveUser(user: Usuario){
    //const res = await addDoc(collection(this.db, 'usuario'), user);
    const some = await setDoc(doc(this.db, 'usuario/' + user.uuid), user);
  }

  public getUserInfo(currentUser){
    const dataCol = collection(this.db, 'usuario/' + currentUser);
    return getDocs(dataCol);
  }

}
