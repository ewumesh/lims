import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignedSampleService } from 'src/app/services/supervisor/assigned-sample/assigned-sample.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.scss']
})
export class AssignComponent implements OnInit {

  users: any[] = [];
  commodities: any[] = [];
  commodityParameters:any[] = [];
  assignToAnalystform: FormGroup;
  isLoading: boolean = true;

  userDetails: any;

  constructor(
    private service: AssignedSampleService,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<AssignComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    this.getUsers();
    this.initForm();
    this.getCommodities();

    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
   }


   private initForm() {
    this.commodityParameters = this.data.parameters;

    this.assignToAnalystform = this.fb.group({
      analyst_user: [],
      commodity_id: this.data.commodity_id,
      parameters: ['']
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
    this.service.getCommodities().subscribe(res => {
      this.commodities = res.results;
    })
  }

  submit() {
    let payload = {
      analyst_user: this.assignToAnalystform.value.analyst_user,
      form_available: 'analyst',
      parameter: this.assignToAnalystform.value.parameters,
      sample_form: this.data.id,
      supervisor_user: [this.userDetails.id]
    }

    this.service.assignSampleToAnalyst(payload).subscribe((res:any) => {
      this.dialogRef.close();
      this.toast.showToast(TOAST_STATE.success, res?.message);
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
}
