import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Shift } from 'src/app/model/shifts';

@Component({
  selector: 'app-home-page-user',
  templateUrl: './home-page-user.component.html',
  styleUrls: ['./home-page-user.component.css'],
})
export class HomePageUserComponent implements OnInit {
  stored!: any;

  helloUser: string = '';
  constructor(private auth: AuthService, private data: DataService) {}
  shiftsList: Shift[] = [];
  ngOnInit(): void {
    this.auth.getCurentUser().then((res) => {
      this.data
        .getShiftUserId(res)
        .snapshotChanges()
        .subscribe((res) => {
          this.shiftsList = res.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;

            return data;
          });
        });
    });
  }
}
