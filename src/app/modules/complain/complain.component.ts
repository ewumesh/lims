import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    templateUrl:'./complain.component.html',
    styleUrls:['./complain.component.scss']
})



export class ComplainComponent {
    constructor(
        private router: Router,
      ){}
      goToHome() {
        this.router.navigate(['/login']);
      }
    
      gotoPricing() {
        this.router.navigate(['/commodity-pricing']);
      }
    
      gotoComplain() {
        this.router.navigate(['/complain']);
      }
    
      gotoFeedback() {
        this.router.navigate(['/feedback']);
      }
    
      gotoUserManual() {
        this.router.navigate(['/user-manual']);
      }
    
      gotoVideoManual() {
        this.router.navigate(['/video-manual']);
      }
}