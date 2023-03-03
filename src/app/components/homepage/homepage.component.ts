import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  stored!: any

  helloUser: string = '';

  

  ngOnInit(): void{
    this.stored = localStorage.getItem('userInfoLS');
    this.stored = JSON.parse(this.stored);
  
    if(this.stored){
      this.helloUser = this.stored.username;
    }

  }
}
