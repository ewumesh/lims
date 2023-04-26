import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CreateUserService } from 'src/app/services/user-management/create-user/create-user.service';
import { rowsAnimation } from 'src/app/shared/animations/animations';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.scss'],
  animations: [rowsAnimation]
})
export class CreateUserComponent implements OnInit, AfterViewInit {

  userForm: FormGroup;

  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  userCategory = '1';

  clientCategories: any[] = [];

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private cService: CreateUserService
    ) {
    this.title.setTitle('Create User - Laboratory Inventory Management System');

    this.genericValidator = new GenericValidator({
      'firstName': {
        'required': 'First Name is required.'
      },
      'lastName': {
        'required': 'Last Name is required.'
      },
      'userName': {
        'required': 'User Name is required.'
      },
      'email': {
        'required': 'Email is required.'
      },
      'password': {
        'required': 'Password is required.'
      },
      'phoneNumber': {
        'required': 'Phone Number is required.'
      },
      'confirmPassword': {
        'required': 'Confirm Password is required.'
      },
      'role': {
        'required': 'Role is required.'
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getClientCategories();
  }

  getClientCategories() {
    this.cService.getCategories().subscribe(response => {
      this.clientCategories = response;
    })
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required],
      confirmPassword: ['',Validators.required],
      role: ['', Validators.required],
      departmentName: [],
      departmentAddress: [],
      renewedDate: []
    })
  }

  saveChanges() {

  }

  ngAfterViewInit() {
    this.validation();
  }

  onRadioButtonChange(e) {

  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.userForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }
}
