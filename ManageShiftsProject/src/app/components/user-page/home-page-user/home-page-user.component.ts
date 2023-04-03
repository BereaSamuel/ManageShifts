import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Shift } from 'src/app/model/shifts';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-home-page-user',
  templateUrl: './home-page-user.component.html',
  styleUrls: ['./home-page-user.component.css'],
})
export class HomePageUserComponent implements OnInit {
  stored!: any;

  helloUser: string = '';
  constructor(private auth: AuthService, private data: DataService) {}

  ngOnInit(): void {
    this.getCurentUserLogedIn();
  }

  getCurentUserLogedIn() {
    const uid = localStorage.getItem('userUID');
    this.data.retriveUser(uid).then((res) => {
      this.helloUser = res.username;
    });
  }
}
