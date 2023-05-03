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
  }

  private initForm() {
    this.userForm = this.fb.group({
      full_name:'',
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      clientCategory: ['Internal Client', Validators.required],
      userValidUpTo: ['2030-01-01', Validators.required]
    })
  }

  getAccountDetails() {
    let userId = JSON.parse(localStorage.getItem('userDetails')).id;
    this.accountService.getProfileDetails(userId).subscribe(res => {
      this.accountDetails = res;
      this.isLoading = false;
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.userForm.get('email').setValue(this.accountDetails?.email);
      this.userForm.get('username').setValue(this.accountDetails.username)
      if(this.accountDetails?.first_name) {
      this.userForm.get('full_name').setValue(this.accountDetails?.first_name);
      }
      // if(this.accountDetails.phone) {
      // this.userForm.get('phoneNumber').setValue(this.accountDetails?.phone);
      // }

      this.userForm.disable();
    }, 1500);

  }
}
