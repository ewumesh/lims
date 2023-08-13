import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { SharedService } from "src/app/services/shared.service";
import { TOAST_STATE, ToastService } from "src/app/shared/toastr/toastr.service";


@Component({
    templateUrl:'./email-verification.component.html',
    styleUrls:['./email-verification.scss']
})

export class EmailVerificationComponent implements OnInit { 

    private readonly toDestroy$ = new Subject<void>();

    isResend = false;
    loggedUserDetails;

    constructor(
        private toast: ToastService,
        private router: Router,
        private service: SharedService
      ) {
        this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        // this.title.setTitle('Login - Laboratory Information Management System');
      }

      resendVerificationLink() {
        this.isResend = true;
        let payload = {
            email: this.loggedUserDetails.email
        }
        this.service.resendVerificationLink(payload).subscribe(res => {
            this.toast.showToast(TOAST_STATE.success, 'Email Verification Link Sent Successful!');
            this.dismissMessage();
        })
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
    
      ngOnInit(): void {
        this.dismissMessage();
      }

    
      removeSpace(value) {
         return value?.replace(/\s/g, '');
      }
    
      private dismissMessage(): void {
        setTimeout(() => {
          this.toast.dismissToast();
        }, 1000);
      }
    
      navigateToRegister() {
        this.router.navigate(['/register']);
      }
    
      navigateToForgotPassword() {
        this.router.navigate(['/forgot-password']);
      }
    
      
    
      ngOnDestroy(): void {
        this.toDestroy$.next();
        this.toDestroy$.complete();
      }

}