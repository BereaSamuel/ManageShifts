import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { User } from 'src/app/model/users';

@Component({
  selector: 'app-worker-of-the-month',
  templateUrl: './worker-of-the-month.component.html',
  styleUrls: ['./worker-of-the-month.component.css']
})
export class WorkerOfTheMonthComponent {

  constructor(private firestore: AngularFirestore){}

  workerOfTheMonth: string = '';

  ngOnInit(){
    this.firestore.collection('users', ref => ref.orderBy('shiftNumber', 'desc')).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    )
    .subscribe(users => {
      // The user with the most shifts will be the first user in the array
      const workerOfTheMonth = users[0];
      this.workerOfTheMonth = (workerOfTheMonth.data as User).firstName + ' ' + (workerOfTheMonth.data as User).lastName;
    });
  }
}
