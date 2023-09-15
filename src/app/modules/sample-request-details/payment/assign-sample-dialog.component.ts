import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SampleRequestDetailsService } from 'src/app/services/sample-request-details/sample-request-details.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';
import { GenericValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  templateUrl: './assign-sample-dialog.component.html',
  styleUrls: ['./assign-sample-dialog.scss']
})
export class AssignSampleDialogComponent implements OnInit, AfterViewInit {

  assignSampleForm: FormGroup;

  samples: any[] = [];

  users: any[] = [];

  isLoading: boolean = false;

  paymentReceipt: any;

  // Used for form validation
  genericValidator: GenericValidator;
  displayMessage: any = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  message: any

  isPaymentReceipt: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignSampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private service: SampleRequestDetailsService,
    private toast: ToastService
  ) {

    this.genericValidator = new GenericValidator({
      'voucher_number': {
        'required': 'Voucher Number is required.'
      },
      'register_date': {
        'required': 'Date is required.'
      },
      'amount': {
        'required': 'Amount is required.'
      }
    })
  }

  ngOnInit(): void {
    this.initAssignSampleForm();
    this.getUserList();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  uploadImage(event) {
    let file = event.target.files[0];
    this.paymentReceipt = file;
    this.isPaymentReceipt = true;
  }

  getUserList() {
    let payload = {
      search: '',
      page: '',
      size: '',
      role: '3',
      client_category_id: ''
    }

    this.service.getUsersList(payload).subscribe(res => {
      this.users = res;
    })
  }

  initAssignSampleForm() {
    this.assignSampleForm = this.fb.group({
      voucher_number: ['', Validators.required],
      owner_email: [this.data?.owner_user?.email],
      sample_form: [this.data?.id],
      register_date: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  payNow() {
    this.isLoading = true;
    if (this.assignSampleForm.pristine || !this.isPaymentReceipt) {
      this.message = {};
      this.isLoading = false;
      this.message.messageBody = 'All the fileds with (*) are required.';
      return;
    }

    let payload = {
      voucher_number: this.assignSampleForm.value.voucher_number,
      owner_email: this.data?.owner_user.email,
      sample_form: this.data?.id,
      register_date: this.assignSampleForm.value.register_date,
      amount: this.assignSampleForm.value.amount
    }

    // console.log(payload, this.data, 'ok')
    // this.service.sampleRequestPayment(payload).subscribe(res => {
    //   this.dialogRef.close();
    //   this.toast.showToast(TOAST_STATE.success, res.message);
    //   this.dismissMessage();
    // },
    //   (error) => {
    //     if (error.status === 400) {
    //       this.toast.showToast(
    //         TOAST_STATE.danger,
    //         'All the field(s) are not valid.');

    //       setTimeout(() => {
    //         this.dismissMessage();
    //       }, 3000);
    //     } else if (error.status === 500 && error.status > 500) {

    //       this.toast.showToast(
    //         TOAST_STATE.danger,
    //         'Internal Server Error');

    //       setTimeout(() => {
    //         this.dismissMessage();
    //       }, 3000);


    //     } else {
    //       this.toast.showToast(
    //         TOAST_STATE.danger,
    //         error?.error?.error);

    //       setTimeout(() => {
    //         this.dismissMessage();
    //       }, 3000);
    //     }
    //     this.isLoading = false;

    //   })
  }

  private dismissMessage(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.validation();
  }

  private validation() {
    this.genericValidator
      .initValidationProcess(this.assignSampleForm, this.formInputElements)
      .subscribe({ next: m => this.displayMessage = m });
  }
}
