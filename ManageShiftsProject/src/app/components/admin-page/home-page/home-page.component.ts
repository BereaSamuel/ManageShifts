import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Shift } from 'src/app/model/shifts';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private data: DataService, private dialog: MatDialog){}

  shifts: Shift[] = [];
  helloUser: string = 'admin';

  ngOnInit(){

  }
}
