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
  userDetails:any;
  approveForm: FormGroup;

  message:any = {};
  responseError = null;

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<ApproveUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public userId: any,
    private toast: ToastService,
    private route: ActivatedRoute,
    private service: ViewUserDetailsService
    ) {
      // this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
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

  approveuser() {
    this.isApprove = true;
    let payload = {
      id: this.userDetails.id,
      is_verified: 1,
      remarks: this.approveForm.value.remarks
    }

    this.service.approveUser(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'User Approved Successfully!');
      this.dismissMessage();
      this.isApprove = false;
      this.dialogRef.close();
    })
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
