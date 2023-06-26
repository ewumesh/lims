import { Component, ElementRef, Inject, ViewChildren } from "@angular/core";
import { FormGroup, FormControlName, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LabRequestDetailsService } from "src/app/services/supervisor/lab-request-details/lab-request-details.service";
import { ToastService, TOAST_STATE } from "src/app/shared/toastr/toastr.service";
import { GenericValidator } from "src/app/shared/validators/generic-validators";
import { AssignComponent } from "../../lab-request-details/component/assign.component";


@Component({
    templateUrl: './re-assign.html',
    styleUrls:['./re-assign.scss']
})

export class ReAssignComponent {
    users: any[] = [];
  commodities: any[] = [];
  commodityParameters:any[] = [];
  assignToAnalystform: FormGroup;
  isLoading: boolean = false;

  userDetails: any;

    // Used for form validation
    genericValidator: GenericValidator;
    displayMessage: any = {};
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];

    message: any = {};
    responseError = null;

  constructor(
    private service: LabRequestDetailsService,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<AssignComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService,
    private router: Router
    ) {
      this.genericValidator = new GenericValidator({
        'analyst_user': {
          'required': 'Analyst User is required.'
        },
        'parameters': {
          'required': 'Parameters is required.'
        }
      })
    }

  ngOnInit(): void {
    this.commodityParameters = this.data.parameters;
    this.getUsers();
    this.getCommodities();
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.initForm();
    this.disableCommodityFiled();
   }

   disableCommodityFiled() {
    this.assignToAnalystform.get('commodity').disable();
   }

   private validation() {
    this.genericValidator
      .initValidationProcess(this.assignToAnalystform, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }


   private initForm() {

    this.assignToAnalystform = this.fb.group({
      analyst_user: ['', Validators.required],
      commodity: [this.data.commodity],
      // parameters: ['', Validators.required]
    })
   }

  getUsers() {
    let payload = {
      page: '',
      size:'',
      search: '',
      role: '4',
      client_category_id: ''
    }
    this.service.getUsersList(payload).subscribe(res => {
      this.users = res;
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getCommodities() {
    let payload = {
      page: '',
      size: '',
      search: ''
    }
    this.service.getCommodities(payload).subscribe(res => {
      this.commodities = res.results;
    })
  }

  submit() {
    this.isLoading = true;
    if (this.assignToAnalystform.pristine) {
      window.scroll(0,0);
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }
    let payload = this.data;
    payload.analyst_user = this.assignToAnalystform.value.analyst_user,

    console.log(payload ,' PAU')

    this.service.assignSampleToAnalyst(payload).subscribe((res:any) => {
      this.dialogRef.close();
      this.toast.showToast(TOAST_STATE.success, res?.message);
      this.dismissMessage();
      this.isLoading = false;
      this.message = {};
      this.responseError = null;
      this.router.navigate(['/dashboard/samples'])
    },(error) => {
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

  ngAfterViewInit(): void {
      this.validation();
  }
}