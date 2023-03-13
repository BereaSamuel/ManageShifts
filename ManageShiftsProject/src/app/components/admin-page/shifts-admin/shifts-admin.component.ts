import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shifts-admin',
  templateUrl: './shifts-admin.component.html',
  styleUrls: ['./shifts-admin.component.css']
})
export class ShiftsAdminComponent {
  public shiftForm!: FormGroup

  constructor(private formBuilder: FormBuilder) {}

  name_shift: string = '';
  slug_shift: string = '';
  workplace: string = '';
  start_shift: string = '';
  end_shift: string = '';
  hourly_wage: string = '';
  comments: string = ''

  ngOnInit(): void{
    this.shiftForm = this.formBuilder.group({
      name_shift: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      hourly_wage: ['', Validators.required],
      shift_place: ['', Validators.required],
      shift_name: ['', Validators.required],
      earnings: ['', Validators.required]
      // shifts: this.formBuilder.array([])
    });
  }

  slugs = [
    {value: 'slug-0', viewValue: 'Slug A'},
    {value: 'slug-1', viewValue: 'Slug B'},
    {value: 'slug-2', viewValue: 'Slug C'}
  ];

  addShift(){}

}
