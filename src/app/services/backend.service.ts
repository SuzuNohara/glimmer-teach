import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AuthService } from './firebase/auth.service';
import { DataService } from './firebase/data.service';

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

  public getUserInfo(){
    return this.data.getUserInfo(this.auth.currentuser());
  }

  public authState(){
    this.auth.authState();
  }

  public logout(){
    this.auth.logout();
  }

}
