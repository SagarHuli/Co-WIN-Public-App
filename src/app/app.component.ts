import { Component, OnInit } from '@angular/core';
import { SigninService } from './signin/signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cowin-app-by-sagar';

  constructor(private signInService:SigninService){}
  ngOnInit(): void {
      this.signInService.autoLogin();
  }
}
