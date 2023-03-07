import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordPageComponent } from './components/user-page/reset-password-page/reset-password-page.component';
import { EditProfileComponent } from './components/user-page/edit-profile/edit-profile.component';
import { ShiftsComponent } from './components/user-page/shifts/shifts.component';
import { RegistrationPageComponent } from './components/user-page/registration-page/registration-page.component';
import { LoginPageComponent } from './components/user-page/login-page/login-page.component';
import { HomepageComponent } from './components/user-page/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'registration-page',
    component: RegistrationPageComponent
  },
  {
    path: 'login-page',
    component: LoginPageComponent
  },
  {
    path: 'home-page',
    component: HomepageComponent
  },
  {
    path: 'reset-password-page',
    component: ResetPasswordPageComponent
  },
  {
    path: 'shifts',
    component: ShiftsComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
