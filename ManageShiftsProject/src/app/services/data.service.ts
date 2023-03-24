import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/users';
import { Shift } from '../model/shifts';
import { AuthService } from './auth.service';
import { identifierName } from '@angular/compiler';

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
    confirmPassword: string,
    userLoggedIn: boolean
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
      userLoggedIn: userLoggedIn
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
  // Generate a random ID for the new shift
  const shiftId = this.firestore.createId();
 
  // Set the ID of the shift object to the new ID
  shifts.id = shiftId;

  // Add the shift to the Firestore collection using the new ID
  return this.firestore.collection('/Shifts').doc(shiftId).set(shifts);
  }

  
  getAllShifts() {
    return this.firestore.collection('/Shifts').valueChanges();
  }

  //add user
  addEmployee(employee: User) {
    employee.id = this.firestore.createId();
    return this.firestore.collection('/users').add(employee);
  }

  //get all employees
  getAllEmployees() {
    return this.firestore.collection('/users').snapshotChanges();
  }

  //delete employee
  deleteEmployee(employee: User) {
    return this.firestore.doc('/users/' + employee.id).delete();
  }

  //updateEmploee
  updateEmployee(employee: User) {
    this.deleteEmployee(employee);
    this.addEmployee(employee);
  }

  //delete shift
  deleteShift(shiftId: string) {
    return this.firestore.doc('/Shifts/' + shiftId).delete();
  }
  
}
