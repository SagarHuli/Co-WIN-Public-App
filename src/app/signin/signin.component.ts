import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { confirmOTPResponse, SignInResponseData, SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit , OnDestroy{

  mobileNumber:string="";
  isLoading = false;
  isEnterOtp:boolean;
  subscription:Subscription = null;
  isAuthenticated:boolean;
  constructor(private signInService:SigninService,private router:Router) { }

  ngOnInit(): void {
    this.isEnterOtp = false;
  }

  onSubmitAuthForm(form: NgForm) {
    let authObs: Observable<SignInResponseData>;
    this.isLoading = true;
    authObs = this.signInService.SignIn(form.value.mobile);
    this.subscription = authObs.subscribe(
      {
        next:(resData) => {
          console.log(resData);
          this.isLoading = false;
          this.isEnterOtp = true;
        },
        error:(errorData) => {
          console.log(errorData);
          this.isLoading = false;
        }
      });
    this.mobileNumber = form.value.mobile;
    this.mobileNumber = "+91XXXXXXX" + this.mobileNumber.substring(7, 10);
    form.reset();
  }

  onSubmitOtpForm(form: NgForm) {
    let confirmObs: Observable<confirmOTPResponse>;
    confirmObs = this.signInService.ValidateOtp(form.value.otp);
    this.subscription = confirmObs.subscribe(
      {
        next: (resData) => {
          console.log(resData);
          this.isAuthenticated = true;
          this.router.navigate(['/appointments']);
        },
      error: (errorData) => {
        console.log("error :" + errorData);
        }
      });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
