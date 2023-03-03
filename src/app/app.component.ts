import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private route: Router,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.route.navigate(['/registration']);
  }

}
