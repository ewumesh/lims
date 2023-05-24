import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';
import { passwordMatchValidator } from 'src/app/shared/password-match/password-match';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './password-reset.html',
  styleUrls: ['./password.reset.scss']
})
export class PasswordResetComponent implements OnInit {
  private readonly toDestroy$ = new Subject<void>();

  forgotPasswordForm: FormGroup;
   // Used for form validation
   genericValidator: GenericValidator;
   displayMessage: any = {};
   @ViewChildren(FormControlName, { read: ElementRef })
   private formInputElements: ElementRef[];

   isLoading:boolean = false;
   message: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private title: Title,
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute
  ) {
    this.title.setTitle('Password Reset- Laboratory Information Management System')

    this.genericValidator = new GenericValidator({
      'password': {
        'required': 'Password is required.'
      },
      'confirm_password': {
        'required': 'Confirm Password is required.'
      },
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },{ validators: passwordMatchValidator })
  }

  saveChanges() {

    this.isLoading = true;
    if (this.forgotPasswordForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }
    let userToken = this.route.snapshot.queryParamMap.get('token');
    let query = this.route.snapshot.queryParamMap.get('pk');
    this.resetPasswordService.changePassword(this.forgotPasswordForm.value,query, userToken).subscribe(response => {
      this.router.navigate(['/login']);
      this.toast.showToast(TOAST_STATE.success, 'Password Reset Successfully!');
      this.isLoading = false;
    },
    (error) => {
      this.isLoading = false;
      if (error.status === 400) {
        this.toast.showToast(
          TOAST_STATE.danger,
          'All the field(s) are not valid.');

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);
      }else if(error.status === 500 || error.status > 500 ) {

        this.toast.showToast(
          TOAST_STATE.danger,
          'Internal Server Error');

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);


      } else {
        this.toast.showToast(
          TOAST_STATE.danger,
          error?.error?.error);

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);
      }
      this.isLoading = false;

    })
  }

  dismissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2500);

  }

  navigateToRegister() {}
}
