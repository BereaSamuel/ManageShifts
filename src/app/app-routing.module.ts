import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ShiftsComponent } from './components/shifts/shifts.component';

const routes: Routes = [
{
  path: 'registration',
  component: RegistrationComponent,
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'homepage',
  component: HomepageComponent
},
{
  path: 'reset-password',
  component: ResetPasswordComponent
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
