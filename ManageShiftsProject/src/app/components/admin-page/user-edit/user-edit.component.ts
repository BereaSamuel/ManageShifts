import { Component, Inject} from '@angular/core';
import { User } from 'src/app/model/users';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  dialogForm: any;


  constructor(@Inject(MAT_DIALOG_DATA) public userData: User, public firestore: AngularFirestore, private router: Router){}

  users: User[] = [];

  user: User = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    userLoggedIn: '',
    admin: '',
    shiftNumber: 0
  };

  ngOnInit(): void {

  }

  updateUser(userId: string) {
    this.firestore.collection('users').doc(userId).update({
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      username: this.userData.username,
      email: this.userData.email,
      age: this.userData.age
    })
    .then(() => {
      alert('User updated successfully!');
    })
    .catch((error) => {
      console.log('Error updating user:', error);
    });
  }

}
