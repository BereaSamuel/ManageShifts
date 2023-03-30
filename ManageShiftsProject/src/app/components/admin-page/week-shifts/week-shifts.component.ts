import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { format } from 'date-fns';

@Component({
  selector: 'app-week-shifts',
  templateUrl: './week-shifts.component.html',
  styleUrls: ['./week-shifts.component.css']
})
export class WeekShiftsComponent {
  constructor(private firestore: AngularFirestore){}

  shifts: any[] = [];

  ngOnInit(): void{
    const startOfWeek = new Date();
    const endOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    const startOfWeekFormatted = format(startOfWeek, 'yyyy-MM-dd');
    const endOfWeekFormatted = format(endOfWeek, 'yyyy-MM-dd');

    this.firestore.collection('shifts', ref => ref
      .where('date', '>=', startOfWeekFormatted)
      .where('date', '<=', endOfWeekFormatted)
      .orderBy('date', 'asc')
      .orderBy('startTime', 'asc')
    )
    .valueChanges({ idField: 'id' })
    .subscribe(shifts => {
      this.shifts = shifts;
      console.log('Week shifts:', this.shifts);
    });
  }
}