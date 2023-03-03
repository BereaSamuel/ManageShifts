import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  items: Observable<any[]>;
  constructor(
    private route: Router,
    private toast: ToastrService,
    private firestore: AngularFirestore
  ){
    this.items =  this.firestore.collection('ManageShiftsUserData').valueChanges();
  }

  ngOnInit(): void {
    this.route.navigate(['/registration']);
  }

}
