import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/users';
import { Shift } from '../model/shifts';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  shift: Shift;
  subscribe(arg0: (shift: Shift[]) => void) {
    throw new Error('Method not implemented.');
  }
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
  return this.firestore.collection('Shifts').doc(shiftId).set(shifts);
  }

  getAllShiftsByUserId(userId: string) {
    return this.firestore
      .collection('/Shifts', (ref) =>
        ref.where('userId', '==', userId)
      )
      .valueChanges({ idField: 'id' });
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

  getAllShifts() {
    return this.firestore.collection('/Shifts').valueChanges();
  }

  //delete employee
  deleteEmployee(employee: string) {
    return this.firestore.doc('/users/' + employee).delete();
  }

  //delete shift
  deleteShift(shiftId: string) {
    return this.firestore.doc('/Shifts/' + shiftId).delete();
  }
    
  //editEmploee
  editEmployee(employee: User) {
    const employeeId = employee.id;
    delete employee.id; // remove id property from the employee object
  
    return this.firestore.collection('/users').doc(employeeId).update(employee);
  }

 
}
