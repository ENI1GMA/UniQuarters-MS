// Angular directive to detect clicks outside the element
import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
})
export class ClickOutsideDirective {

    // Event emitter to notify when a click occurs outside the element
    @Output() clickOutside = new EventEmitter<void>();

    // Constructor to get a reference to the element
    constructor(private elementRef: ElementRef) { }

    // Listen for clicks on the document
    @HostListener('document:click', ['$event.target'])
    public onClick(target: any) {
        // Check if the clicked target is outside the element
        const clickedInside = this.elementRef.nativeElement.contains(target);

        // If clicked outside, emit the clickOutside event
        if (!clickedInside) {
            this.clickOutside.emit();
        }
    }
}
