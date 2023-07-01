import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

// Custom components.
import { AuthenticationService } from 'src/app/services/auth/auth.service';
import { rowsAnimation } from 'src/app/shared/animations/animations';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [rowsAnimation]
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  registerForm: FormGroup;
  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  isLoading: boolean;
  message: any;
  responseError = null;

  date = ''

  private readonly toDestroy$ = new Subject<void>();

  registrationDocUrl: any;
  img: any;
  renewDoc: any;

  @ViewChild('labelImport')
  labelImport: ElementRef;
  fileToUpload: File = null;

  clientCategories: any[] = [];
  departmentTypes:[] = [];

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private authService: AuthenticationService,
    private toast: ToastService,
    private router: Router
    ) {
      this.title.setTitle('Register - Laboratory Information Management System')

    this.genericValidator = new GenericValidator({
      'first_name': {
        'required': 'First Name is required.'
      },
      'last_name': {
        'required': 'Last Name is required.'
      },
      'email': {
        'required': 'Email is required.',
        'pattern': 'Email is not valid.'
      },
      'password': {
        'required': 'Password is required.'
      },
      'phone': {
        'required': 'Phone Number is required.',
        'pattern': 'Phone Number not valid(Numbers only).'
      },
      'client_category': {
        'required': 'Category is required.'
      },
      'department_name': {
        'required': 'Industry Name is required.'
      },
      'department_address': {
        'required': 'Industry Address is required.'
      },
      'registration_number': {
        'required': 'Registration Number is required.'
      },
      'date': {
        'required': 'Date is required.'
      },
      'username': {
        'required': 'Username is required.',
        'pattern': 'Username must be in small letters only.'
      },
      'department_type': {
        'required': 'This Field is required.'
      }
    })
  }

  ngOnInit(): void {
    this.getClientCategories();
    this.initForm();
    this.getDepartmentType();
  }

  goToHome() {
    this.router.navigate(['/login']);
  }

  gotoPricing() {
    this.router.navigate(['/commodity-pricing']);
  }

  gotoComplain() {
    this.router.navigate(['/complain']);
  }

  gotoFeedback() {
    this.router.navigate(['/feedback']);
  }

  gotoUserManual() {
    this.router.navigate(['/user-manual']);
  }

  gotoVideoManual() {
    this.router.navigate(['/video-manual']);
  }

  uploadFile(event) {
    let file = event.target.files[0];
     this.img = file;
  }

  uploadRenewDoc(event) {
    let file = event.target.files[0];
    this.renewDoc = file;
  }

  private initForm() {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      client_category: ['', Validators.required],
      department_name: ['', Validators.required],
      department_address: ['', Validators.required],
      registration_number: ['', Validators.required],
      // date: [this.date],
      username: ['', [Validators.required, Validators.pattern("^[a-z][a-z0-9]*$")]],
      role: 5,
      department_type: ''
    })
  }

  getDepartmentType() {
    this.authService.getGetDepartmentTypes().subscribe(res => {
      this.departmentTypes = res?.department_types;
      console.log(res, 'okopk')
    })
  }

  saveChanges() {
    if (this.registerForm.pristine) {
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }

    let payload = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
    }

    this.isLoading = true;

    this.authService.userRegister(this.registerForm.value, this.img, this.renewDoc).subscribe(response => {

      this.toast.showToast(
        TOAST_STATE.success,
        response.message);

        this.isLoading = false;

        this.renewDoc = null;
        this.img = null;

        // setTimeout(() => {
          this.router.navigate(['/login']);
        // }, 1000);

        this.message = {};
        this.dismissMessage();
        this.responseError = null;

    },
    (error) => {
        window.scroll(0, 0)
        this.message = {};
        this.responseError = error?.error;
        this.isLoading = false;
    })
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 5000);
  }

  getClientCategories() {
    this.authService.getCategories().subscribe(res => {
      this.clientCategories = res?.results;
    })
  }

  ngAfterViewInit(): void {
    this.validation();
  }

  gotoLogin() {
    this.router.navigate(['/login'])
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.registerForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
