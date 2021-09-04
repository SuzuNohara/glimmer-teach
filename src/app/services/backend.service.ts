import { Injectable } from '@angular/core';
import { Horario } from '../model/horario';
import { Salon } from '../model/salon';
import { Usuario } from '../model/usuario';
import { AuthService } from './firebase/auth.service';
import { DataService } from './firebase/data.service';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private auth: AuthService, private data: DataService) { }
  
  public signUp(name, email, password){
    this.auth.createUser(name, email, password).then((userCredential) => {
      let id = userCredential['_tokenResponse'].localId;
      let data: Usuario = {
        uuid: id,
        email: email,
        nombre: name,
        tipo: 2
      };
      this.data.saveUser(data);
    }).catch((error) => {
      console.log(error);
    })
  }

  public currentuser(){
    return this.auth.currentuser();
  }

  public async getUserInfo(): Promise<any>{
    let user = this.currentuser();
    return new Promise((resolve) => {
      this.data.getColection('usuario').then((data) => {
        let retorno = {};
        let dats = data.docs.map(doc => doc.data());
        for(let dat of dats){
          if(dat.uuid == user){
            retorno = dat;
            break;
          }
        }
        resolve(retorno);
      });
    });
    
  }

  public authState(){
    this.auth.authState();
  }

  public logout(){
    this.auth.logout();
  }

  public saveClass(name: string, url: string, horario: Horario){
    let data: Salon = {
      usuario: this.currentuser(),
      nombre: name,
      horario: JSON.stringify(horario),
      url: url,
      id: uuidv4()
    }
    return this.data.saveClass(data);
  }

  public async getClasses(): Promise<Salon[]>{
    let usuario = this.currentuser();
    return new Promise((resolve) => {
      this.data.getColection('usuario/' + usuario + '/salones').then((data) => {
        let retorno: Salon[] = [];
        let dats = data.docs.map(doc => doc.data());
        for(let dat of dats){
          retorno.push(JSON.parse(JSON.stringify(dat)));
        }
        resolve(retorno);
      });
    });
  }

}
