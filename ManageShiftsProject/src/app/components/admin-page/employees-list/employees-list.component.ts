import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit{
  employeesList: Employee[] = [];

  employeeObject: Employee = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    age: '',
    password: '',
    confirm_password: ''
  };

  id: string = '';
  username: string = '';
  first_name: string = '';
  last_name: string = '';
  age: string = '';
  email: string = '';

  constructor(private auth: AuthService, private data: DataService){}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.data.getAllEmployees().subscribe(result => {
      this.employeesList = result.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }), error => {
      alert('Error while fetching employee data');
    }
  }

  resetForm(){
    this.id = '';
    this.username = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.age = '';
  }

  addEmployee(){
    if(this.username == '' || this.first_name == '' || this.last_name == '' || this.age == '' || this.email == ''){
      alert('Fill all input fields');
      return;
    }

    this.employeeObject.id = '';
    this.employeeObject.username = this.username;
    this.employeeObject.first_name = this.first_name;
    this.employeeObject.last_name = this.last_name;
    this.employeeObject.email = this.email;

    this.data.addEmployee(this.employeeObject);

    this.resetForm();
  }

  updateEmployee(){

  }

  deleteEmployee(employee: Employee){
    if(window.confirm('Are you sure you want to delete'+employee.first_name+''+employee.last_name+'?'))
    this.data.deleteEmployee(employee);
  }
}
