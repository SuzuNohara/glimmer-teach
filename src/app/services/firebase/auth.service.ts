import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, UserCredential } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public uuid;
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);

  constructor(private route: Router) { }

  public createUser(name, email, password){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public async authtentication(email, password){
    await signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      return true;
    }).catch((error) => {
      return false;
    });
  }

  public async authState(){
    let app = initializeApp(environment.firebase);
    let auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uuid = user.uid;
        this.route.navigateByUrl('home');
      } else {
        this.route.navigateByUrl('');
      }
    });
  }

  public logout(){
    signOut(this.auth);
  }

  public login(email, password){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public currentuser(){
    return this.uuid;
  }
}
