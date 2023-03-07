import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RegistrationPageComponent } from './components/user-page/registration-page/registration-page.component';
import { LoginPageComponent } from './components/user-page/login-page/login-page.component';
import { HomePageComponent } from './components/user-page/home-page/home-page.component';
import { ResetPasswordPageComponent } from './components/user-page/reset-password-page/reset-password-page.component';
import { EditProfileComponent } from './components/user-page/edit-profile/edit-profile.component';
import { ShiftsComponent } from './components/user-page/shifts/shifts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    ResetPasswordPageComponent,
    EditProfileComponent,
    ShiftsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
