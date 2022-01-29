import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as Crypto from 'crypto-js';
import * as Constants from '../shared/constants';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
export interface SignInResponseData{
    txnId:string
}

export interface confirmOTPResponse{
    token:string
}

@Injectable({providedIn:'root'})
export class SigninService{

    loggedToken = new BehaviorSubject<string>(null);
    private tokenExpirationTimer:any;
    constructor(private router:Router, private http:HttpClient){}

    SignIn(mobile:string){
        return this.http.post<SignInResponseData>(
            environment.generateOTP,
            {
                mobile:mobile,
                returnSecureToken:true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData=>{
                this.setTxnId(
                    resData.txnId
                )
                
            })
        );
    }

    ValidateOtp(otp:string)
    {
        var hash:string = Crypto.SHA256(otp);
        const hashedOTP:string = hash.toString();
        return this.http.post<confirmOTPResponse>(
            environment.confirmOTP,
            {
                txnId:localStorage.getItem('txnId'),
                otp:hashedOTP
            }
            ).pipe(
                catchError(this.handleError),
                tap(resData=>{
                   this.loggedToken.next(resData.token);
                   localStorage.setItem('token',resData.token);
                   this.autoLogout(900000); // Token provided by Co-Win API expires in 15 mins(900sec). 
                })
            );
    }

    findByDistrict(districtId:string,date:string){
        return this.http.get<Constants.Sessions>(
            environment.findByDistrict,
            {
                params:new HttpParams()
                        .append('district_id',districtId)
                        .append('date',date)
                }
            )
            .pipe(
                catchError(this.handleError)
            );
    }

    findByPinCode(pincode:string,date:string){
        return this.http.get<Constants.Sessions>(
            environment.findByPin,
            {
                params:new HttpParams()
                        .append('pincode',pincode)
                        .append('date',date)
                }
            ).pipe(
                catchError(this.handleError)
            );
    }

    getCertificate(bnf_id:string)
    {
        const httpOptions= {
            responseType: 'blob' as 'json',
            headers:new HttpHeaders({
            'Content-Type': 'application/pdf',
                }),
            params:new HttpParams().append('beneficiary_reference_id',bnf_id)
        }
        return this.http.get(
            environment.certificate,
            httpOptions
            ).pipe(catchError(this.handleError));
    }

    handleError(errorRes:HttpErrorResponse)
    {
        return throwError(()=>errorRes.status);
    }

    setTxnId(txnId:string){
        localStorage.setItem('txnId',txnId);
    }

    fetchStates(){
        return this.http.get<Constants.States>(
            environment.getStates            
        );
    }

    fetchDistricts(state_id:number){
        return this.http.get<Constants.Districts>(
            environment.getDistricts+state_id.toString()
        );
    }

    logout()
    {
        this.loggedToken.next(null);
        localStorage.clear();
        this.router.navigate(['/signin']);
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin()
    {
        const userToken = localStorage.getItem('token');
        if(!userToken)
            return;
        const expiryDate = new Date(this.getDecodedAccessToken(userToken).exp*1000);
        const expirationDuration = expiryDate.getTime() - new Date().getTime();
        if(expirationDuration>0)
        {
            this.loggedToken.next(userToken);
            this.router.navigate(['/appointments']);
            // call autoLogout
            this.autoLogout(expirationDuration);
        }
        else
        {
            this.logout();
        }
        console.log(expiryDate);
    }

    autoLogout(expiresIn:number)
    {
        this.tokenExpirationTimer = window.setTimeout(()=>{
            this.logout();
        },expiresIn);
    }

    getDecodedAccessToken(token:string):any{
        return jwt_decode(token);
    }
}
