import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    templateUrl:'./complain.component.html',
    styleUrls:['./complain.component.scss']
})



export class ComplainComponent {

  complainForm: FormGroup;
  mailText:string = "";
  links : any[]= ["link1.com", "link2.com", "link3.com"];
    constructor(
        private router: Router,
        private fb: FormBuilder
      ){
        this.initComplainForm();
      }

      initComplainForm() {
        this.complainForm = this.fb.group({
          name:'',
          address:'',
          email:'',
          phone:'',
          message:''
        })
      }

      submit() {
    //     let data = this.complainForm.value;

    //     this.mailText = "mailto:umeshthapa539@gmail.com+?subject=files&body="+this.links.join(" ,"); // add the links to body
    // window.location.href = this.mailText;
      }

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