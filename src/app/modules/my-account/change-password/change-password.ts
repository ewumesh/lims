import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { passwordMatchValidator } from 'src/app/shared/password-match/password-match';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss']
})
export class changePasswordComponent implements OnInit, AfterViewInit {

  changePasswordForm: FormGroup;

    // Used for form validation
    genericValidator: GenericValidator;
    displayMessage: any = {};
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<changePasswordComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService,
    private service: AccountService
  ) {
    this.genericValidator = new GenericValidator({
      'old_password': {
        'required': 'Old Password is required.'
      },
      'new_password': {
        'required': 'New Password is required.'
      },
      'confirm_password': {
        'required': 'Confirm Password is required.'
      },
    })
   }

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.data.password = this.changePasswordForm.value.new_password;
    let payload = this.data;
    console.log(payload, 'pay')

    this.service.changePassword(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'Password Changed Successfully.')
      this.dissmissMessage();
    })
  }

  private dissmissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000)

  }

  initForm() {
    this.changePasswordForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },{ validators: passwordMatchValidator })
  }

  close() {
    this.dialogRef.close();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.changePasswordForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  ngAfterViewInit(): void {
      this.validation()
  }
}
