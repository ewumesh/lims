import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AccountService } from 'src/app/services/account/account.service';

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

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.title.setTitle('My Account - Laboratory Inventory Management System')
  }

  ngOnInit() {
    this.getAccountDetails();
    this.initForm();
    this.getClientCategories();
    this.getRoles();
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.userForm.patchValue(this.accountDetails);
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

  }
}
