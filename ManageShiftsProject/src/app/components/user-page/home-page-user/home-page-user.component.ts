import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-user',
  templateUrl: './home-page-user.component.html',
  styleUrls: ['./home-page-user.component.css'],
})
export class HomePageUserComponent {
  stored!: any;

  helloUser: string = '';

  ngOnInit(): void {
    this.stored = localStorage.getItem('userInfoLS');
    this.stored = JSON.parse(this.stored);

    if (this.stored) {
      this.helloUser = this.stored.username;
    }
  }
}
