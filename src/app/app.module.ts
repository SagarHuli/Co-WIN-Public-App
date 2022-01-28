import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppointmentAvailabilityComponent } from './appointment-availability/appointment-availability.component';
import { DatePickerComponent } from './shared/datepicker/datepicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/datepicker/datepicker.module';
import { SessionComponent } from './appointment-availability/session/session.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CertificateComponent } from './certificate/certificate.component';
import { AuthInterceptorService } from './signin/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    LoadingSpinnerComponent,
    AppointmentAvailabilityComponent,
    DatePickerComponent,
    SessionComponent,
    CertificateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, 
      useClass:AuthInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
