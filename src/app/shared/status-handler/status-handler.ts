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
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'completed':
        this.el.nativeElement.style.background = '#00c853';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'error':
        this.el.nativeElement.style.background = '#ff3030';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'rejected':
        this.el.nativeElement.style.background = '#f44336';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
        case 'recheck':
        this.el.nativeElement.style.background = '#ff718b';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'warning':
        this.el.nativeElement.style.background = '#ffab00';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'pending':
        this.el.nativeElement.style.background = '#ffc107';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'processing':
        this.el.nativeElement.style.background = '#3F51B5';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'verified':
        this.el.nativeElement.style.background = '#002db3';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'tested':
        this.el.nativeElement.style.background = '#80ff80';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      case 'not_verified':
        this.el.nativeElement.style.background = '#ff0000';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
      default:
        this.el.nativeElement.style.background = '#457b9d';
        this.el.nativeElement.style.height = '28px';
        this.el.nativeElement.style.width = '50%';
        this.el.nativeElement.style.padding = '0px 20px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '14px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '13px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
    }
  }
}
