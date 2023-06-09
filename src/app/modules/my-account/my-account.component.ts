import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { AccountService } from 'src/app/services/account/account.service';
import { changePasswordComponent } from './change-password/change-password';
import { ViewImageComponent } from './view-image/view-image';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { passwordMatchValidator } from 'src/app/shared/password-match/password-match';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, AfterViewInit {
  userForm: FormGroup;

  accountDetails: any;
  isLoading:boolean = true;

  clientCategories: any[] = [];

  roles: any[] = [];

  userFullName: string = '';

  isChangePassword: boolean = false;
  changePasswordForm: FormGroup;

  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  isSaveBtnLoading = false;
  message:any = {};
  responseError = null;
  userDetails:any = {}

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private accountService: AccountService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {
    this.title.setTitle('My Account - Laboratory Information Management System');

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

  ngOnInit() {
    this.getAccountDetails();
    this.initForm();
    this.getClientCategories();
    this.getRoles();
    this.initChangePasswordForm();
  }

  initChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      id: this.userDetails.id,
      old_password: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },{ validators: passwordMatchValidator })
  }

  viewImage(url) {
        // this.isChangePassword = true;
        let instance: MatDialogRef<ViewImageComponent, any>;

        instance = this.dialog.open(ViewImageComponent, {
          data: url ? url : null,
          width: '800px',
          autoFocus: false,
        })

        instance.afterClosed().subscribe(res => {

        })
  }

  getClientCategoryName(id) {
    let client = this.clientCategories.find(a => a.id === id);
    return client?.name;
  }

  private initForm() {
    this.userForm = this.fb.group({
      first_name:'',
      last_name: '',
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      client_category: [, Validators.required],
      userValidUpTo: ['2030-01-01', Validators.required]
    })
  }

  changePassword() {
    this.isChangePassword = true;
    // let instance: MatDialogRef<changePasswordComponent, any>;

    // instance = this.dialog.open(changePasswordComponent, {
    //   data: this.accountDetails ? this.accountDetails : null,
    //   width: '600px',
    //   autoFocus: false,
    // })

    // instance.afterClosed().subscribe(res => {

    // })
  }

  cancel() {
    this.isChangePassword = false;
  }

  getRoleName(roleId) {
    let role = this.roles.find(a => a.role_id === roleId);
    if(role) {
      return role.role_name;
    } else {
      return roleId;
    }

  }

  getAccountDetails() {
    let userId = JSON.parse(localStorage.getItem('userDetails')).id;
    this.accountService.getProfileDetails(userId).subscribe(res => {
      this.accountDetails = res;
      this.userFullName = res?.first_name + ' ' + res?.last_name;
      this.isLoading = false;
    })
  }

  getRoles() {
    this.accountService.getUserRoles().subscribe(res => {
      this.roles = res.roles;
    })
  }

  getClientCategories() {
    this.accountService.getClientCategories().subscribe( res => {
      this.clientCategories = res.results;
    })
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.changePasswordForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.userForm.patchValue(this.accountDetails);
      // this.userForm.disable();
      // this.userForm.get('email').setValue(this.accountDetails?.email);
      // this.userForm.get('username').setValue(this.accountDetails.username)
      // if(this.accountDetails?.first_name) {
      // this.userForm.get('full_name').setValue(this.accountDetails?.first_name);
      // }
      // if(this.accountDetails.phone) {
      // this.userForm.get('phoneNumber').setValue(this.accountDetails?.phone);
      // }

      // this.userForm.disable();
    }, 1500);
    this.validation();

  }

  save() {
    this.isSaveBtnLoading = true;
    if (this.changePasswordForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      window.scroll(0,0);
      this.isSaveBtnLoading = false;
      return;
    }

    this.accountService.changePassword(this.changePasswordForm.value).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'Password Changed Successfully.')
      this.dissmissMessage();
      this.isSaveBtnLoading = false;
      this.message = {};
      this.responseError = null;
      this.isChangePassword = false;
    },(error) => {
        this.message = {};
        this.isSaveBtnLoading = false;
        window.scroll(0,0);
        this.responseError = error.error;
    })
  }

  private dissmissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000)

  }
}
