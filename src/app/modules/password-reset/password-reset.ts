import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { passwordMatchValidator } from 'src/app/shared/password-match/password-match';
import { ToastService } from 'src/app/shared/toastr/toastr.service';
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

  }


  navigateToRegister() {}
}
