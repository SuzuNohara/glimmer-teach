import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  app = initializeApp(environment.firebase);
  public auth = getAuth(this.app);

  constructor(private route: Router) { }

  public async createUser(email, password){
    await createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      return true;
    }).catch((error) => {
      return false;
    });
  }

  public async authtentication(email, password){
    await signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      return true;
    }).catch((error) => {
      return false;
    });
  }

  public async authState(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.route.navigateByUrl('home');
      } else {
        this.route.navigateByUrl('');
      }
    });
  }

}
