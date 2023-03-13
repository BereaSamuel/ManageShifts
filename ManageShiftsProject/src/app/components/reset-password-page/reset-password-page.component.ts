import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css'],
})
export class ResetPasswordPageComponent {
  public form!: FormGroup;
  stored!: any;

  constructor(private formBuilder: FormBuilder) {}

  passwordReset: string = '';
  confirmPasswordReset: string = '';

  passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}';

  resetPassword = this.formBuilder.group(
    {
      passwordReset: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
      ],
      confirmPasswordReset: ['', Validators.required],
    },
    {
      validators: this.mustMatch('passwordReset', 'confirmPasswordReset'),
    }
  );

  reset() {
    if (
      this.resetPassword.get('passwordReset')?.value !=
      this.resetPassword.get('confirmPasswordReset')?.value
    ) {
      alert('Confirmation password must be the same as password');
    }

    this.stored = localStorage.getItem('userInfoLS');
    this.stored = JSON.parse(this.stored);
    if (this.stored) {
      this.stored.password = this.resetPassword.get('passwordReset')?.value;
      localStorage.setItem('userInfoLS', JSON.stringify(this.stored));
    }
  }

  mustMatch(passwordReset: any, confirmPasswordReset: any) {
    return (FormGroup: FormGroup) => {
      const passwordControl = FormGroup.controls[passwordReset];
      const confirmPasswordControls = FormGroup.controls[confirmPasswordReset];

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
