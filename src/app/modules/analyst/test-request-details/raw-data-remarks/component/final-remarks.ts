import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TestRequestDetailsService } from 'src/app/services/analyst/test-request-details/test-request-details.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './final-remarks.html',
  styleUrls: ['./final-remarks.scss']
})
export class FinalRawDataRemarksComponent implements OnInit {
  responseError = null;
  message: any = {};

  isLoading = false;

  remarksForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private dialogRef: MatDialogRef<FinalRawDataRemarksComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private router: Router,
    private service: TestRequestDetailsService,
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.remarksForm = this.fb.group({
      remarks: ''
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    this.isLoading = true;
    let payload = {
      status: 'completed',
      is_supervisor_sent: true,
      remarks: this.remarksForm.value.remarks
    }
    this.service.sendForVarification(payload, this.data?.id).subscribe(res => {
      this.isLoading = false;
      this.toast.showToast(TOAST_STATE.success, 'Test Result Sent.');
      this.dismissMessage();
      this.dialogRef.close();
      this.router.navigate(['/dashboard/lab-report']);
      window.location.reload();
    },(error) => {
      this.isLoading = false;
      this.responseError = error?.error;
    })
  }

  dismissMessage() {
    setTimeout(() => {
        this.toast.dismissToast();
    }, 2000);
  }
}
