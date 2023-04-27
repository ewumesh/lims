import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CreateUserService } from 'src/app/services/user-management/create-user/create-user.service';
import { rowsAnimation } from 'src/app/shared/animations/animations';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
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

  message: any = {};

  isLoading: boolean;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private cService: CreateUserService,
    private router: Router,
    private toast: ToastService,
    ) {
    this.title.setTitle('Create User - Laboratory Inventory Management System');

    this.genericValidator = new GenericValidator({
      'first_name': {
        'required': 'First Name is required.'
      },
      'last_name': {
        'required': 'Last Name is required.'
      },
      'user_name': {
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
      'category': {
        'required': 'Client Category is required.'
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getClientCategories();
  }

  getClientCategories() {
    this.cService.getCategories().subscribe(response => {
      this.clientCategories = response?.results;
    })
  }

  initForm() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required],
      confirmPassword: ['',Validators.required],
      category: ['', Validators.required],
      departmentName: [],
      departmentAddress: [],
      registrationNumber: [''],
      date: []
    })
  }

  saveChanges() {
    this.isLoading = true;
    let payload = {
      userCategory: this.userCategory,
      username: this.userForm.value.username,
      first_name: this.userForm.value.first_name,
      last_name: this.userForm.value.last_name,
      phoneNumber: this.userForm.value.phoneNumber,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      confirmPassword: this.userForm.value.confirmPassword,
      category: this.userForm.value.category,
      departmentName: this.userForm.value.departmentName,
      departmentAddress: this.userForm.value.departmentAddress,
      registrationNumber: this.userForm.value.registrationNumber,
      date: this.userForm.value.date
    }
    if (this.userForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }
    this.cService.createUser(payload).subscribe(response => {
      this.toast.showToast(
        TOAST_STATE.success,
        'User Created Successfully!');
        this.isLoading = false;
        this.dismissMessage();

      this.router.navigate(['/dashboard/all-users']);
    },
    (error) => {
      this.isLoading = false;
      this.toast.showToast(
        TOAST_STATE.danger,
        error?.error?.message);

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);
    })
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
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
