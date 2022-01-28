import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { SigninService } from "./signin.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private signInService:SigninService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.signInService.loggedToken.pipe(
            take(1),
            exhaustMap(token =>{
                if(!token || req.url.indexOf("download")==-1)
                {
                    return next.handle(req);
                }
                console.log(req.url);
                const modifiedReq = req.clone({headers:req.headers.set("Authorization","Bearer "+token)})
                return next.handle(modifiedReq);
            })
        );
    }
    
}