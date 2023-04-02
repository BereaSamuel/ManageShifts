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

  ngOnInit(): void{
    this.highestEarningMonth = this.getHighestEarningsMonth();
  }

  getHighestEarningsMonth() {
    const earningsByMonth = {};
    for (const shift of this.shifts) {
      const month = new Date(shift.date).getMonth();
      const earnings = shift.wage;
      if (earningsByMonth[month]) {
        earningsByMonth[month] += earnings;
      } else {
        earningsByMonth[month] = earnings;
      }
    }
    let highestEarnings = 0;
    let highestEarningsMonth = '';
    for (const month in earningsByMonth) {
      if (earningsByMonth[month] > highestEarnings) {
        highestEarnings = earningsByMonth[month];
        highestEarningsMonth = new Date(0, parseInt(month)).toLocaleString('default', { month: 'long' });
      }
    }
    return highestEarningsMonth;
  }

}