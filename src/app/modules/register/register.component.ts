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

  date = ''

  private readonly toDestroy$ = new Subject<void>();

  @ViewChild('labelImport')
  labelImport: ElementRef;
  fileToUpload: File = null;

  clientCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private authService: AuthenticationService,
    private toast: ToastService,
    private router: Router
    ) {
      this.title.setTitle('Register - Laboratory Inventory Management System')

    this.genericValidator = new GenericValidator({
      'first_name': {
        'required': 'First Name is required.'
      },
      'last_name': {
        'required': 'Last Name is required.'
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
      'client_category': {
        'required': 'Category is required.'
      },
      'departmentName': {
        'required': 'Department Name is required.'
      },
      'departmentAddress': {
        'required': 'Department Address is required.'
      },
      'registrationNumber': {
        'required': 'Registration Number is required.'
      },
      'date': {
        'required': 'Date is required.'
      },
      'username': {
        'required': 'Username is required.'
      }
    })
  }

  ngOnInit(): void {
    this.getClientCategories();
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      client_category: ['', Validators.required],
      departmentName: ['', Validators.required],
      departmentAddress: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      registrationDoc: ['', Validators.required],
      apRenewDoc: ['', Validators.required],
      date: [this.date],
      username: ['', Validators.required],
      role: 5
    })
  }

  saveChanges() {
    console.log(this.registerForm.value, "FORM VALUE...", this.date)
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

    this.authService.userRegister(this.registerForm.value).subscribe(response => {

      this.toast.showToast(
        TOAST_STATE.success,
        response.message);

        this.isLoading = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);

        this.message = {};

        this.dismissMessage();

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
