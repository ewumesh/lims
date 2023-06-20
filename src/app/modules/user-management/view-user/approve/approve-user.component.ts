import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ViewUserDetailsService } from 'src/app/services/user-management/view-user/view-user.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.scss']
})
export class ApproveUserComponent implements OnInit {
  isApprove = false;
  isReject = false;
  userDetails:any;
  approveForm: FormGroup;

  message:any = {};
  responseError = null;

  loggedUserDetails: any;

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<ApproveUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public userId: any,
    private toast: ToastService,
    private route: ActivatedRoute,
    private service: ViewUserDetailsService
    ) {
      this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    }

  ngOnInit(): void {
    this.getUserDetails();
    this.initApproveForm();
  }

  initApproveForm() {
    this.approveForm = this.fb.group({
      remarks: ''
    })
  }

  rejectUser() {
    this.isReject = true;
    let payload = {
      id: this.userDetails.id,
      is_verified: 0,
      approved_by: this.loggedUserDetails.id,
      approved_date: this.format(new Date()),
      remarks: this.approveForm.value.remarks
    }

    // console.log(payload, 'PAYYYY')

    this.service.approveUser(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'User Rejected Successfully!');
      this.dismissMessage();
      this.isReject = false;
      this.dialogRef.close();
    },(error) => {
      window.scroll(0, 0)
        this.message = {};
        this.responseError = error?.error;
    })
  }

  approveuser() {
    this.isApprove = true;
    let payload = {
      id: this.userDetails.id,
      is_verified: 1,
      approved_by: this.loggedUserDetails.id,
      approved_date: this.format(new Date()),
      remarks: this.approveForm.value.remarks
    }

    // console.log(payload, 'PAYYYY')

    this.service.approveUser(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'User Approved Successfully!');
      this.dismissMessage();
      this.isApprove = false;
      this.dialogRef.close();
    },(error) => {
      window.scroll(0, 0)
        this.message = {};
        this.responseError = error?.error;
    })
  }

  format(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  getUserDetails() {
    this.service.getUserDetails(this.userId).subscribe(response => {
      this.userDetails = response;
    })
  }

  dismissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 1200);
  }

  close() {
    this.dialogRef.close();
  }
}
