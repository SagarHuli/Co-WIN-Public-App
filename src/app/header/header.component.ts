import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SigninService } from '../signin/signin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  subscription:Subscription;
  constructor(private signInService:SigninService) { }

  ngOnInit(): void {
    this.subscription = this.signInService.loggedToken.subscribe(loggedToken =>{
      this.isAuthenticated = !!loggedToken;
    })
  }

  onLogout(){
    this.signInService.logout();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
