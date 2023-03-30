import { Component, Inject } from '@angular/core';
import { Shift } from 'src/app/model/shifts';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-shift-edit',
  templateUrl: './shift-edit.component.html',
  styleUrls: ['./shift-edit.component.css']
})

export class ShiftEditComponent {
  dialogForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public shiftData: Shift, private firestore: AngularFirestore){}
  
  shifts: Shift[] = [];

  shift: Shift = {
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

  ngOnInit(): void{

  }

  updateShift(shiftId: string) {
    this.firestore.collection('Shifts').doc(shiftId).update({
      date: this.shiftData.date,
      startTime: this.shiftData.startTime,
      endTime: this.shiftData.endTime,
      wage: this.shiftData.wage,
      shiftPlace: this.shiftData.shiftPlace
    })
  }

}