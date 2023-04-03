import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Shift } from 'src/app/model/shifts';
import { MatDialog } from '@angular/material/dialog';
import { ShiftEditComponent } from '../shift-edit/shift-edit.component';

@Component({
  selector: 'app-week-shifts',
  templateUrl: './week-shifts.component.html',
  styleUrls: ['./week-shifts.component.css']
})

export class WeekShiftsComponent {
  constructor(private data: DataService, private dialog: MatDialog){}

  shifts: Shift[] = [];

  searchText: string = '';

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

  deleteShift(shiftId:Shift) {
    this.data.deleteShift(shiftId);
    //pas 1 - folosinf userid din shift cautam usersul in colectia de users
    //pas 2 --schimb valoarea de la shifts number cu minus 1
    //pas 3 --delete shiftul 


    // this.data.deleteShift(shiftId).then(() => {
    //   console.log('Shift deleted successfully!');
    // }).catch((error) => {
    //   console.log('Error deleting shift:', error);
    // });
  }

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
  }

  openDialog(shift: Shift){
    let dialogRef = this.dialog.open(ShiftEditComponent, {
      data: shift
    });
    
  }
}