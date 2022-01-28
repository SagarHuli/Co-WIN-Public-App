import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{

    @HostBinding('class.isOpen') isOpen = false;
    @HostListener('click') toggleOpener(){
        this.isOpen = !this.isOpen;
    }

    @HostListener('document:click',['$event']) toggleOpenere2(event:Event){
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen:true;
        this.isOpen = !this.isOpen;
    }

    constructor(private elRef:ElementRef) { }
}