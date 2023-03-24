import { NgIf } from '@angular/common';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean;
  admin: boolean;

  // adding curent user
  private curentUser = new BehaviorSubject<string>('');
  uid = this.curentUser.asObservable();

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;

    this.admin = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        result.user.sendEmailVerification();
      })
      .catch((error) => {
        console.log('Auth Service: sigup error', error);
        if (error.code) {
          return { isValid: false, message: error.message };
        } else {
          return false;
        }
      });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        this.afAuth.onAuthStateChanged((user) => {
          if (user && user.email.includes('admin')) {
            this.admin = true;
            this.router.navigate(['/home-page-admin']);
          } else {
            this.admin = false;
            this.router.navigate(['/home-page-user']);
          }
        });
      })
      .catch((error) => {
        console.log('Auth Service:login error...');
        console.log('error code', error.code);
        console.log('error, error');
        if (error.code) {
          return { isValid: false, message: error.message };
        } else {
          return false;
        }
      });
  }

  // change user
  changeUser(uid: string) {
    this.curentUser.next(uid);
  }

  // call back the user from data

  async getCurentUser(): Promise<string> {
    let uid: any;
    

    await this.afAuth.currentUser.then((res) => {
      if (res) {
        uid = res.uid;
        localStorage.setItem('userUID', uid);
        console.log(uid)
      } else {
        uid = '';
      }
    });

    return uid;

   
  }

}
