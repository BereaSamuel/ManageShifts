import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css']
})
export class HomePageAdminComponent {
  helloUser: string = '';

  constructor(private afs: AngularFirestore, private auth: AuthService, private data: DataService){}

    ngOnInit(): void{
      this.auth.getCurentUser().then((res) => {
        this.data.retriveUser(res).then((res) => {
          this.helloUser = res.username;
        })
      })
}


}
