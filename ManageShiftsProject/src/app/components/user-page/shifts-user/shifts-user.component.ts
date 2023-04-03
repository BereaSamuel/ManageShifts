import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/model/shifts';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/users';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-shifts-user',
  templateUrl: './shifts-user.component.html',
  styleUrls: ['./shifts-user.component.css'],
})
export class ShiftsUserComponent implements OnInit, AfterContentInit {
  userId: string;
  constructor(
    private data: DataService,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {}
  selectedMonth: string;
  searchText: string = '';
  shiftsList: Shift[] = [];
  userShiftObj: Shift = {
    firstName: '',
    lastName: '',
    id: '',
    date: '',
    startTime: '',
    endTime: '',
    wage: '',
    shiftPlace: '',
    comment: '',
    userId: '',
    totalEarnings: '',
  };

  id: string = '';
  date: string = '';
  startTime: string = '';
  endTime: string = '';
  wage: string = '';
  shiftPlace: string = '';
  comment: string = '';

  ngOnInit() {
    this.userId = localStorage.getItem('userUID');

    this.getUserShifts();
  }

  ngAfterContentInit(): void {}

  addShift() {
    if (
      this.date == '' ||
      this.startTime == '' ||
      this.endTime == '' ||
      this.wage == '' ||
      this.shiftPlace == '' ||
      this.comment == ''
    ) {
      alert('Fill all the inputs');
      return;
    }
    const start = new Date(`01/01/2021 ${this.startTime}`);
    const end = new Date(`01/01/2021 ${this.endTime}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const totalEarnings = (hours * parseInt(this.wage)).toFixed(2);

    this.auth.getCurentUser().then((res) => {
      this.data.retriveUser(res).then((res) => {
        this.userShiftObj.firstName = res.firstName;
        this.userShiftObj.lastName = res.lastName;
        this.userShiftObj.id = this.id;
        this.userShiftObj.date = this.date;
        this.userShiftObj.startTime = this.startTime;
        this.userShiftObj.endTime = this.endTime;
        this.userShiftObj.wage = this.wage;
        this.userShiftObj.shiftPlace = this.shiftPlace;
        this.userShiftObj.comment = this.comment;
        this.userShiftObj.totalEarnings = totalEarnings;
        this.userShiftObj.userId = this.userId;

        this.data.addShift(this.userShiftObj);

        this.resetForm();

        this.selectedMonth = this.date.slice(0, 7);
      });
    });
  }

  resetForm() {
    this.date = '';
    this.startTime = '';
    this.endTime = '';
    this.wage = '';
    this.shiftPlace = '';
    this.comment = '';
  }

  clearFileds() {}

  getUserShifts() {
    this.data.getAllShiftsByUserId(this.userId).subscribe((shifts: Shift[]) => {
      this.shiftsList = shifts;
    });
  }
  editShift(shift: Shift) {
    this.data.deleteShifts(shift.id);
    this.id = shift.id;
    this.date = shift.date;
    this.startTime = shift.startTime;
    this.endTime = shift.endTime;
    this.wage = shift.wage;
    this.shiftPlace = shift.shiftPlace;
    this.comment = shift.comment;
  }
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }
  getMonthWithHighestEarnings(): string {
    const earningsByMonth = {};
    for (const shift of this.shiftsList) {
      const date = new Date(shift.date);
      const month = date.toLocaleString('en-US', { month: 'long' }); // Get month name in English
      const earnings = parseFloat(shift.totalEarnings);
      earningsByMonth[month] = (earningsByMonth[month] || 0) + earnings; // add earnings to total for month
    }
    let highestEarnings = 0;
    let bestMonth;
    for (const month in earningsByMonth) {
      if (earningsByMonth[month] > highestEarnings) {
        highestEarnings = earningsByMonth[month];
        bestMonth = month;
      }
    }
    return `${bestMonth} - ${highestEarnings}$`;
  }
}
