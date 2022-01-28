import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentAvailabilityComponent } from './appointment-availability/appointment-availability.component';
import { CertificateComponent } from './certificate/certificate.component';
import { SigninComponent } from './signin/signin.component';
import { SignInGuard } from './signin/signin.guard';

const routes: Routes = [
  {path:'',redirectTo:'/',pathMatch:'full'},
  {path:'signin', component:SigninComponent},
  {
    path:'appointments', 
    component:AppointmentAvailabilityComponent,
    canActivate : [SignInGuard]
  },  
  {
    path:'certificate',
    component:CertificateComponent,
    canActivate : [SignInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
