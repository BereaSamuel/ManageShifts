import { Component } from '@angular/core';
import { Shift } from 'src/app/model/shifts';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css']
})
export class HomePageAdminComponent {
  helloUser: string = 'admin';

  ngOnInit(){
  }


}


