import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  firebaseErrorMessage: string;
 
  constructor(private router: Router, private authService: AuthService, private afAuth: AngularFireAuth){
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'admin': new FormControl('')
    });
    this.firebaseErrorMessage = '';
  }

  loginUser(){
    if(this.loginForm.invalid){
      return;
    }

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) =>{
        if(result == null){
          alert('logging in...');
        } else if(result == false){
          console.log('login error', result);
          alert('login error');
          this.firebaseErrorMessage = result.message;
        }
      })
  }
}

