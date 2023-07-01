import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SampleReportService } from 'src/app/services/supervisor/sample-request/sample-request.service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';

@Component({
  templateUrl:'./s-verify.html'
})
export class VerificationComponent implements OnInit {
  remarksForm: FormGroup;
  message:any = {}
  responseError = null;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<VerificationComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private service: SampleReportService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router
    ) {
      console.log(data, 'data...')
    }

  ngOnInit(): void {
    this.initForm();
  }

  initForm () {
    this.remarksForm = this.fb.group({
      remarks: ['', Validators.required]
    })
  }
  submit() {
    this.sendForVerification();
//     let payload = {
//       remarks:this.remarksForm.value.remarks
//     }
//     this.service.patchRemarks(payload, this.data.sample_form,).subscribe(res => {
// this.dialogRef.close();
// this.router.navigate(['/dashboard/lab-report']);
//     },(error) => {
//       this.responseError = error.error;
//     })
  }

  sendForVerification() {
    this.isLoading = true;
    let id = this.route.snapshot.paramMap.get('id');
    let payload = {
      status: 'not_verified',
      remarks: this.remarksForm.value.remarks,
      // sample_form: this.data.sample_form,
      // is_verified: false,
      id: this.data.id,
      is_supervisor_sent: true,
      // super_visor_sample_form: this.data.super_visor_sample_form
    }
    console.log(payload, 'OK CHAINA')

    this.service.sentForVerificationWithRemarks(payload).subscribe(res => {
      // console.log(res, "HAHAHAHAHAHHHHHHH")
      this.toast.showToast(TOAST_STATE.success, 'Sample Sent for Verification Successfully!');
      // this.toast.showToast(
      //   TOAST_STATE.danger,
      //   'All the field(s) are not valid.');
      // this.dissmissMessage();
      this.dialogRef.close();
      this.dissmissMessage();
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    })
  }

  dissmissMessage() {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2500);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
