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
  actionMessage:string = null;
  Submiterror:string = null;
  OtpError:string = null;
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
          this.isLoading = false;
          this.isEnterOtp = true;
          this.Submiterror = null;
        },
        error:(errorData) => {
          console.log(errorData);
          this.isLoading = false;
          switch(errorData)
          {
            case 400:this.Submiterror = "OTP already sent";
                break;
            case 401: this.Submiterror = "Unauthenticated Access";
                break;
            case 500: this.Submiterror = "An Internal Server Error Occured. Try again later!"
                break;
          }
        }
      });
    this.mobileNumber = form.value.mobile;
    this.actionMessage = "Please enter OTP sent to +91XXXXXXX" + this.mobileNumber.substring(7, 10);
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
          this.OtpError = null;
          this.router.navigate(['/appointments']);
        },
      error: (errorData) => {
        console.log("error :" + errorData);
        switch(errorData)
          {
            case 400:this.OtpError = "Enter Valid OTP";
                break;
            case 401: this.OtpError = "Unauthenticated Access";
                break;
            case 500: this.OtpError = "An Internal Server Error Occured. Try again later!"
                break;
          }
        }
      });
  }

  validateNumber(event) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
