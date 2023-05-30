import { Component, OnInit, Inject, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignedSampleService } from 'src/app/services/supervisor/assigned-sample/assigned-sample.service';
import { LabRequestDetailsService } from 'src/app/services/supervisor/lab-request-details/lab-request-details.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.scss']
})
export class AssignComponent implements OnInit, AfterViewInit {

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

    message: any

  constructor(
    private service: LabRequestDetailsService,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<AssignComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService
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
      parameters: ['', Validators.required]
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
      this.message = {};
      this.message.messageBody = 'All the fileds with (*) are required.';
      this.isLoading = false;
      return;
    }
    let payload = {
      analyst_user: this.assignToAnalystform.value.analyst_user,
      form_available: 'analyst',
      parameter: this.assignToAnalystform.value.parameters,
      sample_form: this.data.id,
      supervisor_user: [this.userDetails.id],
      commodity: this.assignToAnalystform.value.commodity
    }

    this.service.assignSampleToAnalyst(payload).subscribe((res:any) => {
      this.dialogRef.close();
      this.toast.showToast(TOAST_STATE.success, res?.message);
      this.isLoading = false;
    },(error) => {
      if (error.status === 400) {
        this.toast.showToast(
          TOAST_STATE.danger,
          'All the field(s) are not valid.');

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);
      } else if (error.status === 500 && error.status > 500) {

        this.toast.showToast(
          TOAST_STATE.danger,
          'Internal Server Error');

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);


      } else {
        this.toast.showToast(
          TOAST_STATE.danger,
          error?.error?.error);

        setTimeout(() => {
          this.dismissMessage();
        }, 3000);
      }
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
