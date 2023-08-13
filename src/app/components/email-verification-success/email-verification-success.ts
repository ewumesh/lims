import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { SharedService } from "src/app/services/shared.service";
import { ToastService, TOAST_STATE } from "src/app/shared/toastr/toastr.service";


@Component({
    templateUrl:'./email-verification-success.html',
    styleUrls:['./email-verification-success.scss']
})

export class UserVerificationSuccessComponent {
    private readonly toDestroy$ = new Subject<void>();

    isResend = false;
    loggedUserDetails;
    userVerified = false;
    constructor(
        private toast: ToastService,
        private router: Router,
        private service: SharedService,
        private route: ActivatedRoute
      ) {
        this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        // this.title.setTitle('Login - Laboratory Information Management System');
        this.verifyUser();
      }

      verifyUser() {
        let userToken = this.route.snapshot.queryParamMap.get('token');
        let query = this.route.snapshot.queryParamMap.get('pk');

        let paylaod = {
            token: userToken,
            encoded_pk: query
        }

        this.service.verifyUser(paylaod).subscribe(res => {
            this.userVerified = true;
           let updatedDetails = this.loggedUserDetails;
           updatedDetails.is_email_verified = '0';
        //    localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
           localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
           console.log(JSON.parse(localStorage.getItem('userDetails')), 'dawaw');
           this.router.navigate(['/dashboard']);
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