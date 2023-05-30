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

    userDetails:any;
    isLoading = false;
    message:any;

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
      'password': {
        'required': 'New Password is required.'
      },
      'confirm_password': {
        'required': 'Confirm Password is required.'
      },
    })

    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
   }

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.isLoading = true;
    if (this.changePasswordForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }

    this.data.password = this.changePasswordForm.value.new_password;
    let payload = this.data;

    this.service.changePassword(this.changePasswordForm.value).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'Password Changed Successfully.')
      this.dissmissMessage();
      this.dialogRef.close();
      this.isLoading = false;
    },(error) => {
      if (error.status === 400) {
        this.toast.showToast(
          TOAST_STATE.danger,
          'All the field(s) are not valid.');

        setTimeout(() => {
          this.dissmissMessage();
        }, 3000);
      }else if(error.status === 500 && error.status > 500 ) {

        this.toast.showToast(
          TOAST_STATE.danger,
          'Internal Server Error');

        setTimeout(() => {
          this.dissmissMessage();
        }, 3000);


      } else {
        this.toast.showToast(
          TOAST_STATE.danger,
          error?.error?.error);

        setTimeout(() => {
          this.dissmissMessage();
        }, 3000);
      }
      this.isLoading = false;
    })
  }

  private dissmissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000)

  }

  initForm() {
    this.changePasswordForm = this.fb.group({
      id: this.userDetails.id,
      old_password: ['', Validators.required],
      password: ['', Validators.required],
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
