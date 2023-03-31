import { Component } from '@angular/core';
import { Shift } from 'src/app/model/shifts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-week-shifts',
  templateUrl: './week-shifts.component.html',
  styleUrls: ['./week-shifts.component.css']
})

export class WeekShiftsComponent {
  constructor(private data: DataService){}

  shifts: Shift[]=[];

  ngOnInit(): void {
    const today = new Date();
    const startOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
    const endOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    this.data.getShiftsByDateRange(startOfLastWeek, endOfLastWeek).subscribe((shifts: Shift[]) => {
      this.shifts = shifts;
      console.log(shifts)
    });
  }

  isShiftThisWeek(shift: Shift): boolean {
    const today = new Date();
    const startOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
    const endOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    const shiftDate = new Date(shift.date);

    return shiftDate >= startOfLastWeek && shiftDate <= endOfLastWeek;
  }
}