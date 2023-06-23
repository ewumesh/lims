import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl: './verification-remarks.html',
  styleUrls: ['./verification-remarks.scss']
})
export class VerificationRemarksComponent implements OnInit {
  isLoading = false;
  message: any = {};
  responseError = null;

  remarksForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VerificationRemarksComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private router: Router,
    private service: SampleReportService,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.remarksForm = this.fb.group({
      remarks: ['', Validators.required]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    this.isLoading = true;
    let payload = {
      id: this.data.id,
      // sample_form: id,
      is_verified: true,
      remarks: this.remarksForm.value.remarks
    }

   this.service.sendReportForVerificationFrom(payload).subscribe(res => {
    this.toast.showToast(TOAST_STATE.success, 'Sample Report Verified Successfullt!');
    this.dismissToast();
    this.dialogRef.close();
    this.router.navigate(['/dashboard/lab-report']);
   }, (error) => {
    this.responseError = error?.error;
   })
  }

  dismissToast() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2000);

  }
}
