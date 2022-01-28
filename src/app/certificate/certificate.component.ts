import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { SigninService } from "../signin/signin.service";

@Component({
    selector:'app-certificate',
    templateUrl:'./certificate.component.html'
})
export class CertificateComponent implements OnInit,OnDestroy{

    subscription:Subscription;
    blob:Blob;
    constructor(private signInService:SigninService){}
    ngOnInit(): void {
        
    }
    onGetCertificate(form:NgForm)
    {
        let obs:Observable<any>;
        obs = this.signInService.getCertificate(form.value.bnf_id);
        this.subscription = obs.subscribe(
            {
                next:(resData)=>{
                    this.blob = new Blob([resData], {type:'application/pdf'});
                    var downloadURL = window.URL.createObjectURL(resData);
                    var link = document.createElement('a');
                    link.href = downloadURL;
                    link.download = form.value.bnf_id+"_certificate.pdf";
                    link.click();
                },
                error:(errorData)=>{
                    console.log("error occured: "+errorData);
                }
            }
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}