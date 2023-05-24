import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SampleRequestsService } from 'src/app/services/sample-request/sample-request.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './assign-sample.component.html',
  styleUrls: ['./assign-sample.scss']
})
export class AssignSampleComponent implements OnInit {

  form: FormGroup;

  users: any[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignSampleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private service: SampleRequestsService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUserList();
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

  private initForm() {
    this.form = this.fb.group({
      supervisor_user: '',
      form_available: '',
      sample_form: '',

    })
  }

  closeDialog() {

  }

  submit() {
    let payload = {
      supervisor_user: this.form.value.supervisor_user,
      form_available: 'supervisor',
      // sample_form: this.data?.id
      // parameter: this.data?.parameters,
      // commodity_id: this.data?.commodity_id
    }

    console.log(payload, 'PAYLOAD')

    this.service.assignSampleToSupervisor(payload, this.data.id).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, res?.message);
      this.dialogRef.close();
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
