import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { rowsAnimation } from 'src/app/shared/animations/animations';
import { passwordMatchValidator } from 'src/app/shared/password-match/password-match';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';
import { ViewImageComponent } from '../../my-account/view-image/view-image';
import { CreateAdminService } from 'src/app/services/user-management/create-admin/create-admin.service';

@Component({
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.scss'],
  animations: [rowsAnimation]
})
export class CreateAdminComponent implements OnInit, AfterViewInit {

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

  responseError = null;

  loggedUserdetails:any;

  userDetails: any;

  departmentTypes:any[] = [];

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private cService: CreateAdminService,
    private router: Router,
    private toast: ToastService,
    private route:ActivatedRoute,
    private dialog: MatDialog
    ) {
      this.loggedUserdetails= JSON.parse(localStorage.getItem('userDetails'))
    this.title.setTitle('Create User - Laboratory Information Management System');

    this.initForm();

    this.genericValidator = new GenericValidator({
      'first_name': {
        'required': 'First Name is required.'
      },
      'last_name': {
        'required': 'Last Name is required.'
      },
      'username': {
        'required': 'User Name is required.',
        'pattern': 'Username must be in small letters only.'
      },
      'email': {
        'required': 'Email is required.',
        'pattern': 'Email is not valid.'
      },
      'password': {
        'required': 'Password is required.'
      },
      'phone': {
        'required': 'Phone Number is required.'
      },
      'confirm_password': {
        'required': 'Confirm Password is required.'
      },
      'client_category': {
        'required': 'Client Category is required.'
      },
      'role': {
        'required': 'Role is required.'
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
    this.getDepartmentTypes();

    if(this.userId) {
      this.cService.getUserDetails(this.userId).subscribe(response => {
        this.patchForm(response);
        this.userDetails = response;
      })
    }
  }

  getRoles() {
    this.cService.getRole().subscribe(response => {
      let roleForAdmin =[];
      response.roles.forEach(a => {
        if(a.role_id !== 5) {
          roleForAdmin.push(a);
        }
      })

      this.userRoles = roleForAdmin;

      // if(this.loggedUserdetails.role === 1) {
      // this.userRoles = response.roles;
      // } else {
      //   this.userRoles.push({role_name:'user', role_id: 5})
      // }
    })
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
      // } else {
      //   this.roles.push({role_id:5, role_name:'user'})
      // }

    })
  }

  initForm() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required,Validators.pattern("^[a-z][a-z0-9]*$")]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:[''],
      confirm_password: [''],
      client_category: [1, Validators.required],
      department_name: [],
      department_address: [],
      registration_number: [''],
      date: [],
      role: ['', Validators.required],
      group: ['']
    },{ validators: passwordMatchValidator })
  }

  getDepartmentTypes() {
    this.cService.getGetDepartmentTypes().subscribe(res => {
      this.departmentTypes = res?.department_types;
    })
  }

  saveChanges() {
    this.isLoading = true;

    if (this.userForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }
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
      role: this.userForm.value.role,
      is_verified: 1
    }

    // console.log(payload, 'PAYLOAD')
    if (this.userForm.pristine || this.userForm.invalid) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      window.scroll(0,0,)
      return;
    }
    if(this.userId === null) {
      this.cService.createUser(payload, this.doc, this.renewDoc).subscribe(response => {
      this.toast.showToast(
        TOAST_STATE.success,
        'User Created Successfully!');
        this.isLoading = false;
        this.dismissMessage();
        this.responseError = null;
        this.message = {};

      this.router.navigate(['/dashboard/all-users']);
    },

    (error) => {
      window.scroll(0, 0)
      this.message = {};
      this.responseError = error?.error;
      this.isLoading = false;
    })
    // (error) => {
    //   this.isLoading = false;
    //   this.toast.showToast(
    //     TOAST_STATE.danger,
    //     error?.error?.message);

    //     setTimeout(() => {
    //       this.dismissMessage();
    //     }, 3000);
    // })
  } else {
    this.cService.updateUser(payload, this.doc, this.renewDoc).subscribe(response => {
      this.toast.showToast(
        TOAST_STATE.success,
        'User Updated Successfully!');
        this.isLoading = false;
        this.dismissMessage();

      this.router.navigate(['/dashboard/all-users']);
      this.responseError = null;
      this.message = {};
    },
    (error) => {
      window.scroll(0, 0)
      this.message = {};
      this.responseError = error?.error;
      this.isLoading = false;

        // setTimeout(() => {
        //   this.dismissMessage();
        // }, 3000);
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
