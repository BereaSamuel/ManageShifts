import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  public userInfo!: FormGroup
 
  constructor(private formBuilder: FormBuilder){}
 
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
   this.userInfo = this.formBuilder.group({
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
 
 saveFormToLocalStorage(){
   localStorage.setItem('userInfoLS', JSON.stringify(this.userInfo.value));
 }
}
