import { Component, Input } from '@angular/core';
import { Shift } from 'src/app/model/shifts';

@Component({
  selector: 'app-highest-earnings-month',
  templateUrl: './highest-earnings-month.component.html',
  styleUrls: ['./highest-earnings-month.component.css']
})
export class HighestEarningsMonthComponent {

  @Input() shifts: Shift[] = [];
  highestEarningMonth: string = '';

  getHighestEarningsMonth() {
    let monthEarningsMap = new Map<string, number>();
    this.shifts.forEach((shift) => {
      let earnings = parseFloat(shift.wage);
      let date = new Date(shift.date);
      let month = date.toLocaleString('default', { month: 'long' });
      if (monthEarningsMap.has(month)) {
        earnings += monthEarningsMap.get(month)!;
      }
      monthEarningsMap.set(month, earnings);
    });

    let highestEarnings = 0;
    monthEarningsMap.forEach((earnings, month) => {
      if (earnings > highestEarnings) {
        highestEarnings = earnings;
        this.highestEarningMonth = month;
      }
    });
  }
}