import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from '../../../services/data.service';
import { User } from 'src/app/model/users';
import { take } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-profile-user',
  templateUrl: './edit-profile-user.component.html',
  styleUrls: ['./edit-profile-user.component.css'],
})
export class EditProfileUserComponent implements OnInit {
  public userInfoEdit!: FormGroup;
  stored!: User;
  userInfoLS: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private afAngular: AngularFireAuth,
    private data: DataService,
    private firestore: AngularFirestore
  ) {}

  usernamePattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,15}';
  passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}';

  ngOnInit(): void {
    this.getUserDetails();

    this.userInfoEdit = this.formBuilder.group(
      {
        usernameEdit: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(this.usernamePattern),
          ]),
        ],
        firstNameEdit: ['', Validators.required],
        lastNameEdit: ['', Validators.required],
        ageEdit: [
          '',
          Validators.compose([
            Validators.required,
            Validators.min(18),
            Validators.max(65),
          ]),
        ],
        emailEdit: ['', [Validators.required, Validators.email]],
        passwordEdit: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(this.passwordPattern),
          ]),
        ],
        confirmPasswordEdit: ['', Validators.required],
        loggedOn: [''],
      },
      {
        validators: this.mustMatch('passwordEdit', 'confirmPasswordEdit'),
      }
    );

    console.log(this.userInfoEdit.controls);
  }

  mustMatch(passwordEdit: any, confirmPasswordEdit: any) {
    return (FormGroup: FormGroup) => {
      const passwordControl = FormGroup.controls[passwordEdit];
      const confirmPasswordControls = FormGroup.controls[confirmPasswordEdit];

      if (
        confirmPasswordControls.errors &&
        !confirmPasswordControls.errors['mustMatch']
      ) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControls.value) {
        confirmPasswordControls.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControls.setErrors(null);
      }
    };
  }
  getUserDetails() {
    const uid = localStorage.getItem('userUID');

    this.data
      .getCurentUserDetails(uid)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res.data());
        const data: User = res.data() as User;
        this.userInfoEdit.controls['firstNameEdit'].setValue(data.firstName);
        this.userInfoEdit.controls['lastNameEdit'].setValue(data.lastName);
        this.userInfoEdit.controls['emailEdit'].setValue(data.email);
        this.userInfoEdit.controls['ageEdit'].setValue(data.age);
        this.userInfoEdit.controls['passwordEdit'].setValue(data.password);

        console.log(data);
      });
  }
  updateEdit() {
    // const dataToUpdate = this.userInfoEdit.value;
    console.log('merge');
    this.authService.getCurentUser().then((res) => {
      this.firestore
        .collection('users')
        .doc(res)
        .update({ firstName: this.userInfoEdit.get('firstNameEdit').value });
    });
  }
}
