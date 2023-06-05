import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  userId = null;

  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  userCategory = '1';

  clientCategories: any[] = [];
  roles: any[] = [];

  message: any = {};

  isLoading: boolean;

  userRoles: any[] = [];

  doc: any;
  renewDoc: any;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private cService: CreateUserService,
    private router: Router,
    private toast: ToastService,
    private route:ActivatedRoute
    ) {
    this.title.setTitle('Create User - Laboratory Information Management System');

    this.initForm();

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
      'phone': {
        'required': 'Phone Number is required.'
      },
      'confirmPassword': {
        'required': 'Confirm Password is required.'
      },
      'client_category': {
        'required': 'Client Category is required.'
      }
    })
  }

  uploadDocument(event) {
    let file = event.target.files[0];
    this.doc = file;
  }

  uploadRenewDoc(event) {
    let file = event.target.files[0];
    this.renewDoc = file;
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.getClientCategories();
    this.getUserRoles();
    this.getRoles();

    if(this.userId) {
      this.cService.getUserDetails(this.userId).subscribe(response => {
        this.patchForm(response);
      })
    }
  }

  getRoles() {
    this.cService.getRole().subscribe(response => {
      this.userRoles = response.roles;
    })
  }

  patchForm(userDetails:any) {
    userDetails.password = '';
    this.userForm.patchValue(userDetails);
  }

  getClientCategories() {
    this.cService.getCategories().subscribe(response => {
      this.clientCategories = response?.results;
    })
  }

  getUserRoles() {
    this.cService.getUserRole().subscribe(response => {
      this.roles = response;
    })
  }

  initForm() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required],
      confirmPassword: ['',Validators.required],
      client_category: [1, Validators.required],
      department_name: [],
      department_address: [],
      registration_number: [''],
      date: [],
      role: '',
      group: ['']
    })
  }

  saveChanges() {
    this.isLoading = true;
    let group = [];
    group.push(this.userForm.value.group);
    let payload = {
      id: this.userId,
      userCategory: this.userCategory,
      group: group,
      username: this.userForm.value.username,
      first_name: this.userForm.value.first_name,
      last_name: this.userForm.value.last_name,
      phone: this.userForm.value.phone,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      confirmPassword: this.userForm.value.confirmPassword,
      client_category: 1,
      department_name: this.userForm.value.department_name,
      department_address: this.userForm.value.department_address,
      registration_number: this.userForm.value.registration_number,
      date: this.userForm.value.date,
      role: this.userForm.value.role
    }

    console.log(payload, 'PAYLOAD')
    if (this.userForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }
    if(this.userId === null) {
      this.cService.createUser(payload, this.doc, this.renewDoc).subscribe(response => {
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
  } else {
    this.cService.updateUser(payload, this.doc, this.renewDoc).subscribe(response => {
      this.toast.showToast(
        TOAST_STATE.success,
        'User Updated Successfully!');
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
    }
    )
  }
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
