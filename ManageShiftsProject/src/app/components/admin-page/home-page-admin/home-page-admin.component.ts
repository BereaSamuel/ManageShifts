import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css']
})
export class HomePageAdminComponent {
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
