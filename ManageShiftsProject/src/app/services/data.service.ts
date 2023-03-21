import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/users';
import { Shift } from '../model/shifts';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  insert(
    id: string,
    dbName: string,
    username: string,
    email: string,
    admin: boolean,
    password: string,
    firstName: string,
    lastName: string,
    age: string,
    confirmPassword: string
  ) {
    this.firestore.collection(dbName).doc(id).set({
      password: password,
      email: email,
      admin: admin,
      username: username,
      firstName: firstName,
      lastName: lastName,
      age: age,
      confirmPassword: confirmPassword,
    });
  }
  constructor(private firestore: AngularFirestore, private auth: AuthService) {}
  async retriveUser(id: string): Promise<User> {
    let data: User;

    await this.firestore
      .collection('users')
      .doc(id)
      .get()
      .forEach((doc) => {
        data = doc.data() as User;
      });
    return data;
  }
  addShift(shifts: Shift) {
    this.auth.getCurentUser().then((res) => {
      shifts.id = res;
      return this.firestore.collection('/Shifts').add(shifts);
    });
  }
  getAllShifts() {
    return this.firestore.collection('/Shifts').snapshotChanges();
  }

  getShiftUserId(userId) {
    return this.firestore.collection('/Shifts', (ref) =>
      ref.where('id', '==', userId)
    );
  }

  // Andreea side
  //add employee
  addEmployee(employee: User) {
    employee.id = this.firestore.createId();
    return this.firestore.collection('/Employees').add(employee);
  }

  //get all employees
  getAllEmployees() {
    return this.firestore.collection('/Employees').snapshotChanges();
  }

  //delete employee
  deleteEmployee(employee: User) {
    return this.firestore.doc('/Employees/' + employee.id).delete();
  }

  //updateEmploee
  updateEmployee(employee: User) {
    this.deleteEmployee(employee);
    this.addEmployee(employee);
  }
}
