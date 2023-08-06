import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSampleRequestService } from 'src/app/services/admin-sample-request.service.ts/service';
import { TOAST_STATE, ToastService } from 'src/app/shared/toastr/toastr.service';


@Component({
    templateUrl:'./approve-final-sample.component.html'
})


export class ApproveFinalSampleComponent implements OnInit {

    isLoading = false;
    message: any = {};
    responseError = null;
    isReject = false;
  
    remarksForm:FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ApproveFinalSampleComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data: any,
      private router: Router,
      private service: AdminSampleRequestService,
      private toast: ToastService,
      private route: ActivatedRoute
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
        // console.log(this.data, "DORM")
      this.isLoading = true;
      let payload = {
        id: this.data.sample_form,
        // sample_form: id,
        status:'completed',
        admin_remarks: this.remarksForm.value.remarks
      }
  
     this.service.verifySample(payload).subscribe(res => {
      this.toast.showToast(TOAST_STATE.success, 'Sample Report Verified Successfullt!');
      this.dismissToast();
      this.dialogRef.close();
      this.router.navigate(['/dashboard/lab-report']);
     }, (error) => {
      this.responseError = error?.error;
     })
    }
  
    // reject() {
    //   console.log(this.data, 'date')
    //   this.isReject = true;
    //   let id = this.route.snapshot.paramMap.get('id');
    //   let payload = {
    //     sample_form: this.data.sample_form,
    //     // sample_form: id,
    //     // is_verified: false,
    //     remarks: this.remarksForm.value.remarks
    //   }
  
    //  this.service.rejectSample(payload).subscribe(res => {
    //   this.toast.showToast(TOAST_STATE.success, res.message);
    //   this.dismissToast();
    //   this.dialogRef.close();
    //   this.router.navigate(['/dashboard/lab-report']);
    //   this.isReject = false;
    //  }, (error) => {
    //   this.responseError = error?.error;
    //   this.isReject = false;
    //  })
    // }
  
    dismissToast() {
      setTimeout(() => {
        this.toast.dismissToast();
      }, 2000);
  
    }

}