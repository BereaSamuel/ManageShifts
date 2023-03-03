import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  stored!: any
 
  constructor(){}

  usernameLogin: string = '';
  passwordLogin: string = '';

  loginInfo = new FormGroup({
    usernameLogin: new FormControl('', Validators.required),
    passwordLogin: new FormControl('', Validators.required)
  });

  login(){
    this.stored = localStorage.getItem('userInfoLS');
    this.stored = JSON.parse(this.stored);
    
    if(this.stored.username === this.loginInfo.get('usernameLogin')?.value
      && this.stored.password === this.loginInfo.get('passwordLogin')?.value){
        this.stored.loggedOn = true;
        localStorage.setItem('userInfoLS', JSON.stringify(this.stored));
    } else{
      alert('username or password invalid')
    }
  }
}
