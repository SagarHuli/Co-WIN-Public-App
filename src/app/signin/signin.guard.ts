import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { SigninService } from "./signin.service";

@Injectable({providedIn: 'root'})
export class SignInGuard implements CanActivate{
    constructor(private signInService:SigninService,private router:Router){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.signInService.loggedToken.pipe(
            take(1),
            map(token =>{
            return !!token ? true: this.router.createUrlTree(['/signin']);
        }),
        );
    }
}