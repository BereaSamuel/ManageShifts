import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/model/users';

@Component({
  selector: 'app-all-workers-page',
  templateUrl: './all-workers-page.component.html',
  styleUrls: ['./all-workers-page.component.css']
})
export class AllWorkersPageComponent {
  constructor(private data: DataService) {}

  users: User[] = [];

  searchText: string = '';

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.data.getAllEmployees().subscribe((data) => {
      this.users = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as User),
        };
      });
    });
  }

  deleteEmployee(employee: string){
    this.data.deleteEmployee(employee).then(() => {
      console.log('Worker deleted successfully!');
    }).catch((error) => {
      console.log('Error deleting worker:', error)
    })
  }

  editEmployee(updatedEmployee: User) {
    this.data.editEmployee(updatedEmployee).then(() => {
      console.log('Worker updated successfully!');
    }).catch((error) => {
      console.log('Error updating worker:', error)
    })
  }

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
  }
}
