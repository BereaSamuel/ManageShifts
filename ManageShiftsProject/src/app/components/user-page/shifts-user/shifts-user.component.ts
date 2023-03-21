import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Shift } from 'src/app/model/shifts';
import { Time } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-shifts-user',
  templateUrl: './shifts-user.component.html',
  styleUrls: ['./shifts-user.component.css'],
})
export class ShiftsUserComponent implements OnInit, AfterContentInit {
  constructor(private data: DataService, private auth: AuthService) {}

  shiftsList: Shift[] = [];
  userShiftObj: Shift = {
    id: '',
    date: '',
    startTime: '',
    endTime: '',
    wage: '',
    shiftPlace: '',
    comment: '',
  };
  id: string = '';
  date: string = '';
  startTime: string = '';
  endTime: string = '';
  wage: string = '';
  shiftPlace: string = '';
  comment: string = '';
  ngOnInit() {
    this.getAllShifts();
    // setTimeout(() => {
    //   this.getAllShifts();
    // }, 1000);
  }
  ngAfterContentInit(): void {}

  addShift() {
    this.getAllShifts();
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
    this.userShiftObj.id = this.id;
    this.userShiftObj.date = this.date;
    this.userShiftObj.startTime = this.startTime;
    this.userShiftObj.endTime = this.endTime;
    this.userShiftObj.wage = this.wage;
    this.userShiftObj.shiftPlace = this.shiftPlace;
    this.userShiftObj.comment = this.comment;

    this.data.addShift(this.userShiftObj);

    this.resetForm();
  }

  resetForm() {
    this.date = '';
    this.startTime = '';
    this.endTime = '';
    this.wage = '';
    this.shiftPlace = '';
    this.comment = '';
  }

  getAllShifts() {
    // this.data.getAllShifts().subscribe((result) => {
    //   this.shiftsList = result.map((e: any) => {
    //     const data = e.payload.doc.data();
    //     data.id = e.payload.doc.id;
    //     return data;
    //   });
    // }),
    //   (error) => {
    //     alert('Error while fetching employee data');
    //   };
    this.auth.getCurentUser().then((res) => {
      // console.log(res);
      this.data
        .getShiftUserId(res)
        .snapshotChanges()
        .subscribe((res) => {
          this.shiftsList = res.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            // console.log(data);
            return data;
          });
        });
    });
  }
}
