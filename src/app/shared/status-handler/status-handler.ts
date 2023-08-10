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
      case 'verified':
        this.el.nativeElement.style.background = '#0065FF';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;

      case 'Not Verified':
        this.el.nativeElement.style.background = '#364152';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;

      case 'not_verified':
        this.el.nativeElement.style.background = '#364152';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;

      case 'completed':
        this.el.nativeElement.style.background = '#00C852';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;

      case 'pending':
        this.el.nativeElement.style.background = '#FFC007';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;

      case 'processing':
        this.el.nativeElement.style.background = '#9747FF';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;
    
      case 'rejected':
        this.el.nativeElement.style.background = '#C62828';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;

      case 'Inactive':
        this.el.nativeElement.style.background = '#C62828';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;

      

      case 'tested':
        this.el.nativeElement.style.background = '#CD7F32';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;

      

      case 'recheck':
        this.el.nativeElement.style.background = '#D600C0';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;

      case 'assigned':
        this.el.nativeElement.style.background = '#00CCFF';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;

      case 're-assigned':
        this.el.nativeElement.style.background = '#FF4F01';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;
      
      case 'not_approved':
        this.el.nativeElement.style.background = '#283593';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
        break;
        
      default:
        this.el.nativeElement.style.background = '#36b37e';
        this.el.nativeElement.style.height = '26px';
        this.el.nativeElement.style.width = '124px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.borderRadius = '3px';
        this.el.nativeElement.style.fontFamily = 'Poppins';
        this.el.nativeElement.style.fontSize = '11px';
        this.el.nativeElement.style.fontWeight = '500';
        this.el.nativeElement.style.textTransform = 'Capitalize';
      break;
    }
  }
}
