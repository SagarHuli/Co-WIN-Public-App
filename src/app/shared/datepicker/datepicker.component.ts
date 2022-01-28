import { Component, EventEmitter, Output} from "@angular/core";
@Component({
    selector:'my-datepicker',
    templateUrl:'datepicker.component.html',
    styleUrls:['datepicker.component.css']
})
export class DatePickerComponent{

    @Output() dateEmitter = new EventEmitter<Date>();
    selectedDate:Date;
    startDate = new Date().getDate();
    
    onDateChanged($event:any){
        this.selectedDate = $event.target.value;
        this.dateEmitter.emit(this.selectedDate);
    }
}