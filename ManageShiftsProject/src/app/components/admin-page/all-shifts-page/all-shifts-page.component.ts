import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Shift } from 'src/app/model/shifts';

@Component({
  selector: 'app-all-shifts-page',
  templateUrl: './all-shifts-page.component.html',
  styleUrls: ['./all-shifts-page.component.css']
})

export class AllShiftsPageComponent {
  constructor(private data: DataService){}

  shifts: Shift[] = [];

  ngOnInit(): void {
    // this.data.getAllShifts().subscribe((data) => {
    //   this.shifts = data.map((e) => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...(e.payload.doc.data() as Shift),
    //     };
    //   });
    // });
}

  // deleteShift(shiftId: string) {
  //   this.data.deleteShift(shiftId).then(() => {
  //     console.log('Shift deleted successfully!');
  //     console.log(shiftId)
  //   }).catch((error) => {
  //     console.log('Error deleting shift:', error);
  //   });
  // }
}
