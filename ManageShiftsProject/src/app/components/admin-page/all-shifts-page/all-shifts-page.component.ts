import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Shift } from 'src/app/model/shifts';
import { MatDialog } from '@angular/material/dialog';
import { ShiftEditComponent } from '../shift-edit/shift-edit.component';

@Component({
  selector: 'app-all-shifts-page',
  templateUrl: './all-shifts-page.component.html',
  styleUrls: ['./all-shifts-page.component.css']
})

export class AllShiftsPageComponent {
  constructor(private data: DataService, private dialog: MatDialog){}

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

  searchText: string = '';

  ngOnInit(): void {
    this.getAllShifts();
}

  getAllShifts() {
    this.data.getAllShifts().subscribe((shifts: Shift[]) => {
      this.shifts = shifts;
    });
  }
  
  deleteShift(shiftId: string) {
    this.data.deleteShift(shiftId).then(() => {
      console.log('Shift deleted successfully!');
    }).catch((error) => {
      console.log('Error deleting shift:', error);
    });
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
