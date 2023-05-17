import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SampleRequestsService } from 'src/app/services/sample-request/sample-request.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './assign-sample-dialog.component.html',
  styleUrls: ['./assign-sample-dialog.scss']
})
export class AssignSampleDialogComponent implements OnInit {

  assignSampleForm: FormGroup;

  samples: any[] = [];

  users: any[] = [];

  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignSampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private service: SampleRequestsService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.initAssignSampleForm();
    this.getUserList();

    console.log(this.data, 'DATA...')
  }

  closeDialog() {
    this.dialogRef.close();
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
      this.users = res
    })
  }

  initAssignSampleForm() {
    this.assignSampleForm = this.fb.group({
      voucher_number: '',
      owner_email: [this.data?.owner_user],
      sample_form: [this.data?.id],
      register_date: '',
      amount: ['']
    })
  }

  payNow() {
    let payload = {
      voucher_number: this.assignSampleForm.value.voucher_number,
      owner_email: this.data?.owner_user,
      sample_form: this.data?.id,
      register_date: this.assignSampleForm.value.register_date,
      amount: this.assignSampleForm.value.amount
    }
    this.service.sampleRequestPayment(payload).subscribe(res => {
      this.dialogRef.close();
      this.toast.showToast(TOAST_STATE.success, res.message);
    },
      (error) => {
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
}
