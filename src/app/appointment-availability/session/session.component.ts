import { Component, Input, OnInit } from '@angular/core';
import { Session } from 'src/app/shared/constants';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @Input()session:Session;
  constructor() { }

  ngOnInit(): void {
  }

}