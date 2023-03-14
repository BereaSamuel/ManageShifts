import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-shifts-user',
  templateUrl: './shifts-user.component.html',
  styleUrls: ['./shifts-user.component.css'],
})
export class ShiftsUserComponent implements OnInit {
  myFormShift: FormGroup;
  items: Observable<any[]>;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {
    this.items = this.firestore
      .collection('ManageShiftsUserData')
      .valueChanges();
  }
  ngOnInit() {
    this.myFormShift = this.fb.group({
      date: '',
      start: '',
      end: '',
      wage: '',
      comment: '',
      shift: '',
    });
  }
  get shifts() {
    return this.myFormShift.get('shift') as FormArray;
  }

  addShift() {
    const shifts = this.fb.group({
      date: '',
      start: '',
      end: '',
      wage: '',
      comment: '',
      place: '',
    });
    this.shifts.push(shifts);
  }
  deletShift(i) {
    this.shifts.removeAt(i);
  }
  edit() {}
}
