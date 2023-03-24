import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/model/users';

@Component({
  selector: 'app-all-workers-page',
  templateUrl: './all-workers-page.component.html',
  styleUrls: ['./all-workers-page.component.css']
})
export class AllWorkersPageComponent {
  constructor(private data: DataService) {}

  users: User[] = [];

  ngOnInit(): void {
      this.data.getAllEmployees().subscribe((data) => {
      this.users = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as User),
        };
      });
    });
  }
}
