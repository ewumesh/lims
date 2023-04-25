import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { rowsAnimation } from 'src/app/shared/animations/animations';
import { ToastService } from 'src/app/shared/toastr/toastr.service';
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

   isLoading:boolean = false;
   message: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private title: Title
    ) {
      this.title.setTitle('Forgot Password - Laboratory Inventory Management System')

      this.genericValidator = new GenericValidator({
        'email': {
          'required': 'Email is required.'
        }
      })
    }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  saveChanges() {
    if (this.forgotPasswordForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
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
