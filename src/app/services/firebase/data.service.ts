import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore, collection, documentId, getDocs, setDoc, addDoc, doc} from 'firebase/firestore/lite';
import { Usuario } from 'src/app/model/usuario';
import { Horario } from 'src/app/model/horario';
import { Salon } from 'src/app/model/salon';

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

  public async saveClass(data: Salon){
    return setDoc(doc(this.db, 'usuario/' + data.usuario + '/salones/' + data.id), data);
    // const some = await setDoc(doc(this.db, 'usuario/' + data.usuario + '/salones/' + data.usuario), data);
  }

  public getColection(colection: string){
    const dataCol = collection(this.db, colection);
    return getDocs(dataCol);
  }

  // public getDocument(doc: string){
  //   const d = documentI(this.db, doc);
  // }

}
