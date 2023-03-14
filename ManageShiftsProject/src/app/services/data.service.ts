import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }


  //add employee
  addEmployee(employee: Employee){
    employee.id =  this.afs.createId();
    return this.afs.collection('/Employees').add(employee);
  }

  //get all employees
  getAllEmployees(){
    return this.afs.collection('/Employees').snapshotChanges();
  }

  //delete employee
  deleteEmployee(employee: Employee){
    return this.afs.doc('/Employees/'+employee.id).delete();
  }

  //updateEmploee
  updateEmployee(employee: Employee){
    this.deleteEmployee(employee);
    this.addEmployee(employee);
  }
}
