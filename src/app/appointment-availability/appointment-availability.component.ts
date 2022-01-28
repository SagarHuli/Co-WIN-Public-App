import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Districts, States, Sessions } from '../shared/constants';
import { SigninService } from '../signin/signin.service';

@Component({
  selector: 'app-appointment-availability',
  templateUrl: './appointment-availability.component.html',
  styleUrls: ['./appointment-availability.component.css']
})
export class AppointmentAvailabilityComponent implements OnInit,OnDestroy {

  isVisible:string;
  isSelected:boolean = true;
  states:States;
  districtsList:Districts;
  subscription:Subscription;
  state_id:number;
  stateSelected:boolean = false;
  district_id:number;
  selectedDate:Date;
  sessionFetched:boolean;
  sessions:Sessions;
  isLoading:boolean;
  totalRecords:Number;
  page:Number = 1;
  constructor(private signInService: SigninService) {
    this.state_id = 0;
    this.districtsList=null;
    this.sessionFetched = false;
   }

  ngOnInit(): void {
    if(this.states==null){
      let obs : Observable<States>;
          obs = this.signInService.fetchStates();
          this.subscription =obs.subscribe({
              next:(resData)=>{
                  this.states = resData;
              }
          });
        }
        this.isLoading = false;
  }

  getDistricts(){
      let obs : Observable<Districts>;
          obs = this.signInService.fetchDistricts(this.state_id);
          this.subscription =obs.subscribe({
              next:(resData)=>{
                  this.districtsList = resData;
                  this.stateSelected = true;
              }
          });
  }
  onStateSelected(state_id:number){
    this.state_id = state_id;
    this.getDistricts();
  }

  onDistrictSelected(district_id:number){
    this.district_id = district_id;
  }

  onDateSelected(date:Date){
    this.selectedDate = date;
    
  }
  onSearchByDistrict(form:NgForm){
    this.isLoading = true;
    const districtId = form.value.district;
    const date = this.getDateAsString(this.selectedDate);
    console.log(date);
    let obs:Observable<Sessions> = this.signInService.findByDistrict(districtId,date);
    this.subscription = obs.subscribe({
      next:(resData)=>{
        this.sessions =resData;
        this.sessionFetched = true;
        this.isLoading = false;
      },
      error:(errorData)=>{
        console.log(errorData);
      }
    })
  }

  onSearchByPinCode(form:NgForm){
    const pincode = form.value.pincode;
    const date = this.getDateAsString(this.selectedDate);
    let obs:Observable<Sessions> = this.signInService.findByPinCode(pincode,date);
    this.subscription = obs.subscribe({
      next:(resData)=>{
        this.sessions =resData;
        this.sessionFetched = true;
        this.isLoading = false;
      },
      error:(errorData)=>{
        console.log(errorData);
      }
    })
  }

  getDateAsString(date:Date){
    const day = date.getDate()<10?"0".concat(date.getDate().toString()):date.getDate().toString();
    const month = (date.getMonth()+1)<10?"0".concat((date.getMonth()+1).toString()):
    date.getMonth().toString();
    return day.concat(month).concat("2022");
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
