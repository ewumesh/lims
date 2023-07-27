import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TestRequestDetailsService } from "src/app/services/analyst/test-request-details/test-request-details.service";
import { ToastService, TOAST_STATE } from "src/app/shared/toastr/toastr.service";
import { FinalRawDataRemarksComponent } from "../analyst/test-request-details/raw-data-remarks/component/final-remarks";
import { Router } from "@angular/router";
import { SampleRequestDetailsService } from "src/app/services/sample-request-details/sample-request-details.service";


@Component({
    template:`
    <div class="row m-0" style="padding: 3%;">
  <div class="col-md-10">
    <h2>Recheck</h2>
  </div>
  <div class="col-md-2 text-end">
    <button (click)="closeDialog()" class="btn btn-lims-danger btn-sm"><mat-icon aria-hidden="false" aria-label="edit" fontIcon="close"></mat-icon></button>
  </div>
  <hr />

  <div class="col-md-12">
    <form [formGroup]="remarksForm" class="row">
      <div *ngIf="message && message.messageBody" class="col-sm-12 col-md-12 col-lg-12">
        <div class="alert alert-info" role="alert">
          {{message?.messageBody}}
        </div>
      </div>

      <div *ngIf="responseError" class="col-sm-12 col-md-12 col-lg-12">
        <div class="alert alert-danger" role="alert">
          <li *ngFor="let item of responseError | keyvalue">
            {{item.value}}
          </li>
        </div>
      </div>
      <div class="col-md-12">
        <label for="user" class="form-label">Remarks*</label>
        <!-- <mat-form-field class="w-100" appearance="outline"> -->
          <!-- <mat-select placeholder="Select Analyst" formControlName="analyst_user" class="custom-select">
            <mat-option *ngFor="let user of users" [value]="user.id">{{user?.first_name}} {{user?.last_name}}</mat-option>
          </mat-select> -->
          <textarea required class="form-control" formControlName="remarks" placeholder="Enter Remarks"  ></textarea>
          <!-- <mat-error class="text-danger" *ngIf="displayMessage?.analyst_user">{{displayMessage?.analyst_user}}</mat-error> -->
        <!-- </mat-form-field> -->
      </div>

      <div class="col-md-12 text-end mt-4">
        <button (click)="submit()" class="btn btn-danger btn-lims-danger btn-sm">

          <span *ngIf="!isLoading">Recheck</span>
            <span *ngIf="isLoading">
              <i class="fa fa-circle-o-notch fa-spin"></i> Loading
            </span>
        </button>
      </div>
    </form>
  </div>
</div>

    `,
    styles:['']
})

export class RecheckComponent {
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
      private service: SampleRequestDetailsService,
      ) {
        // console.log(data, 'dajiw')
       }
  
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
        remarks: this.remarksForm.value.remarks,
        sample_form: this.data.id
      }
      this.service.recheckSample(payload).subscribe(res => {
        this.toast.showToast(TOAST_STATE.success, res.message);
        this.dialogRef.close();
        this.isLoading = false;
        this.router.navigate(['/dashboard/lab-report']);
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