import { Injectable } from '@angular/core';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { User } from '../model/users';
import { Shift } from '../model/shifts';
import { AuthService } from './auth.service';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  shift: Shift;

  startDate: Date;
  endDate: Date;
  
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
    userLoggedIn: boolean,
    shiftNumber: number
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
      userLoggedIn: userLoggedIn,
      shiftNumber: shiftNumber
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
  
  async addShift(shifts: Shift) {
  // Generate a random ID for the new shift
  const shiftId = this.firestore.createId();
 
  // Set the ID of the shift object to the new ID
  shifts.id = shiftId;
  const shiftUserUID = shifts.userId

  // Add the shift to the Firestore collection using the new ID
  await this.firestore.collection('Shifts').doc(shiftId).set(shifts);
  
  const user = await this.retriveUser(shifts.userId);
  user.shiftNumber ++;

  this.firestore.collection('users').doc(shiftUserUID).update({
    shiftNumber: user.shiftNumber
  })
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
  deleteShift(shiftId:Shift) {

      this.retriveUser(shiftId.userId).then(res=>{
        this.firestore.collection('users').doc(shiftId.userId).update({
          shiftNumber: res.shiftNumber-1
        }).then(res=>{
           this.firestore.doc('/Shifts/' + shiftId.id).delete();
        })
      })

      
  }
    
  //editEmploee
  editEmployee(employee: User) {
    const employeeId = employee.id;
    delete employee.id; // remove id property from the employee object
  
    return this.firestore.collection('/users').doc(employeeId).update(employee);
  }

  // getShiftsByDateRange(startDate: Date, endDate: Date) {
  //   return this.firestore.collection<Shift>('Shifts', ref => 
  //     ref.where('date', '>=', startDate).where('date', '<=', endDate))
  //     .valueChanges({ idField: 'id' });
  // }

  getShiftsByDateRange(startDate: Date, endDate: Date) {
    // return this.firestore.collection<Shift>('Shifts', ref => 
    //   ref.where('date', '>=', startDate))
    //   .valueChanges({ idField: 'id' });

    //   const startdatenew= new Intl.DateTimeFormat('en-UK',{year:'numeric',month:'2-digit',day:'2-digit'}).format(startDate).replace(/\//g,"-");
    //  const dbstartdate= this.formatDate(startdatenew);
    //  console.log(dbstartdate);
        
  // const ref = this.firestore.collection<Shift>('Shifts',ref=>ref.where('comment','==','sd'));
  //     return ref.valueChanges();

      //   return this.firestore.collection<Shift>('Shifts', ref => 
      // ref.where('date', '>=', dbstartdate))
      // .valueChanges({ idField: 'id' });
      return this.firestore.collection<Shift>('Shifts').valueChanges();
  }

  formatDate( date:string):string{
    let transform= date.split('-');
    let day = transform[0];
    let month=transform[1];
    let year=transform[2];
    return year+'-'+month+'-'+day




  }
}
