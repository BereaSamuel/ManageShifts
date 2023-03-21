import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employeesList: User[] = [];

  employeeObject: User = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    userLoggedIn: '',
    admin: '',
  };

  username: string = '';
  firstName: string = '';
  lastName: string = '';
  age: string = '';
  email: string = '';
  admin: boolean;

  constructor(private auth: AuthService, private data: DataService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.data.getAllEmployees().subscribe((result) => {
      this.employeesList = result.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    }),
      (error) => {
        alert('Error while fetching employee data');
      };
  }

  resetForm() {
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.age = '';
  }

  addEmployee() {
    if (
      this.username == '' ||
      this.firstName == '' ||
      this.lastName == '' ||
      this.age == '' ||
      this.email == ''
    ) {
      alert('Fill all input fields');
      return;
    }

    this.employeeObject.username = this.username;
    this.employeeObject.firstName = this.firstName;
    this.employeeObject.lastName = this.lastName;
    this.employeeObject.email = this.email;

    this.data.addEmployee(this.employeeObject);

    this.resetForm();
  }

  deleteEmployee(employee: User) {
    if (
      window.confirm(
        'Are you sure you want to delete' +
          employee.firstName +
          '' +
          employee.lastName +
          '?'
      )
    )
      this.data.deleteEmployee(employee);
  }
}
