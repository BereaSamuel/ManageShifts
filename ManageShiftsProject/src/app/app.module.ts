import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';
import { HomePageAdminComponent } from './components/admin-page/home-page-admin/home-page-admin.component';
import { HomePageUserComponent } from './components/user-page/home-page-user/home-page-user.component';
import { ShiftsAdminComponent } from './components/admin-page/shifts-admin/shifts-admin.component';
import { EditProfileAdminComponent } from './components/admin-page/edit-profile-admin/edit-profile-admin.component';
import { ShiftsUserComponent } from './components/user-page/shifts-user/shifts-user.component';
import { EditProfileUserComponent } from './components/user-page/edit-profile-user/edit-profile-user.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { EmployeesListComponent } from './components/admin-page/employees-list/employees-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    HomePageAdminComponent,
    HomePageUserComponent,
    ShiftsAdminComponent,
    EditProfileAdminComponent,
    ShiftsUserComponent,
    EditProfileUserComponent,
    EmployeesListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
