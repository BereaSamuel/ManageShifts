import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/model/shifts';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/users';

@Component({
  selector: 'app-shifts-user',
  templateUrl: './shifts-user.component.html',
  styleUrls: ['./shifts-user.component.css'],
})

export class ShiftsUserComponent implements OnInit, AfterContentInit {
  userId: string;
  constructor(private data: DataService, private auth: AuthService) {}

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
    userId: ''
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
          this.userShiftObj.userId = this.userId;
          
          this.data.addShift(this.userShiftObj);

          this.resetForm();
        })
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

    getUserShifts() {
      this.data.getAllShiftsByUserId(this.userId).subscribe((shifts: Shift[]) => {
        this.shiftsList = shifts;
      });
    }
}
