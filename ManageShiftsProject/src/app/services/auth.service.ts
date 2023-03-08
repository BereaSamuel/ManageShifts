import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn: boolean;
  
  constructor(private firebaseAuth: AngularFireAuth) {
    this.userLoggedIn = false;
    this.firebaseAuth.onAuthStateChanged(user=>{
      if(user){
        this.userLoggedIn = true;
      } else{
        this.userLoggedIn = false;
      }
    })
  }
}
