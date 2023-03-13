import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';

import { HomePageAdminComponent } from './components/admin-page/home-page-admin/home-page-admin.component';
import { EditProfileAdminComponent } from './components/admin-page/edit-profile-admin/edit-profile-admin.component';
import { ShiftsAdminComponent } from './components/admin-page/shifts-admin/shifts-admin.component';

import { HomePageUserComponent } from './components/user-page/home-page-user/home-page-user.component';
import { EditProfileUserComponent } from './components/user-page/edit-profile-user/edit-profile-user.component';
import { ShiftsUserComponent } from './components/user-page/shifts-user/shifts-user.component';
import { EmployeesListComponent } from './components/admin-page/employees-list/employees-list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'registration-page',
    pathMatch: 'full'
  },
  {
    path: 'registration-page',
    component: RegistrationPageComponent
  },
  {
    path: 'login-page',
    component: LoginPageComponent
  },
  {
    path: 'reset-password-page',
    component: ResetPasswordPageComponent
  },

  {
    path: 'home-page-admin',
    component: HomePageAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile-admin',
    component: EditProfileAdminComponent
  },
  {
    path: 'employee-list',
    component: EmployeesListComponent
  },
  {
    path: 'shifts-admin',
    component: ShiftsAdminComponent,
  },

  {
    path: 'home-page-user',
    component: HomePageUserComponent
  },
  {
    path: 'edit-profile-user',
    component: EditProfileUserComponent
  },
  {
    path: 'shifts-user',
    component: ShiftsUserComponent
  },

  {
    path: '**',
    component: RegistrationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
