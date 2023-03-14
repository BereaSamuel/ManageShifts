
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent {

  public userInfo!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  username: string = '';
  firstName: string = '';
  lastName: string = '';
  age: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loggedOn: string = '';

  usernamePattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,15}';
  passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}';

  ngOnInit(): void {
    this.userInfo = this.formBuilder.group(
      {
        username: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(this.usernamePattern),
          ]),
        ],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: [
          '',
          Validators.compose([
            Validators.required,
            Validators.min(18),
            Validators.max(65),
          ]),
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(this.passwordPattern),
          ]),
        ],
        confirmPassword: ['', Validators.required],
        loggedOn: [''],
      },
      {
        validators: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  mustMatch(password: any, confirmPassword: any) {
    return (FormGroup: FormGroup) => {
      const passwordControl = FormGroup.controls[password];
      const confirmPasswordControls = FormGroup.controls[confirmPassword];

      if (
        confirmPasswordControls.errors &&
        !confirmPasswordControls.errors['mustMatch']
      ) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControls.value) {
        confirmPasswordControls.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControls.setErrors(null);
      }
    };
  }

  saveFormToLocalStorage() {
    localStorage.setItem('userInfoLS', JSON.stringify(this.userInfo.value));
  }
}

  public signupForm!: FormGroup
  firebaseErrorMessage: string;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private afAngular: AngularFireAuth){
    this.firebaseErrorMessage = '';
  }
 
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  age: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loggedOn: string = ''
 
  usernamePattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,15}';
  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}';
 
 ngOnInit(): void{
   this.signupForm = this.formBuilder.group({
     username: ['', Validators.compose([Validators.required, Validators.pattern(this.usernamePattern)])],
     firstName:  ['', Validators.required],
     lastName:  ['',Validators.required],
     age: ['', Validators.compose([Validators.required, Validators.min(18), Validators.max(65)])],
     email: ['', ([Validators.required, Validators.email])],
     password: ['', Validators.compose([Validators.required, Validators.pattern(this.passwordPattern)])],
     confirmPassword: ['', Validators.required],
     loggedOn: ['']
   },
   {
     validators: this.mustMatch('password', 'confirmPassword')
   }
   );
 }
 
 mustMatch(password: any, confirmPassword: any){
   return(FormGroup: FormGroup)=>{
     const passwordControl = FormGroup.controls[password];
     const confirmPasswordControls = FormGroup.controls[confirmPassword];
 
     if(confirmPasswordControls.errors && !confirmPasswordControls.errors['mustMatch']){
       return;
     }
 
     if(passwordControl.value !== confirmPasswordControls.value){
       confirmPasswordControls.setErrors({mustMatch: true});
     }else{
       confirmPasswordControls.setErrors(null);
     }
   }
 }

 signup(){
  if(this.signupForm.invalid){
    return;
  }

  this.authService.signupUser(this.signupForm.value).then((result) =>{
    if(result == null){
      this.router.navigate(['/login-page']);
    } else if(result.isValid == false){
      this.firebaseErrorMessage = result.messaege;
    }
  }).catch(() => {

  });
 }
 
}

