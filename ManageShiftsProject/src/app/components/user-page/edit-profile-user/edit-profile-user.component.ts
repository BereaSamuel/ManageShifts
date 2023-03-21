import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-user',
  templateUrl: './edit-profile-user.component.html',
  styleUrls: ['./edit-profile-user.component.css'],
})
export class EditProfileUserComponent {
  public userInfoEdit!: FormGroup;
  stored!: any;
  userInfoLS: any;

  constructor(private formBuilder: FormBuilder) {}

  usernameEdit: string = '';
  firstNameEdit: string = '';
  lastNameEdit: string = '';
  ageEdit: string = '';
  emailEdit: string = '';
  passwordEdit: string = '';
  confirmPasswordEdit: string = '';
  loggedOn: string = '';

  usernamePattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,15}';
  passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}';

  ngOnInit(): void {
    this.stored = localStorage.getItem('userInfoLS');
    this.stored = JSON.parse(this.stored);

    if (this.stored) {
      this.userInfoEdit = this.formBuilder.group(
        {
          usernameEdit: [
            this.stored.username,
            Validators.compose([
              Validators.required,
              Validators.pattern(this.usernamePattern),
            ]),
          ],
          firstNameEdit: [this.stored.firstName, Validators.required],
          lastNameEdit: [this.stored.lastName, Validators.required],
          ageEdit: [
            this.stored.age,
            Validators.compose([
              Validators.required,
              Validators.min(18),
              Validators.max(65),
            ]),
          ],
          emailEdit: [
            this.stored.email,
            [Validators.required, Validators.email],
          ],
          passwordEdit: [
            this.stored.password,
            Validators.compose([
              Validators.required,
              Validators.pattern(this.passwordPattern),
            ]),
          ],
          confirmPasswordEdit: [
            this.stored.confirmPassword,
            Validators.required,
          ],
          loggedOn: [''],
        },
        {
          validators: this.mustMatch('passwordEdit', 'confirmPasswordEdit'),
        }
      );

      // localStorage.setItem('userInfoLS', JSON.stringify(this.userInfoEdit));
    }
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
}
