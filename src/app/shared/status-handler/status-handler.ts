import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[statusColor]'
})
export class StatusHandlerDirective implements OnChanges {
  @Input('statusColor') status: string; // Input property to receive the status value

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // When the status input changes, update the element's color based on the status value
    if (changes['status'] && changes['status'].currentValue) {
      this.updateColor();
    }
  }

  private updateColor(): void {
    switch (this.status) {
      case 'success':
        this.el.nativeElement.style.background = '#36b37e';
        break;
      case 'completed':
        this.el.nativeElement.style.background = '#36b37e';
        break;
      case 'error':
        this.el.nativeElement.style.background = '#ff3030';
        break;
      case 'rejected':
        this.el.nativeElement.style.background = '#ff3030';
        break;
        case 'recheck':
        this.el.nativeElement.style.background = '#ff3030';
        break;
      case 'warning':
        this.el.nativeElement.style.background = '#ffab00';
        break;
      case 'pending':
        this.el.nativeElement.style.background = '#ffab00';
        break;

      case 'verified':
        this.el.nativeElement.style.background = '#0065ff';
        break;
      default:
        this.el.nativeElement.style.background = '#457b9d';
        break;
    }
  }
}
