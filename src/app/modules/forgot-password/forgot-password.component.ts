import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ForgotPasswordService } from 'src/app/services/forgot-password/forgot-password.service';

import { rowsAnimation } from 'src/app/shared/animations/animations';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.scss'],
  animations: [rowsAnimation]
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>();

  forgotPasswordForm: FormGroup;
  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  isLoading: boolean = false;
  message: any;

  isResetLinkSended: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private title: Title,
    private fService: ForgotPasswordService
  ) {
    this.title.setTitle('Forgot Password - Laboratory Information Management System')

    this.genericValidator = new GenericValidator({
      'email': {
        'required': 'Email is required.',
        'pattern': 'Email is not valid.'
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  goToHome() {
    this.router.navigate(['/login']);
  }

  gotoPricing() {
    this.router.navigate(['/commodity-pricing']);
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ]
    })
  }

  saveChanges() {
    this.isLoading = true;
    if (this.forgotPasswordForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }

    this.fService.forgotPassword(this.forgotPasswordForm.value).subscribe(res => {
      this.isResetLinkSended = true;
      this.toast.showToast(TOAST_STATE.success, 'Password reset link is sent.');
      this.dismissToast();
      this.isLoading = false;
    }, (error) => {
      this.toast.showToast(TOAST_STATE.danger, error?.error.message);
      this.dismissToast();
      this.isLoading = false;
    })
  }

  dismissToast() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2500);

  }

  navigateToRegister() {
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.forgotPasswordForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
