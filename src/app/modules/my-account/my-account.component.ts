import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { AccountService } from 'src/app/services/account/account.service';
import { changePasswordComponent } from './change-password/change-password';
import { ViewImageComponent } from './view-image/view-image';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { passwordMatchValidator } from 'src/app/shared/password-match/password-match';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { Observable, Observer } from 'rxjs';

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
  userDetails:any = {};

  isAccountEdit = false;
  departmentTypes:any[] = [];

  doc: any;
  renewDoc: any;

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

  additionalImages: any[] = [];

  get additionalDocuments(): FormArray {
    return this.userForm.get('additionalDocs') as FormArray;
  }

  addDocList() {
      this.additionalDocuments.push(this.createDocList());
  }

  createDocList() {
    return this.fb.group({
      document_name: new FormControl(''),
      file: new FormControl('')
    })
  }

  ngOnInit() {
    this.getAccountDetails();
    this.initForm();
    this.getClientCategories();
    this.getRoles();
    this.initChangePasswordForm();
    this.getDepartmentType();
  }

  initChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      id: this.userDetails.id,
      old_password: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },{ validators: passwordMatchValidator })
  }

  uploadDocument(event) {
    let file = event.target.files[0];
    this.doc = file;
  }

  uploadRenewDoc(event) {
    let file = event.target.files[0];
    this.renewDoc = file;
  }

  updateDetails() {
    this.isAccountEdit = true;
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
      first_name:['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      client_category: [, Validators.required],
      department_name: ['', Validators.required],
      department_address:['', Validators.required],
      registration_number: ['', Validators.required],
      additionalDocs: new FormArray([])
    })
    this.addDocList();
  }

  uploadAdditionalDocs(event) {
    this.additionalImages.push(event.target.files[0]);
  }

  getIndustryName(code) {
    let c = this.departmentTypes.find(a => a.code === code);
    // console.log(c, 'ok')
    return c?.name
  }

  getDepartmentType() {
    this.accountService.getGetDepartmentTypes().subscribe(res => {
      this.departmentTypes = res?.department_types;
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

  base64Image: any;

  downloadImage(url) {
    let imageUrl =
      url

    this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
      // console.log('base64data', base64data);
      this.base64Image = 'data:image/jpg;base64,' + base64data;
      // save image to disk
      var link = document.createElement('a');

      document.body.appendChild(link); // for Firefox

      link.setAttribute('href', this.base64Image);
      link.setAttribute('download', 'doc.png');
      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL('image/png');

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  saveUserDetails() {
    this.isLoading = true;

    if (this.userForm.pristine) {
      this.message = {};
      window.scroll(0,0);
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }

    let payload = {
      id: this.userDetails.id,
      group: [],
      username: this.userForm.value.username,
      first_name: this.userForm.value.first_name,
      last_name: this.userForm.value.last_name,
      phone: this.userForm.value.phone,
      email: this.userForm.value.email,
      client_category: 1,
      department_name: this.userForm.value.department_name,
      department_address: this.userForm.value.department_address,
      registration_number: this.userForm.value.registration_number,
      date: this.userForm.value.date,
      role: 5,
      is_verified: 0
    }

    let images:any[] =[];
    this.userForm.value.additionalDocs.forEach((a, index) => {
      let obj = {document_name: a.document_name, file:this.additionalImages[index]}
      images.push(obj);
    })

    this.accountService.updateUser(payload, this.doc, this.renewDoc, images).subscribe(res => {
      this.toast.showToast(
        TOAST_STATE.success,
        'User Updated Successfully!');
        this.isLoading = false;
        this.dismissMessage();
        this.responseError = null;
        this.message = {};
        this.isAccountEdit = false;
    },(error) => {
      this.responseError = error?.error;
    })
  }

  dismissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2000);
  }
}
